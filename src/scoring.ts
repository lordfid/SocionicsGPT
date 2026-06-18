/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TIMKey, Question, Answer, ProfileResult, ValidationMetrics, InfoElement } from './types';
import { get16TIMProfiles, computeModelAPositions, getIntertypeRelation } from './profiles';

// Strength expectations (1-indexed for channels 1 to 8)
// 1: Base (4.8), 2: Creative (4.4), 3: Role (2.5), 4: PoLR (1.5), 5: Suggestive (4.2), 6: Mobilizing (3.8), 7: Ignoring (3.0), 8: Demonstrative (4.2)
const POSITION_EXPECTATIONS: Record<number, number> = {
  1: 4.8,
  2: 4.4,
  3: 2.5,
  4: 1.5,
  5: 4.2,
  6: 3.8,
  7: 3.0,
  8: 4.2
};

// Compute canonical pair string alphabetically to prevent bugs
export function getCanonicalPair(t1: TIMKey, t2: TIMKey): string {
  return t1 < t2 ? `${t1}_${t2}` : `${t2}_${t1}`;
}

export function calculateSocionicsResult(
  surveyQuestions: Question[],
  answers: Record<string, Answer>
): {
  results: ProfileResult[];
  metrics: ValidationMetrics;
  topPairUnresolved: boolean;
  tieBreakApplied: boolean;
} {
  const answerList = Object.values(answers).filter(a => a.rating !== undefined && a.rating >= 1 && a.rating <= 5);
  
  // Guard for empty or near-empty sessions (point 3: no forced type on empty sessions)
  if (answerList.length < 5) {
    return {
      results: get16TIMProfiles().map(p => ({ key: p.key, fitScore: 0, relativeSupport: 0 })),
      metrics: {
        coverage: 0,
        confidence: 0,
        straightlining: false,
        midpointOveruse: false,
        extremeResponses: false,
        holdoutCount: 0,
        holdoutSupport: 0,
        responseSpeedAvg: 0
      },
      topPairUnresolved: false,
      tieBreakApplied: false
    };
  }

  // 1. Identify answered cell map (element x channel) to calculate coverage (point 3)
  const coreQuestions = surveyQuestions.filter(q => q.type === 'core');
  const answeredCores = coreQuestions.filter(q => answers[q.id]?.rating !== undefined);
  
  const totalCoreCells = 64; // 8 elements * 8 channels
  const coveredCells = new Set<string>();
  answeredCores.forEach(q => {
    coveredCells.add(`${q.element}_${q.channel}`);
  });
  const coveragePercent = Math.round((coveredCells.size / totalCoreCells) * 100);

  // 2. Base Scoring Profile Calculation based on Core Questions
  const timProfiles = get16TIMProfiles();
  const rawFitScores: Record<TIMKey, number> = {} as any;

  timProfiles.forEach(profile => {
    // Collect error distances for core questions only (points 3 & 4)
    // No quadra bonus here to prevent double counting
    let totalError = 0;
    let questionsCount = 0;

    answeredCores.forEach(q => {
      const rating = answers[q.id].rating;
      // Find where this question's element fits in the candidate's Model A
      const posIndex = profile.positions.findIndex(p => p.element === q.element);
      if (posIndex !== -1) {
        const channelNum = posIndex + 1; // 1-indexed position
        const expected = POSITION_EXPECTATIONS[channelNum] || 3.0;
        
        // Accumulate distance
        totalError += Math.abs(rating - expected);
        questionsCount++;
      }
    });

    if (questionsCount > 0) {
      const mae = totalError / questionsCount;
      // Invert MAE. Maximum possible MAE on 1-5 scale is 4.0.
      // fitScore (Indeks Kemiripan Model)
      rawFitScores[profile.key] = Math.max(0, 1.0 - (mae / 4.0));
    } else {
      rawFitScores[profile.key] = 0;
    }
  });

  // 3. Process Holdouts Separately (point 5)
  // Holdouts check top candidate predictions without leaking into raw core score.
  // Maximum weight is 12% total.
  const holdoutQuestions = surveyQuestions.filter(q => q.type === 'holdout');
  const answeredHoldouts = holdoutQuestions.filter(q => answers[q.id]?.rating !== undefined);
  
  // Sort candidates by raw fit
  let sortedKeys = (Object.keys(rawFitScores) as TIMKey[]).sort((a, b) => rawFitScores[b] - rawFitScores[a]);
  const leadingRawKey = sortedKeys[0];

  let holdoutSupport = 0; // percentage of holdout matches for the leading candidate
  let holdoutCorrection = 0;

  if (answeredHoldouts.length > 0 && leadingRawKey) {
    let matches = 0;
    const leadProfile = timProfiles.find(p => p.key === leadingRawKey)!;

    answeredHoldouts.forEach(q => {
      const rating = answers[q.id].rating;
      const posIdx = leadProfile.positions.findIndex(p => p.element === q.element);
      const channelNum = posIdx + 1;
      const expected = POSITION_EXPECTATIONS[channelNum] || 3.0;
      
      // If the answer is on the correct side of 3 (e.g. expected high and answered high, or expected low and answered low)
      if ((expected >= 3.5 && rating >= 3) || (expected <= 2.5 && rating <= 3) || (Math.abs(expected - 3.0) < 0.6 && rating === 3)) {
        matches++;
      }
    });

    holdoutSupport = Math.round((matches / answeredHoldouts.length) * 100);
    // Scale correction: max ±0.03 (capped within 12% of typical variance)
    holdoutCorrection = ((matches / answeredHoldouts.length) - 0.5) * 0.06;
  }

  // Apply holdout correction to ALL candidates based on their holdout fits
  const fitScoresWithHoldout: Record<TIMKey, number> = {} as any;
  timProfiles.forEach(profile => {
    let profileHoldoutDiff = 0;
    if (answeredHoldouts.length > 0) {
      let matches = 0;
      answeredHoldouts.forEach(q => {
        const rating = answers[q.id].rating;
        const posIdx = profile.positions.findIndex(p => p.element === q.element);
        const channelNum = posIdx + 1;
        const expected = POSITION_EXPECTATIONS[channelNum] || 3.0;
        if ((expected >= 3.5 && rating >= 3) || (expected <= 2.5 && rating <= 3)) {
          matches++;
        }
      });
      profileHoldoutDiff = ((matches / answeredHoldouts.length) - 0.5) * 0.05; // max 5% impact
    }
    fitScoresWithHoldout[profile.key] = Math.min(1.0, Math.max(0, rawFitScores[profile.key] + profileHoldoutDiff));
  });

  // Re-sort keys after holdout
  sortedKeys = (Object.keys(fitScoresWithHoldout) as TIMKey[]).sort((a, b) => fitScoresWithHoldout[b] - fitScoresWithHoldout[a]);

  // 4. Adaptive Tie-Break checks (points 2 & 6)
  // Capped at ±0.02. Only triggered if top two are close (diff <= 0.03)
  const top1 = sortedKeys[0];
  const top2 = sortedKeys[1];
  let tieBreakApplied = false;
  let topPairUnresolved = false;

  const finalFitScores: Record<TIMKey, number> = { ...fitScoresWithHoldout };

  if (top1 && top2) {
    const diff = fitScoresWithHoldout[top1] - fitScoresWithHoldout[top2];
    if (diff <= 0.03) {
      topPairUnresolved = true;
      // Look for answered tie-break questions that differentiate top1 and top2
      const tieBreakQuestions = surveyQuestions.filter(q => q.type === 'tiebreak');
      const answeredTiebreaks = tieBreakQuestions.filter(q => answers[q.id]?.rating !== undefined);

      if (answeredTiebreaks.length > 0) {
        let top1Score = 0;
        let top2Score = 0;
        const p1 = timProfiles.find(p => p.key === top1)!;
        const p2 = timProfiles.find(p => p.key === top2)!;

        answeredTiebreaks.forEach(q => {
          const rating = answers[q.id].rating;
          
          // Check fit for p1
          const idx1 = p1.positions.findIndex(p => p.element === q.element);
          const exp1 = POSITION_EXPECTATIONS[idx1 + 1] || 3.0;
          const err1 = Math.abs(rating - exp1);

          // Check fit for p2
          const idx2 = p2.positions.findIndex(p => p.element === q.element);
          const exp2 = POSITION_EXPECTATIONS[idx2 + 1] || 3.0;
          const err2 = Math.abs(rating - exp2);

          // Closer to expectation gets higher tie-break support
          if (err1 < err2) {
            top1Score += 1;
          } else if (err2 < err1) {
            top2Score += 1;
          }
        });

        if (top1Score !== top2Score) {
          tieBreakApplied = true;
          // Apply a highly guarded correction (max ±0.015, strictly < 0.02)
          const multiplier = 0.015;
          if (top1Score > top2Score) {
            finalFitScores[top1] = Math.min(1.0, finalFitScores[top1] + multiplier);
            finalFitScores[top2] = Math.max(0, finalFitScores[top2] - multiplier);
          } else {
            finalFitScores[top2] = Math.min(1.0, finalFitScores[top2] + multiplier);
            finalFitScores[top1] = Math.max(0, finalFitScores[top1] - multiplier);
          }
        }
      }
    }
  }

  // Re-sort keys after all corrections
  const finalSortedKeys = (Object.keys(finalFitScores) as TIMKey[]).sort((a, b) => finalFitScores[b] - finalFitScores[a]);

  // Compute Relative Support (percentages of top candidates summing to 100%)
  const minScore = Math.min(...Object.values(finalFitScores));
  const shiftedScores = timProfiles.map(p => {
    const score = finalFitScores[p.key];
    // Emphasize contrast for relative support
    return { key: p.key, val: Math.pow(Math.max(0.01, score - minScore + 0.05), 3) };
  });
  const sumShifted = shiftedScores.reduce((acc, c) => acc + c.val, 0);
  
  const results: ProfileResult[] = timProfiles.map(p => {
    const sObj = shiftedScores.find(s => s.key === p.key)!;
    const relSupport = sumShifted > 0 ? Math.round((sObj.val / sumShifted) * 100) : 6;
    return {
      key: p.key,
      fitScore: Math.round(finalFitScores[p.key] * 100) / 100,
      relativeSupport: relSupport
    };
  }).sort((a, b) => b.fitScore - a.fitScore || b.relativeSupport - a.relativeSupport);

  // 5. User Response Bias Monitoring & Diagnostics (point 7)
  // Straightlining: user clicks same number repeatedly
  const ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  answerList.forEach(a => {
    ratingCounts[a.rating] = (ratingCounts[a.rating] || 0) + 1;
  });

  const straightliningLimit = 0.40; // 40% same answer makes warning
  let straightlining = false;
  let midpointOveruse = false;
  let extremeResponses = false;

  Object.keys(ratingCounts).forEach(rStr => {
    const r = parseInt(rStr);
    const ratio = ratingCounts[r] / answerList.length;
    if (ratio >= straightliningLimit) {
      straightlining = true;
      if (r === 3) midpointOveruse = true;
    }
  });

  // Extreme bias: 1 and 5 make up more than 75% of answers
  const extremeRatio = ((ratingCounts[1] || 0) + (ratingCounts[5] || 0)) / answerList.length;
  if (extremeRatio >= 0.75) extremeResponses = true;

  // Response speed calculation
  const totalSpeed = answerList.reduce((acc, a) => acc + (a.timestamp || 0), 0);
  const responseSpeedAvg = answerList.length > 0 ? Math.round((totalSpeed / answerList.length)) : 0;

  // 6. Multi-Factor Confidence Metric (0-100)
  // - 30% from coverage
  // - 25% from top-1 vs top-2 distance (> 0.06 is ideal)
  // - 15% from holdout checks
  // - 30% from response quality checks (no straightlining, reasonable speeds, etc.)
  let confidence = 0;
  
  // A. Coverage factor
  confidence += (coveragePercent * 0.3);

  // B. Distance factor
  if (results[0] && results[1]) {
    const dist = results[0].fitScore - results[1].fitScore;
    const distanceBonus = Math.min(1.0, dist / 0.10) * 25; // max 25 points if dist is 0.10+
    confidence += distanceBonus;
  }

  // C. Holdout factor
  confidence += (holdoutSupport * 0.15);

  // D. Response Quality factor
  let qualityPoints = 30;
  if (straightlining) qualityPoints -= 10;
  if (midpointOveruse) qualityPoints -= 10;
  if (extremeResponses) qualityPoints -= 5;
  if (responseSpeedAvg < 1200 && responseSpeedAvg > 0) qualityPoints -= 10; // answering in < 1.2s avg drops confidence
  confidence += Math.max(0, qualityPoints);

  confidence = Math.round(Math.min(100, Math.max(0, confidence)));

  return {
    results,
    metrics: {
      coverage: coveragePercent,
      confidence,
      straightlining,
      midpointOveruse,
      extremeResponses,
      holdoutCount: answeredHoldouts.length,
      holdoutSupport,
      responseSpeedAvg
    },
    topPairUnresolved,
    tieBreakApplied
  };
}
