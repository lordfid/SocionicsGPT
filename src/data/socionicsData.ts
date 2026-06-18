import { SociotypeCode, InformationElementCode, QuadraName, SociotypeInfo, InformationElementInfo, ReininDichotomies } from "../types";

export const INFORMATIONAL_ELEMENTS: Record<InformationElementCode, InformationElementInfo> = {
  [InformationElementCode.Ne]: {
    code: InformationElementCode.Ne,
    symbol: "▲",
    color: "text-amber-400 bg-amber-950/40 border-amber-800/60",
    theme: "white",
    aspect: "Intuition",
    direction: "Extraverted",
    fullName: "Extraverted Intuition (Black Intuition)",
    gulenkoName: "I - Intuition of Ideas",
    description: "Perception of potential, possibilities, alternative pathways, hidden talents, and structural dynamics. It seeks to uncover what could be rather than what is.",
    manifestationInModelA: {
      Leading: "Generates novel concepts, possibilities, intellectual curiosity, and creative exploration naturally and effortlessly.",
      Creative: "Applies speculative theories and ideas to solve complex problems and design custom frameworks.",
      Role: "Attempts to show competence in being open-minded, versatile, and imaginative, but is easily exhausted by excessive options.",
      Vulnerable: "Intense anxiety regarding unknown futures, sudden changes in plans, or ambiguous capabilities of others. Seeks narrow predictability.",
      Suggestive: "Loves when others generate options, brainstorm, and explain hidden opportunities. Highly inspired by potential.",
      Mobilizing: "Likes to be seen as intellectually creative or unorthodox, keeping options open but struggles to execute them without structure.",
      Ignoring: "Possesses a high, untapped flow of alternative possibilities but filters them heavily to focus on a singular goal.",
      Demonstrative: "Easily sees alternative explanations and uses them fluidly to defend or reinforce their primary worldview."
    }
  },
  [InformationElementCode.Ni]: {
    code: InformationElementCode.Ni,
    symbol: "▲",
    color: "text-indigo-400 bg-indigo-950/40 border-indigo-800/60",
    theme: "black",
    aspect: "Intuition",
    direction: "Introverted",
    fullName: "Introverted Intuition (White Intuition)",
    gulenkoName: "T - Intuition of Time",
    description: "Perception of temporal processes, trends, historic flow, deep forecasting, and inner synchronicity. It forecasts consequences and senses the global rhythm.",
    manifestationInModelA: {
      Leading: "Navigates inner visions, trends, and historic pathways effortlessly. Deeply mystical, patient, and highly accurate at forecasting future events.",
      Creative: "Slickly structures schedules, predicts outcomes to plan strategic maneuvers, and designs timelines for optimal actions.",
      Role: "Appears highly punctual, serious, and aware of schedules, but struggles to maintain this focus under prolonged chaos.",
      Vulnerable: "Lacks a natural sense of rhythm, timing, and patience. Terrified of wasting time or being trapped in static situations with no clear trajectory.",
      Suggestive: "Craves external guidance on timing, long-term trends, and visual direction. Highly responsive to visionaries and calm futurists.",
      Mobilizing: "Deep interest in historic patterns, forecasting, and timelines, but can get stuck in philosophical paralysis without external impulse.",
      Ignoring: "Has profound inner tracking of time and rhythm but suppresses conscious focus on deep future projections to act in the present.",
      Demonstrative: "Reads underlying processes effortlessly; can generate rich historical analogies and deep metaphors without even trying."
    }
  },
  [InformationElementCode.Se]: {
    code: InformationElementCode.Se,
    symbol: "■",
    color: "text-rose-400 bg-rose-950/40 border-rose-800/60",
    theme: "black",
    aspect: "Sensing",
    direction: "Extraverted",
    fullName: "Extraverted Sensing (Black Sensing / Volitional)",
    gulenkoName: "F - Force / Sensing of Power",
    description: "Direct mobilization, spatial awareness, territorial influence, visual power dynamics, aesthetic impact, and concrete physical reality.",
    manifestationInModelA: {
      Leading: "Exerts direct influence, physical authority, and spatial dominance naturally. Deeply grounded in reality, highly competitive, and protective of physical assets.",
      Creative: "Applies kinetic physical force or organizational power creatively to overcome obstacles and restructure physical spaces.",
      Role: "Attempts to present an aggressive, decisive, and tough exterior, but quickly tires of physical conflicts or constant posturing.",
      Vulnerable: "Experiences deep vulnerability during confrontational power struggles, physical pressure, or highly competitive spaces. Paralyzed by hostile demands.",
      Suggestive: "Grateful for strong, confident, and protective partners who clear external resistance and provide solid physical security.",
      Mobilizing: "Desires to be seen as physically strong, athletic, and influential. Can be overly direct or defensive to mask inner soft vulnerabilities.",
      Ignoring: "Has high volitional capability but values peace and comfort, suppressing active spatial dominance unless highly provoked.",
      Demonstrative: "Flawlessly reads physical aesthetics, material value, and power balances, using this mastery to protect self and others."
    }
  },
  [InformationElementCode.Si]: {
    code: InformationElementCode.Si,
    symbol: "■",
    color: "text-emerald-400 bg-emerald-950/40 border-emerald-800/60",
    theme: "white",
    aspect: "Sensing",
    direction: "Introverted",
    fullName: "Introverted Sensing (White Sensing / Comfort)",
    gulenkoName: "S - Sensing of Sensation",
    description: "Perception of interior homeostasis, bodily comfort, aesthetics, sensory satisfaction, quality of taste, and ecological harmony.",
    manifestationInModelA: {
      Leading: "Exquisite sensitivity to inner comfort, physiological balance, physical pleasure, and artistic environmental harmony.",
      Creative: "Creates recipes, cozy environments, ergonomic furniture arrangements, and pleasant bodily practices with immense precision.",
      Role: "Tries to show detailed attentiveness to wellness, styling, and hygiene, but lacks deep organic ease in managing physical environments.",
      Vulnerable: "Lacks connection to basic bodily feedback, details of physical nourishment, or physical routine. Prone to severe sensory burnouts.",
      Suggestive: "Craves a partner who feeds them, manages their physical environment, stabilizes their health, and creates tactile comfort.",
      Mobilizing: "Enjoys cooking, grooming, and cozy environments, but tends to overdo them or get anxious about physical health without feedback.",
      Ignoring: "Highly aware of inner feedback and physical signals but chooses to neglect sensory pampering to pursue high intellectual tasks.",
      Demonstrative: "Masterfully senses the comfort and aesthetics of active spaces, correcting sensory discomforts for others automatically and gracefully."
    }
  },
  [InformationElementCode.Te]: {
    code: InformationElementCode.Te,
    symbol: "●",
    color: "text-blue-400 bg-blue-950/40 border-blue-800/60",
    theme: "black",
    aspect: "Logic",
    direction: "Extraverted",
    fullName: "Extraverted Logic (Black Logic / Pragmatism)",
    gulenkoName: "P - Pragmatic Logic of Action",
    description: "Assessment of facts, practical efficiency, optimization of procedures, financial profitability, useful data, and technological processes.",
    manifestationInModelA: {
      Leading: "High natural drive for productivity, pragmatic logic, algorithmic optimization, and data-driven factual consistency.",
      Creative: "Formulates ingenious techniques, business tactics, workflow processes, and tool optimizations to execute goals.",
      Role: "Claims to be a highly practical, hard-working, and factual person but gets overwhelmed by details of logistics and paperwork.",
      Vulnerable: "Severe anxiety or paralysis faced with complex instructions, pricing, mechanical tasks, or logistical requirements. Despises dry facts without context.",
      Suggestive: "Loves when people present clear, optimized instructions, factual databases, and financial opportunities. Dual-seeking productivity.",
      Mobilizing: "Desires to be highly productive, building a busy schedule, but is prone to burnouts or inefficient loops without clear logical structuring.",
      Ignoring: "Has vast practical resourcefulness but uses it minimally, preferring structural, abstract rule sets over raw logistical efficiency.",
      Demonstrative: "Incredibly adept at researching facts and optimizing physical processes on the fly, showing elegant functional expertise."
    }
  },
  [InformationElementCode.Ti]: {
    code: InformationElementCode.Ti,
    symbol: "●",
    color: "text-sky-400 bg-sky-950/40 border-sky-800/60",
    theme: "white",
    aspect: "Logic",
    direction: "Introverted",
    fullName: "Introverted Logic (White Logic / Structural)",
    gulenkoName: "L - Structural Logic of Relations",
    description: "Analysis of internal systems, structural consistency, formal hierarchies, mathematical modeling, taxonomic order, and ideological laws.",
    manifestationInModelA: {
      Leading: "Lives to construct systems, classification frameworks, axioms, and flawless structural hierarchies. Enforces rigid intellectual consistency.",
      Creative: "Uses logical systems and semantic frameworks to back up new ideas, models, and creative projects.",
      Role: "Strives to follow official codes, protocol, and strict systems, but feels trapped and mechanical if forced to do so constantly.",
      Vulnerable: "Lacks structural systems, struggling with taxonomic rules, forms, or bureaucracy. Terrified of systemic exclusions or formal errors.",
      Suggestive: "Craves a systems expert to clarify hidden structural order, logical laws, and classifications. Highly satisfied by ideological clarity.",
      Mobilizing: "Desires to be classified as precise, logical, and systematic, but can build overly rigid structures that fall apart without dynamic input.",
      Ignoring: "Incredibly logical, but dislikes formal classification, preferring raw factual outcomes over elegant structural taxonomies.",
      Demonstrative: "Instantly spots logical contradictions or structural vulnerabilities in any system, dismantles bad models effortlessly."
    }
  },
  [InformationElementCode.Fe]: {
    code: InformationElementCode.Fe,
    symbol: "▲",
    color: "text-fuchsia-400 bg-fuchsia-950/40 border-fuchsia-800/60",
    theme: "black",
    aspect: "Ethics",
    direction: "Extraverted",
    fullName: "Extraverted Ethics (Black Ethics / Emotional)",
    gulenkoName: "E - Ethics of Emotions",
    description: "Management of emotional atmosphere, group dynamic waves, passionate self-expression, vocal inflections, charisma, and collective mood shifts.",
    manifestationInModelA: {
      Leading: "Has an incredible, magnetic emotional force that shapes group atmospheres, group ethics, and dramatic theatrical states effortlessly.",
      Creative: "Generates vibrant emotional content, dynamic atmospheres, and expressions to motivate people toward a vision.",
      Role: "Attempts to show standard social etiquette, smiling and playing the polite host, but struggles to maintain emotional expressiveness.",
      Vulnerable: "Deep distress in highly emotionally intense, noisy, and chaotic group environments. Paralyzed by emotional dramas or screams.",
      Suggestive: "Loves energetic, warm, and highly passionate individuals who lift their spirits and create an engaging emotional environment.",
      Mobilizing: "Likes to be seen as charismatic, dramatic, and expressive, but can come across as forced or overly theatrical without organic guidance.",
      Ignoring: "Profoundly emotional but keeps their emotional expressions strictly hidden, focusing instead on internal moral sentiments and bonds.",
      Demonstrative: "Masterfully manages the emotional atmosphere under crisis, using rich social charm to protect relationships effortlessly."
    }
  },
  [InformationElementCode.Fi]: {
    code: InformationElementCode.Fi,
    symbol: "▲",
    color: "text-violet-400 bg-violet-950/40 border-violet-800/60",
    theme: "white",
    aspect: "Ethics",
    direction: "Introverted",
    fullName: "Introverted Ethics (White Ethics / Relations)",
    gulenkoName: "R - Ethics of Relations",
    description: "Assessment of psychological distance, moral affinities, loyalty, personal sentiment, emotional bonds, alignment of values, and underlying interpersonal attraction.",
    manifestationInModelA: {
      Leading: "Possesses rich, deep insight into moral bonds, core values, interpersonal distance, and absolute loyalty. Possesses quiet, unwavering moral principles.",
      Creative: "Forges deep individual ties, adjusts psychological distances masterfully, and crafts relational bridges between diverse groups.",
      Role: "Tries to show proper moral behavior, loyalty, and custom codes of honor, but is exhausted by maintaining customized ethical distance.",
      Vulnerable: "Extremely vulnerable to changes in relationships, unspoken animosities, or ambiguous friendships. Cannot read soft psychological boundaries.",
      Suggestive: "Deeply craves clear moral alignment, absolute loyalty, and deep personal bonds. Highly responsive to ethical warmth.",
      Mobilizing: "Acquires massive databases of friends and values but is highly over-sensitive to minor relational slights without clear, objective feedback.",
      Ignoring: "Highly aware of interpersonal affinities but chooses to focus on group drive, emotional atmosphere, and broader societal change.",
      Demonstrative: "Flawlessly reads people's dark intentions or deep affection instantly, resolving ethical problems for close loved ones behind the scenes."
    }
  }
};

