export const replaceAnyOf = (
  string: string,
  match: string | string[],
  replace: string
) => {
  const regex = new RegExp(
    (Array.isArray(match) ? match : [match])
      // escape literals
      .map(e => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|'),
    'g'
  );

  return string.replaceAll(regex, replace);
};
