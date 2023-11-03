export const formatMultiValueSearchParams = (
  params?: Record<string, string | string[]>
): URLSearchParams => {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      v.forEach((vv) => query.append(k, vv));
    } else query.append(k, v);
  });

  return query;
};