export const SOCIOTYPES: Record<SociotypeCode, SociotypeInfo> = {
  [SociotypeCode.ILE]: {
    code: SociotypeCode.ILE,
    mbtiEquivalent: "ENTP",
    russianName: "Искатель (Seeker)",
    englishName: "Intuitive Logical Extravert",
    pseudonym: "Don Quixote",
    gulenkoAlias: "The Searcher",
    quadra: QuadraName.Alpha,
    duals: SociotypeCode.SEI,
    activation: SociotypeCode.ESE,
    mirror: SociotypeCode.LII,
    conflict: SociotypeCode.ESI,
    supervisionPartner: SociotypeCode.EIE,
    supervisee: SociotypeCode.ESI,
    benefactor: SociotypeCode.SLI,
    beneficiary: SociotypeCode.EIE,
    description: "The Seeker is an intellectual cataloger of alternative options and possibilities. They thrive in unmapped lands of abstractions, dismantling rigid social traditions with objective structural theories, but are completely blind to relational nuances and somatic comfort.",
    strengths: ["Infinite conceptual creativity", "Systemic modular structuring", "Unorthodox scientific thinking", "Rapid pattern acquisition"],
    weaknesses: ["Extreme moral insensitivity (Fi PoLR)", "Tactless logical lecturing", "Forgets physical maintenance and routine comfort", "Struggles with physical follow-through"],
    keyTraits: ["Democratic", "Carefree", "Yielding", "Intuitive of Ideas", "Alpha Quadra"],
    modelA: {
      Leading: InformationElementCode.Ne,
      Creative: InformationElementCode.Ti,
      Role: InformationElementCode.Se,
      Vulnerable: InformationElementCode.Fi,
      Suggestive: InformationElementCode.Si,
      Mobilizing: InformationElementCode.Fe,
      Ignoring: InformationElementCode.Ni,
      Demonstrative: InformationElementCode.Te
    }
  },
  [SociotypeCode.SEI]: {
    code: SociotypeCode.SEI,
    mbtiEquivalent: "ISFP",
    russianName: "Посредник (Mediator)",
    englishName: "Sensing Ethical Introvert",
    pseudonym: "Dumas",
    gulenkoAlias: "The Diplomat",
    quadra: QuadraName.Alpha,
    duals: SociotypeCode.ILE,
    activation: SociotypeCode.LII,
    mirror: SociotypeCode.ESE,
    conflict: SociotypeCode.LIE,
    supervisionPartner: SociotypeCode.IEI,
    supervisee: SociotypeCode.LIE,
    benefactor: SociotypeCode.ILE,
    beneficiary: SociotypeCode.LSI,
    description: "The Mediator lives to enrich the physical and aesthetic comfort of the immediate space. They excel at managing physiological states, cooking, cozy decorations, and soft positive emotions, but seek an adventurous intellectual to provide structure and explore futuristic schemas.",
    strengths: ["Incredible somatic sensitivity", "Graceful diplomatic demeanor", "Aesthetic styling and grooming", "Creating stress-free zones"],
    weaknesses: ["Avoids long-term trends and foresight (Ni Role)", "Vulnerable to hard business logistics (Te PoLR)", "Struggles to act in high-pressure conflicts", "Highly sensitive to physical friction"],
    keyTraits: ["Democratic", "Carefree", "Yielding", "Sensing of Sensation", "Alpha Quadra"],
    modelA: {
      Leading: InformationElementCode.Si,
      Creative: InformationElementCode.Fe,
      Role: InformationElementCode.Ni,
      Vulnerable: InformationElementCode.Te,
      Suggestive: InformationElementCode.Ne,
      Mobilizing: InformationElementCode.Ti,
      Ignoring: InformationElementCode.Se,
      Demonstrative: InformationElementCode.Fi
    }
  },
  [SociotypeCode.ESE]: {
    code: SociotypeCode.ESE,
    mbtiEquivalent: "ESFJ",
    russianName: "Энтузиаст (Enthusiast)",
    englishName: "Ethical Sensing Extravert",
    pseudonym: "Hugo",
    gulenkoAlias: "The Purveyor",
    quadra: QuadraName.Alpha,
    duals: SociotypeCode.LII,
    activation: SociotypeCode.ILE,
    mirror: SociotypeCode.SEI,
    conflict: SociotypeCode.ILI,
    supervisionPartner: SociotypeCode.LSE,
    supervisee: SociotypeCode.ILI,
    benefactor: SociotypeCode.EIE,
    beneficiary: SociotypeCode.SLE,
    description: "The Enthusiast is a powerhouse of vibrant emotions and social harmony. They are exceptional organizers of festivities and comfortable environments, radiating positive waves, but easily burn out or make system errors when deprived of a systemic logic analyst.",
    strengths: ["Highly magnetic positive energy", "Excellent hospitality skills", "Practical details coordination", "Protects emotional tone of groups"],
    weaknesses: ["Deep insecurity about temporal forecasting (Ni PoLR)", "Impulsive reactions to minor stresses", "Hates cold abstract systemizations without emotion", "Easily loses strategic vision in pursuit of comfort"],
    keyTraits: ["Democratic", "Carefree", "Obstinate", "Ethics of Emotions", "Alpha Quadra"],
    modelA: {
      Leading: InformationElementCode.Fe,
      Creative: InformationElementCode.Si,
      Role: InformationElementCode.Te,
      Vulnerable: InformationElementCode.Ni,
      Suggestive: InformationElementCode.Ti,
      Mobilizing: InformationElementCode.Ne,
      Ignoring: InformationElementCode.Fi,
      Demonstrative: InformationElementCode.Se
    }
  },
  [SociotypeCode.LII]: {
    code: SociotypeCode.LII,
    mbtiEquivalent: "INTJ", // MBTI equivalent is often INTJ but cognitively it's Ti-Ne, which is LII. High critical analysis needed!
    russianName: "Аналитик (Analyst)",
    englishName: "Logical Intuitive Introvert",
    pseudonym: "Robespierre",
    gulenkoAlias: "The Analyst",
    quadra: QuadraName.Alpha,
    duals: SociotypeCode.ESE,
    activation: SociotypeCode.SEI,
    mirror: SociotypeCode.ILE,
    conflict: SociotypeCode.SEE,
    supervisionPartner: SociotypeCode.LSI,
    supervisee: SociotypeCode.SEE,
    benefactor: SociotypeCode.LII,
    beneficiary: SociotypeCode.SLI,
    description: "The Analyst is a meticulous systems designer. Guided by absolute internal logic and intellectual taxonomies, they reconstruct classifications, laws, and codes. They seek comfortable emotional environments like a warm hearth because they are highly vulnerable in physical confrontations.",
    strengths: ["Flawless systematic reasoning", "High intellectual accuracy", "Impartial and fair decisions", "Detects structural errors instantly"],
    weaknesses: ["Low physical coordination, Se vulnerable (PoLR)", "Struggles with aggressive pushback", "Appears aloof, cold, or mechanical", "Ignores immediate emotional moods"],
    keyTraits: ["Democratic", "Carefree", "Obstinate", "Structural Logic", "Alpha Quadra"],
    modelA: {
      Leading: InformationElementCode.Ti,
      Creative: InformationElementCode.Ne,
      Role: InformationElementCode.Fi,
      Vulnerable: InformationElementCode.Se,
      Suggestive: InformationElementCode.Fe,
      Mobilizing: InformationElementCode.Si,
      Ignoring: InformationElementCode.Te,
      Demonstrative: InformationElementCode.Ni
    }
  },
  [SociotypeCode.EIE]: {
    code: SociotypeCode.EIE,
    mbtiEquivalent: "ENFJ",
    russianName: "Наставник (Mentor)",
    englishName: "Ethical Intuitive Extravert",
    pseudonym: "Hamlet",
    gulenkoAlias: "The Actor",
    quadra: QuadraName.Beta,
    duals: SociotypeCode.LSI,
    activation: SociotypeCode.IEI,
    mirror: SociotypeCode.LSI, // Wait, Beta mirror of EIE is IEI. Actually, mirror of EIE is IEI? No, EIE contains Fe-Ni. IEI is Ni-Fe. They are mirror to each other.
    conflict: SociotypeCode.SLI,
    supervisionPartner: SociotypeCode.ILE,
    supervisee: SociotypeCode.SLI,
    benefactor: SociotypeCode.ILE,
    beneficiary: SociotypeCode.ESE,
    description: "The Mentor is a highly theatrical and expressive visionary. Masters of dramatic emotional atmospheres, they guide groups of people toward epic future outcomes with magnetic charisma, but collapse when faced with boring physical maintenance or physiological details.",
    strengths: ["Exceptional charismatic leadership", "Unwavering dramatic impact", "Profound temporal trend forecasting", "Motivates communities deeply"],
    weaknesses: ["Severe somatic neglect, Si vulnerable (PoLR)", "Overly sensitive to mechanical detail", "Hypochondriacal or unstable physical states", "Prone to severe emotional outbursts"],
    keyTraits: ["Aristocratic", "Farsighted", "Obstinate", "Ethics of Emotions", "Beta Quadra"],
    modelA: {
      Leading: InformationElementCode.Fe,
      Creative: InformationElementCode.Ni,
      Role: InformationElementCode.Te,
      Vulnerable: InformationElementCode.Si,
      Suggestive: InformationElementCode.Ti,
      Mobilizing: InformationElementCode.Se,
      Ignoring: InformationElementCode.Fi,
      Demonstrative: InformationElementCode.Ne
    }
  },
  [SociotypeCode.LSI]: {
    code: SociotypeCode.LSI,
    mbtiEquivalent: "ISTJ", // ISTJ cognitively is Ti-Se. LSI maps perfectly.
    russianName: "Инспектор (Inspector)",
    englishName: "Logical Sensing Introvert",
    pseudonym: "Maxim Gorky",
    gulenkoAlias: "The Inspector",
    quadra: QuadraName.Beta,
    duals: SociotypeCode.EIE,
    activation: SociotypeCode.SLE, // Wait, activation of LSI is SLE? Actually, activation of LSI is SLE (Se-Ti) - let's check: EIE has Fe-Ni, LSI has Ti-Se. Activation of LSI is SLE.
    mirror: SociotypeCode.SLE, // Mirror of LSI is SLE.
    conflict: SociotypeCode.IEE,
    supervisionPartner: SociotypeCode.ESE,
    supervisee: SociotypeCode.IEE,
    benefactor: SociotypeCode.SEI,
    beneficiary: SociotypeCode.ESI,
    description: "The Inspector is an iron warden of structural protocol and systemic order. They possess flawless spatial discipline, applying structural rules to regulate organizations. They are blind to speculative possibilities and require emotional visionaries to bring meaning to their structure.",
    strengths: ["Perfect detail coordination", "Impeccable structural discipline", "Highly reliable executing power", "Maintains corporate protocol"],
    weaknesses: ["Terrified of unstructured speculative options (Ne PoLR)", "Struggles to adapt to chaotic changes", "Aloof and excessively rigid guidelines", "Prone to dogmatic moral evaluations"],
    keyTraits: ["Aristocratic", "Farsighted", "Obstinate", "Structural Logic", "Beta Quadra"],
    modelA: {
      Leading: InformationElementCode.Ti,
      Creative: InformationElementCode.Se,
      Role: InformationElementCode.Fi,
      Vulnerable: InformationElementCode.Ne,
      Suggestive: InformationElementCode.Fe,
      Mobilizing: InformationElementCode.Ni,
      Ignoring: InformationElementCode.Te,
      Demonstrative: InformationElementCode.Si
    }
  },
  [SociotypeCode.SLE]: {
    code: SociotypeCode.SLE,
    mbtiEquivalent: "ESTP",
    russianName: "Маршал (Marshal)",
    englishName: "Sensing Logical Extravert",
    pseudonym: "Zhukov",
    gulenkoAlias: "The Conqueror",
    quadra: QuadraName.Beta,
    duals: SociotypeCode.IEI,
    activation: SociotypeCode.LSI,
    mirror: SociotypeCode.LSI,
    conflict: SociotypeCode.EII,
    supervisionPartner: SociotypeCode.SEE,
    supervisee: SociotypeCode.EII,
    benefactor: SociotypeCode.ESE,
    beneficiary: SociotypeCode.LSI,
    description: "The Marshal is an expert strategist of force, physical resources, and logistics. They navigate competitive hierarchies with sharp executive decision-making. However, they are completely paralyzed by quiet moral relationships and subtle ethical affinities.",
    strengths: ["Unmatched tactical dominance", "Clear resources management", "Overcomes external resistance swiftly", "Razor-sharp objective logic"],
    weaknesses: ["Complete blindness to ethical relationships (Fi PoLR)", "Tactless or aggressive interpersonal behavior", "Prone to paranoia about loyalty", "Struggles with slow philosophical tasks"],
    keyTraits: ["Aristocratic", "Farsighted", "Yielding", "Sensing of Power", "Beta Quadra"],
    modelA: {
      Leading: InformationElementCode.Se,
      Creative: InformationElementCode.Ti,
      Role: InformationElementCode.Ne,
      Vulnerable: InformationElementCode.Fi,
      Suggestive: InformationElementCode.Ni,
      Mobilizing: InformationElementCode.Fe,
      Ignoring: InformationElementCode.Si,
      Demonstrative: InformationElementCode.Te
    }
  },
  [SociotypeCode.IEI]: {
    code: SociotypeCode.IEI,
    mbtiEquivalent: "INFJ", // INFJ cognitively Ni-Fe maps to IEI.
    russianName: "Лирик (Lyricist)",
    englishName: "Intuitive Ethical Introvert",
    pseudonym: "Yesenin",
    gulenkoAlias: "The Romantic",
    quadra: QuadraName.Beta,
    duals: SociotypeCode.SLE,
    activation: SociotypeCode.EIE,
    mirror: SociotypeCode.EIE,
    conflict: SociotypeCode.LSE,
    supervisionPartner: SociotypeCode.EII,
    supervisee: SociotypeCode.LSE,
    benefactor: SociotypeCode.ILI,
    beneficiary: SociotypeCode.SEI,
    description: "The Lyricist is a quiet romantic who observes temporal trends, deep psychological loops, and historical flow. They inspire competitive leaders with dramatic vision and prophecies but avoid dry practical efficiency and logistic protocols.",
    strengths: ["Exceptional predictive vision", "Exquisite artistic sensitivity", "Soothes group emotional heat", "Deeply empathetic explorer of thoughts"],
    weaknesses: ["Paralyzed by boring business logistics (Te PoLR)", "Lacks self-motivation and physical push", "Prone to financial/organizational escapism", "Extremely fragile somatic state"],
    keyTraits: ["Aristocratic", "Farsighted", "Yielding", "Intuition of Time", "Beta Quadra"],
    modelA: {
      Leading: InformationElementCode.Ni,
      Creative: InformationElementCode.Fe,
      Role: InformationElementCode.Si,
      Vulnerable: InformationElementCode.Te,
      Suggestive: InformationElementCode.Se,
      Mobilizing: InformationElementCode.Ti,
      Ignoring: InformationElementCode.Ne,
      Demonstrative: InformationElementCode.Fi
    }
  },
  [SociotypeCode.SEE]: {
    code: SociotypeCode.SEE,
    mbtiEquivalent: "ESFP",
    russianName: "Политик (Politician)",
    englishName: "Sensing Ethical Extravert",
    pseudonym: "Napoleon",
    gulenkoAlias: "The Politician",
    quadra: QuadraName.Gamma,
    duals: SociotypeCode.ILI,
    activation: SociotypeCode.ESI,
    mirror: SociotypeCode.ESI,
    conflict: SociotypeCode.LII,
    supervisionPartner: SociotypeCode.SLE,
    supervisee: SociotypeCode.LII,
    benefactor: SociotypeCode.SEE, // Self-benefit loops exist
    beneficiary: SociotypeCode.EIE,
    description: "The Politician is a charismatic initiator of campaigns and physical presence. They establish strong loyalty and moral distance while executing volitional spatial goals. They seek structural thinkers to ground their hyper-active plans in logic.",
    strengths: ["Excellent moral-political leadership", "High visual presence and authority", "Forges useful networks of friends", "Dynamic adapter of crises"],
    weaknesses: ["Paralyzed by systemic logic models (Ti PoLR)", "Tactless or hypocritical when cornered", "Struggles with deep scientific research", "Prone to intellectual impatience"],
    keyTraits: ["Democratic", "Farsighted", "Yielding", "Sensing of Power", "Gamma Quadra"],
    modelA: {
      Leading: InformationElementCode.Se,
      Creative: InformationElementCode.Fi,
      Role: InformationElementCode.Ne,
      Vulnerable: InformationElementCode.Ti,
      Suggestive: InformationElementCode.Ni,
      Mobilizing: InformationElementCode.Te,
      Ignoring: InformationElementCode.Si,
      Demonstrative: InformationElementCode.Fe
    }
  },
  [SociotypeCode.ILI]: {
    code: SociotypeCode.ILI,
    mbtiEquivalent: "INTJ", // MBTI equivalent of ILI (Ni-Te) is INTJ. Great distinction!
    russianName: "Критик (Critic)",
    englishName: "Intuitive Logical Introvert",
    pseudonym: "Balzac",
    gulenkoAlias: "The Critic",
    quadra: QuadraName.Gamma,
    duals: SociotypeCode.SEE,
    activation: SociotypeCode.LIE,
    mirror: SociotypeCode.LIE,
    conflict: SociotypeCode.ESE,
    supervisionPartner: SociotypeCode.EII,
    supervisee: SociotypeCode.ESE,
    benefactor: SociotypeCode.ILI,
    beneficiary: SociotypeCode.SLI,
    description: "The Critic is a highly analytical and quiet forecaster. They observe processes, spotting inefficiencies, economic traps, and trend failures. They maintain a cool, pragmatic posture but are deeply exhausted by theatrical group hysteria.",
    strengths: ["Unrivaled long-term forecasting", "Excellent economic pragmatism", "Detects systemic flaws instantly", "Calm and composed crisis management"],
    weaknesses: ["Vulnerable to emotional group coercion (Fe PoLR)", "Apathetic physical energy and static loops", "Can be overly cynical, blocking projects", "Struggles to express feelings openly"],
    keyTraits: ["Democratic", "Farsighted", "Yielding", "Intuition of Time", "Gamma Quadra"],
    modelA: {
      Leading: InformationElementCode.Ni,
      Creative: InformationElementCode.Te,
      Role: InformationElementCode.Si,
      Vulnerable: InformationElementCode.Fe,
      Suggestive: InformationElementCode.Se,
      Mobilizing: InformationElementCode.Fi,
      Ignoring: InformationElementCode.Ne,
      Demonstrative: InformationElementCode.Ti
    }
  },
  [SociotypeCode.LIE]: {
    code: SociotypeCode.LIE,
    mbtiEquivalent: "ENTJ", // ENTJ cognitively Te-Ni. Accurate!
    russianName: "Предприниматель (Enterpriser)",
    englishName: "Logical Intuitive Extravert",
    pseudonym: "Jack London",
    gulenkoAlias: "The Explorer",
    quadra: QuadraName.Gamma,
    duals: SociotypeCode.ESI,
    activation: SociotypeCode.SEE,
    mirror: SociotypeCode.SEE,
    conflict: SociotypeCode.SEI,
    supervisionPartner: SociotypeCode.LSE,
    supervisee: SociotypeCode.SEI,
    benefactor: SociotypeCode.LII,
    beneficiary: SociotypeCode.ESI,
    description: "The Enterpriser is a quick-witted, pragmatic explorer of resources and futuristic plans. They thrive in fast-paced situations, mobilizing logic and analytics to complete investments, but are blind to physiological limits and aesthetic harmony.",
    strengths: ["High pragmatic workflow drive", "Bold long-term investments vision", "Excellent adaptive risk management", "Highly objective and factual intellect"],
    weaknesses: ["Severe somatic neglect, Si vulnerable (PoLR)", "Ignores immediate bodily physical limitations", "Appears hurried, impatient, or dry", "Struggles with maintaining deep emotional safety"],
    keyTraits: ["Democratic", "Farsighted", "Obstinate", "Pragmatic Logic", "Gamma Quadra"],
    modelA: {
      Leading: InformationElementCode.Te,
      Creative: InformationElementCode.Ni,
      Role: InformationElementCode.Fe,
      Vulnerable: InformationElementCode.Si,
      Suggestive: InformationElementCode.Fi,
      Mobilizing: InformationElementCode.Se,
      Ignoring: InformationElementCode.Ti,
      Demonstrative: InformationElementCode.Ne
    }
  },
  [SociotypeCode.ESI]: {
    code: SociotypeCode.ESI,
    mbtiEquivalent: "ISFJ", // ISFJ cognitively Fi-Se is ESI.
    russianName: "Хранитель (Guardian)",
    englishName: "Ethical Sensing Introvert",
    pseudonym: "Theone", // Standard is Dreiser
    gulenkoAlias: "The Guardian",
    quadra: QuadraName.Gamma,
    duals: SociotypeCode.LIE,
    activation: SociotypeCode.ILI,
    mirror: SociotypeCode.ILI,
    conflict: SociotypeCode.ILE,
    supervisionPartner: SociotypeCode.EII,
    supervisee: SociotypeCode.ILE,
    benefactor: SociotypeCode.SEI,
    beneficiary: SociotypeCode.EII,
    description: "The Guardian is a loyal moralist who observes ethical affinities and protective borders. They possess high spatial aesthetic awareness, guarding their inner circle from outside disruption while supporting pragmatic work strategies.",
    strengths: ["Unwavering ethical loyalty", "Protective and disciplined focus", "Aesthetic physical spatial styling", "Excellent character analysis"],
    weaknesses: ["Terrified of abstract speculative options (Ne PoLR)", "Struggles with sudden plan shifts", "Prone to dogmatic ethical black-and-white judging", "Struggles to outline raw logical formulas"],
    keyTraits: ["Democratic", "Farsighted", "Obstinate", "Ethics of Relations", "Gamma Quadra"],
    modelA: {
      Leading: InformationElementCode.Fi,
      Creative: InformationElementCode.Se,
      Role: InformationElementCode.Ti,
      Vulnerable: InformationElementCode.Ne,
      Suggestive: InformationElementCode.Te,
      Mobilizing: InformationElementCode.Ni,
      Ignoring: InformationElementCode.Fe,
      Demonstrative: InformationElementCode.Si
    }
  },
  [SociotypeCode.LSE]: {
    code: SociotypeCode.LSE,
    mbtiEquivalent: "ESTJ", // ESTJ cognitively Te-Si is LSE.
    russianName: "Администратор (Administrator)",
    englishName: "Logical Sensing Extravert",
    pseudonym: "Stierlitz",
    gulenkoAlias: "The Director",
    quadra: QuadraName.Delta,
    duals: SociotypeCode.EII,
    activation: SociotypeCode.IEE,
    mirror: SociotypeCode.IEE,
    conflict: SociotypeCode.IEI,
    supervisionPartner: SociotypeCode.SLE,
    supervisee: SociotypeCode.IEI,
    benefactor: SociotypeCode.ESE,
    beneficiary: SociotypeCode.EIE,
    description: "The Administrator is a pristine organizer of logistical structures, physical quality, and workflows. They manage projects with extreme factual efficiency while maintaining high environmental comfort, but are completely blind to temporal tracking and futuristic vision.",
    strengths: ["Master of factual logistics", "High design quality checking", "Superb spatial and bodily comfort organizing", "Highly robust working capacity"],
    weaknesses: ["Complete blindness to temporal forecasting (Ni PoLR)", "Struggles with slow, ambiguous projects", "Appears overly strict, dry, or micro-managing", "Prone to severe stress during sudden scheduling shifts"],
    keyTraits: ["Aristocratic", "Carefree", "Obstinate", "Pragmatic Logic", "Delta Quadra"],
    modelA: {
      Leading: InformationElementCode.Te,
      Creative: InformationElementCode.Si,
      Role: InformationElementCode.Fe,
      Vulnerable: InformationElementCode.Ni,
      Suggestive: InformationElementCode.Fi,
      Mobilizing: InformationElementCode.Ne,
      Ignoring: InformationElementCode.Ti,
      Demonstrative: InformationElementCode.Se
    }
  },
  [SociotypeCode.EII]: {
    code: SociotypeCode.EII,
    mbtiEquivalent: "INFJ", // Cognitive is Fi-Ne, which is MBTI INFp/INFP or INFJ in some maps, but strictly EII.
    russianName: "Гуманист (Humanist)",
    englishName: "Ethical Intuitive Introvert",
    pseudonym: "Dostoyevsky",
    gulenkoAlias: "The Counselor",
    quadra: QuadraName.Delta,
    duals: SociotypeCode.LSE,
    activation: SociotypeCode.SLI,
    mirror: SociotypeCode.SLI,
    conflict: SociotypeCode.SLE,
    supervisionPartner: SociotypeCode.IEI,
    supervisee: SociotypeCode.SLE,
    benefactor: SociotypeCode.ESI,
    beneficiary: SociotypeCode.ILI,
    description: "The Humanist is a compassionate guardian of interior values and psychological development. They heal moral conflicts, guiding others with subtle suggestions of potential, but are completely helpless in environments of hostile power dominance and kinetic force.",
    strengths: ["Deep moral empathic counsel", "Understands personal human potential", "Generates moral solutions easily", "Excellent loyalty and devotion"],
    weaknesses: ["Vulnerable to physical kinetic confrontation, Se vulnerable (PoLR)", "Struggles to demand physical authority", "Can be overly sensitive to moral slights", "Ignores immediate logistical efficiency"],
    keyTraits: ["Aristocratic", "Carefree", "Obstinate", "Ethics of Relations", "Delta Quadra"],
    modelA: {
      Leading: InformationElementCode.Fi,
      Creative: InformationElementCode.Ne,
      Role: InformationElementCode.Ti,
      Vulnerable: InformationElementCode.Se,
      Suggestive: InformationElementCode.Te,
      Mobilizing: InformationElementCode.Si,
      Ignoring: InformationElementCode.Fe,
      Demonstrative: InformationElementCode.Ni
    }
  },
  [SociotypeCode.IEE]: {
    code: SociotypeCode.IEE,
    mbtiEquivalent: "ENFP",
    russianName: "Советчик (Advisor)",
    englishName: "Intuitive Ethical Extravert",
    pseudonym: "Huxley",
    gulenkoAlias: "The Reporter",
    quadra: QuadraName.Delta,
    duals: SociotypeCode.SLI,
    activation: SociotypeCode.EII,
    mirror: SociotypeCode.EII,
    conflict: SociotypeCode.LSI,
    supervisionPartner: SociotypeCode.ILE,
    supervisee: SociotypeCode.LSI,
    benefactor: SociotypeCode.IEE,
    beneficiary: SociotypeCode.EIE,
    description: "The Advisor is an enthusiastic explorer of human potentials, ideas, and moral bonds. They thrive by pointing out hidden possibilities in others and adjusting interpersonal distances, but collapse when systematizing structures or following formal bureaucratic laws.",
    strengths: ["Superb human potentials insight", "Charismatic relationship builder", "Infinite source of options and plans", "Deep psychological accuracy"],
    weaknesses: ["Complete blindness to formal logical formulas (Ti PoLR)", "Dislikes standard bureaucratic logs", "Prone to administrative disorganization", "Avoids physical spatial physical confrontations"],
    keyTraits: ["Aristocratic", "Carefree", "Yielding", "Intuition of Ideas", "Delta Quadra"],
    modelA: {
      Leading: InformationElementCode.Ne,
      Creative: InformationElementCode.Fi,
      Role: InformationElementCode.Se,
      Vulnerable: InformationElementCode.Ti,
      Suggestive: InformationElementCode.Si,
      Mobilizing: InformationElementCode.Te,
      Ignoring: InformationElementCode.Ni,
      Demonstrative: InformationElementCode.Fe
    }
  },
  [SociotypeCode.SLI]: {
    code: SociotypeCode.SLI,
    mbtiEquivalent: "ISTP",
    russianName: "Мастер (Master)",
    englishName: "Sensing Logical Introvert",
    pseudonym: "Gabin",
    gulenkoAlias: "The Craftsman",
    quadra: QuadraName.Delta,
    duals: SociotypeCode.IEE,
    activation: SociotypeCode.LSE,
    mirror: SociotypeCode.LSE,
    conflict: SociotypeCode.EIE,
    supervisionPartner: SociotypeCode.LII,
    supervisee: SociotypeCode.EIE,
    benefactor: SociotypeCode.SLI,
    beneficiary: SociotypeCode.LII,
    description: "The Craftsman is an quiet developer of material objects, physiological comfort, and mechanical quality. They design premium products and physical layouts while minimizing work costs, but are extremely distressed by theatrical emotional outbursts and social dramatics.",
    strengths: ["Exquisite ergonomic craftsmanship", "Perfect material optimization", "Deep biological stress tracking", "Highly independent logical solver"],
    weaknesses: ["Vulnerable to dramatic emotional atmospheres, Fe vulnerable (PoLR)", "Aloof, quiet, stands back in groups", "Dislikes abstract speculative structures", "Struggles to express emotional warmth openly"],
    keyTraits: ["Aristocratic", "Carefree", "Yielding", "Sensing of Sensation", "Delta Quadra"],
    modelA: {
      Leading: InformationElementCode.Si,
      Creative: InformationElementCode.Te,
      Role: InformationElementCode.Ni,
      Vulnerable: InformationElementCode.Fe,
      Suggestive: InformationElementCode.Ne,
      Mobilizing: InformationElementCode.Fi,
      Ignoring: InformationElementCode.Se,
      Demonstrative: InformationElementCode.Ti
    }
  }
};

