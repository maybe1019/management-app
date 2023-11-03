export const tryParseJson = (jsonString?: string) => {
  if (!jsonString) {
    return undefined;
  }
  try {
    const o = JSON.parse(jsonString);
    return o;
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return undefined;
};
