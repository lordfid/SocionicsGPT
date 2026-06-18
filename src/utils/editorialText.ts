export function polishEditorialText(input?: string | null): string {
  if (!input) return "";

  const cleaned = input
    .replace(/\s+/g, " ")
    .replace(/\bAnda\b/g, "Kamu")
    .replace(/\banda\b/g, "kamu")
    .replace(/\bKetika\b/g, "Saat")
    .replace(/\bketika\b/g, "saat")
    .trim();

  return cleaned.replace(/^([a-zà-ÿ])/, (match) => match.toUpperCase());
}

export function polishEditorialList(items?: string[] | null): string[] {
  return (items ?? []).map((item) => polishEditorialText(item)).filter(Boolean);
}