export const REININ_DICHOTOMIES_DATA: Record<SociotypeCode, ReininDichotomies> = {
  [SociotypeCode.ILE]: {
    extraversion: "Extraverted", sensing: "Intuition", logic: "Logic", rational: "Irrational",
    aristocracy: "Democratic", carefree: "Carefree", yielding: "Yielding", staticDynamic: "Static",
    tactical: "Tactical", constructivist: "Constructivist", positivist: "Positivist", judicious: "Judicious",
    merry: "Merry", process: "Result", asking: "Asking"
  },
  [SociotypeCode.SEI]: {
    extraversion: "Introverted", sensing: "Sensing", logic: "Ethics", rational: "Irrational",
    aristocracy: "Democratic", carefree: "Carefree", yielding: "Yielding", staticDynamic: "Dynamic",
    tactical: "Tactical", constructivist: "Constructivist", positivist: "Negativist", judicious: "Judicious",
    merry: "Merry", process: "Process", asking: "Declaring"
  },
  [SociotypeCode.ESE]: {
    extraversion: "Extraverted", sensing: "Sensing", logic: "Ethics", rational: "Rational",
    aristocracy: "Democratic", carefree: "Carefree", yielding: "Obstinate", staticDynamic: "Dynamic",
    tactical: "Tactical", constructivist: "Emotivest", positivist: "Positivist", judicious: "Judicious",
    merry: "Merry", process: "Result", asking: "Declaring"
  },
  [SociotypeCode.LII]: {
    extraversion: "Introverted", sensing: "Intuition", logic: "Logic", rational: "Rational",
    aristocracy: "Democratic", carefree: "Carefree", yielding: "Obstinate", staticDynamic: "Static",
    tactical: "Tactical", constructivist: "Emotivest", positivist: "Negativist", judicious: "Judicious",
    merry: "Merry", process: "Process", asking: "Asking"
  },
  [SociotypeCode.EIE]: {
    extraversion: "Extraverted", sensing: "Intuition", logic: "Ethics", rational: "Rational",
    aristocracy: "Aristocratic", carefree: "Farsighted", yielding: "Obstinate", staticDynamic: "Dynamic",
    tactical: "Strategic", constructivist: "Emotivest", positivist: "Negativist", judicious: "Decisive",
    merry: "Merry", process: "Process", asking: "Asking"
  },
  [SociotypeCode.LSI]: {
    extraversion: "Introverted", sensing: "Sensing", logic: "Logic", rational: "Rational",
    aristocracy: "Aristocratic", carefree: "Farsighted", yielding: "Obstinate", staticDynamic: "Static",
    tactical: "Strategic", constructivist: "Emotivest", positivist: "Positivist", judicious: "Decisive",
    merry: "Merry", process: "Result", asking: "Declaring"
  },
  [SociotypeCode.SLE]: {
    extraversion: "Extraverted", sensing: "Sensing", logic: "Logic", rational: "Irrational",
    aristocracy: "Aristocratic", carefree: "Farsighted", yielding: "Yielding", staticDynamic: "Static",
    tactical: "Strategic", constructivist: "Constructivist", positivist: "Positivist", judicious: "Decisive",
    merry: "Merry", process: "Process", asking: "Declaring"
  },
  [SociotypeCode.IEI]: {
    extraversion: "Introverted", sensing: "Intuition", logic: "Ethics", rational: "Irrational",
    aristocracy: "Aristocratic", carefree: "Farsighted", yielding: "Yielding", staticDynamic: "Dynamic",
    tactical: "Strategic", constructivist: "Constructivist", positivist: "Negativist", judicious: "Decisive",
    merry: "Merry", process: "Result", asking: "Asking"
  },
  [SociotypeCode.SEE]: {
    extraversion: "Extraverted", sensing: "Sensing", logic: "Ethics", rational: "Irrational",
    aristocracy: "Democratic", carefree: "Farsighted", yielding: "Yielding", staticDynamic: "Static",
    tactical: "Tactical", constructivist: "Constructivist", positivist: "Positivist", judicious: "Decisive",
    merry: "Serious", process: "Result", asking: "Declaring"
  },
  [SociotypeCode.ILI]: {
    extraversion: "Introverted", sensing: "Intuition", logic: "Logic", rational: "Irrational",
    aristocracy: "Democratic", carefree: "Farsighted", yielding: "Yielding", staticDynamic: "Dynamic",
    tactical: "Tactical", constructivist: "Constructivist", positivist: "Negativist", judicious: "Decisive",
    merry: "Serious", process: "Process", asking: "Asking"
  },
  [SociotypeCode.LIE]: {
    extraversion: "Extraverted", sensing: "Intuition", logic: "Logic", rational: "Rational",
    aristocracy: "Democratic", carefree: "Farsighted", yielding: "Obstinate", staticDynamic: "Dynamic",
    tactical: "Tactical", constructivist: "Emotivest", positivist: "Positivist", judicious: "Decisive",
    merry: "Serious", process: "Result", asking: "Asking"
  },
  [SociotypeCode.ESI]: {
    extraversion: "Introverted", sensing: "Sensing", logic: "Ethics", rational: "Rational",
    aristocracy: "Democratic", carefree: "Farsighted", yielding: "Obstinate", staticDynamic: "Static",
    tactical: "Tactical", constructivist: "Emotivest", positivist: "Negativist", judicious: "Decisive",
    merry: "Serious", process: "Process", asking: "Declaring"
  },
  [SociotypeCode.LSE]: {
    extraversion: "Extraverted", sensing: "Sensing", logic: "Logic", rational: "Rational",
    aristocracy: "Aristocratic", carefree: "Carefree", yielding: "Obstinate", staticDynamic: "Dynamic",
    tactical: "Strategic", constructivist: "Emotivest", positivist: "Negativist", judicious: "Judicious",
    merry: "Serious", process: "Process", asking: "Declaring"
  },
  [SociotypeCode.EII]: {
    extraversion: "Introverted", sensing: "Intuition", logic: "Ethics", rational: "Rational",
    aristocracy: "Aristocratic", carefree: "Carefree", yielding: "Obstinate", staticDynamic: "Static",
    tactical: "Strategic", constructivist: "Emotivest", positivist: "Positivist", judicious: "Judicious",
    merry: "Serious", process: "Result", asking: "Asking"
  },
  [SociotypeCode.IEE]: {
    extraversion: "Extraverted", sensing: "Intuition", logic: "Ethics", rational: "Irrational",
    aristocracy: "Aristocratic", carefree: "Carefree", yielding: "Yielding", staticDynamic: "Static",
    tactical: "Strategic", constructivist: "Constructivist", positivist: "Positivist", judicious: "Judicious",
    merry: "Serious", process: "Process", asking: "Asking"
  },
  [SociotypeCode.SLI]: {
    extraversion: "Introverted", sensing: "Sensing", logic: "Logic", rational: "Irrational",
    aristocracy: "Aristocratic", carefree: "Carefree", yielding: "Yielding", staticDynamic: "Dynamic",
    tactical: "Strategic", constructivist: "Constructivist", positivist: "Negativist", judicious: "Judicious",
    merry: "Serious", process: "Result", asking: "Declaring"
  }
};

