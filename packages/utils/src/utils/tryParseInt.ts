export const tryParseInt = (val?: string): number | null => {
  if (!val) {
    return null;
  }
  const parsed = parseInt(val);
  if (isNaN(parsed)) {
    return null;
  }
  return parsed;
};