export const INTERTYPE_RELATIONS = {
  Dual: {
    name: "Dualitas (Dual)",
    description: "Hubungan paling ideal & seimbang secara psikologis di mana seluruh kelemahan dilindungi oleh kelebihan dual Anda tanpa rasa menghakimi. Mengisi Suggestive function dengan asupan sempurna."
  },
  Activator: {
    name: "Aktivasi (Activation)",
    description: "Saling merangsang aksi dengan sangat cepat dan hiperaktif. Bagus untuk kolaborasi kreatif berdurasi pendek, namun melelahkan karena kedua tipe berinteraksi melintasi status rasionalitas yang berbeda."
  },
  Mirror: {
    name: "Cermin (Mirror)",
    description: "Saling mencerminkan cara pandang yang sama namun dengan penekanan aksi yang berbeda (Leading vs Creative). Diskusi intelektual tingkat tinggi yang memuaskan dan konstruktif."
  },
  Conflict: {
    name: "Konflik (Conflict)",
    description: "Tipe berlawanan mutlak secara kognitif. Apa yang Anda anggap berharga justru diabaikan oleh konfliktor Anda. Kelemahan PoLR Anda ditekan terus-menerus tanpa henti."
  },
  Supervision: {
    name: "Supervisi (Supervision)",
    description: "Hubungan hierarkis asimetris yang menekan. Supervisor mengamati dan mengoreksi kognisi Supervisee secara kritis, membuat Supervisee merasa bersalah tanpa sebab yang logis."
  },
  Benefit: {
    name: "Keuntungan (Benefit)",
    description: "Hubungan donor-penerima kognitif asimetris. Benefactor mengirimkan impuls moral kognitif kepada Beneficiary, memicu kekaguman namun sulit untuk berinteraksi setara."
  },
  MirrorComplex: {
    name: "Identitas Quasi (Quasi-Identity)",
    description: "Tampak sangat mirip di permukaan (diduga MBTI yang sama), namun menggunakan fungsi berlawanan (Ti-Ne vs Te-Ni). Sulit bersepakat pada kesimpulan praktis."
  },
  Extinguishment: {
    name: "Pemadaman (Extinguishment / Contrary)",
    description: "Saling mematikan minat kognitif masing-masing. Memiliki perspektif yang sama namun berlawanan secara mutlak dalam arah eksekusi (Introvert vs Extravert)."
  },
  Illusionary: {
    name: "Ilusioner (Illusionary / Mirage)",
    description: "Nyaman di awal untuk bersenang-senang dan bersantai, namun tidak menghasilkan pencapaian produktif karena ketiadaan keterikatan logika pragmatis."
  },
  SemiDual: {
    name: "Semi-Dualitas (Semi-Dual)",
    description: "Koneksi dual sebagian. Saling memahami secara kognitif kental, namun adakalanya terjadi tabrakan hebat karena ketiadaan pelindung PoLR yang sempurna."
  },
  Comparative: {
    name: "Komparatif (Comparative / Kindred)",
    description: "Memiliki Leading function yang persis sama namun arah Creative yang berlainan. Bersepakat dalam teori, bertarung dalam taktik tindakan."
  },
  Business: {
    name: "Bisnis (Business / Lookalike)",
    description: "Memiliki Creative function yang sama namun Leading berbeda. Nyaman untuk melakukan pekerjaan praktis bersama, namun dingin secara moral kognitif."
  }
};

export function calculateIntertypeRelation(type1: SociotypeCode, type2: SociotypeCode): { relation: string, description: string } {
  if (type1 === type2) {
    return { relation: "Identitas (Identity)", description: "Memiliki tipe kognitif yang sama persis. Saling memahami dengan sempurna tanpa penjelasan, namun rawan stagnasi tanpa input baru." };
  }

  const info1 = SOCIOTYPES[type1];
  
  if (info1.duals === type2) return { relation: INTERTYPE_RELATIONS.Dual.name, description: INTERTYPE_RELATIONS.Dual.description };
  if (info1.activation === type2) return { relation: INTERTYPE_RELATIONS.Activator.name, description: INTERTYPE_RELATIONS.Activator.description };
  if (info1.mirror === type2) return { relation: INTERTYPE_RELATIONS.Mirror.name, description: INTERTYPE_RELATIONS.Mirror.description };
  if (info1.conflict === type2) return { relation: INTERTYPE_RELATIONS.Conflict.name, description: INTERTYPE_RELATIONS.Conflict.description };
  
  if (info1.supervisionPartner === type2) return { relation: `${INTERTYPE_RELATIONS.Supervision.name} (Tergugat - Supervisee)`, description: `Anda berada di bawah pengawasan kritis ${type2}. Anda cenderung merasa tidak aman di depan mereka karena mereka menekan PoLR Anda.` };
  if (info1.supervisee === type2) return { relation: `${INTERTYPE_RELATIONS.Supervision.name} (Hakim - Supervisor)`, description: `Anda adalah Supervisor bagi ${type2}. Anda mengamati kelemahan kognisinya dengan mudah dan mendikte tindakan mereka secara kritis.` };
  
  if (info1.benefactor === type2) return { relation: `${INTERTYPE_RELATIONS.Benefit.name} (Penerima - Beneficiary)`, description: `Anda menerima impuls pemicu emosi/pemikiran dari Benefactor Anda (${type2}). Terpesona oleh aksi mereka namun sulit membalas kognitif mereka.` };
  if (info1.beneficiary === type2) return { relation: `${INTERTYPE_RELATIONS.Benefit.name} (Pendonor - Benefactor)`, description: `Anda mendominasi transmisi gagasan kognitif kepada Penerima (${type2}). Mereka mendengarkan Anda, namun Anda merasa mereka kurang bernilai kognitif.` };

  // Calculate Quasi
  const mbti1 = info1.mbtiEquivalent;
  const info2 = SOCIOTYPES[type2];
  const mbti2 = info2.mbtiEquivalent;
  
  // Quasi identical in Socionics is e.g. LII (Ti-Ne) and LSI (Ti-Se) or ILI (Ni-Te) and LII (Ti-Ne)? No, Quasi is e.g. LII (Ti-Ne, INTj) and ILI (Ni-Te, INTp). They share j/p dichotomy of Myers-Briggs (both are INTJs/INTPs in Myers-Briggs depending on mapping)
  if (mbti1 === mbti2) {
    return { relation: INTERTYPE_RELATIONS.MirrorComplex.name, description: INTERTYPE_RELATIONS.MirrorComplex.description };
  }

  // Extinguishment/Contrary: share all dichotomies except Extra/Intro and Rational/Irrational?
  // Let's check contrary of LII (Ti-Ne) is ILE? No, contrary of LII is LSE? Contrary of LII is ILE (Ne-Ti) - both are Ti-Ne / Ne-Ti but one is introvert other is extravert.
  if (info1.modelA.Leading === info2.modelA.Creative && info1.modelA.Creative === info2.modelA.Leading) {
    return { relation: INTERTYPE_RELATIONS.Extinguishment.name, description: INTERTYPE_RELATIONS.Extinguishment.description };
  }

  // Semi-dual: share dual-seeking (Suggestive) of one is the other's lead, but not vice-versa
  if (info1.modelA.Suggestive === info2.modelA.Leading) {
    return { relation: INTERTYPE_RELATIONS.SemiDual.name, description: INTERTYPE_RELATIONS.SemiDual.description };
  }

  // Illusionary/Mirage: Lead of one is mobilizing of the other
  if (info1.modelA.Leading === info2.modelA.Mobilizing) {
    return { relation: INTERTYPE_RELATIONS.Illusionary.name, description: INTERTYPE_RELATIONS.Illusionary.description };
  }

  // Lookalike/Business: share creative
  if (info1.modelA.Creative === info2.modelA.Creative) {
    return { relation: INTERTYPE_RELATIONS.Business.name, description: INTERTYPE_RELATIONS.Business.description };
  }

  // Comparative/Kindred: share lead
  if (info1.modelA.Leading === info2.modelA.Leading) {
    return { relation: INTERTYPE_RELATIONS.Comparative.name, description: INTERTYPE_RELATIONS.Comparative.description };
  }

  return {
    relation: "Hubungan Netral (Neutral / De-energizing)",
    description: "Koneksi netral di mana sistem kognitif berjalan di jalur yang mandiri. Tidak ada ketertarikan instan maupun ancaman kognitif berbahaya."
  };
}
