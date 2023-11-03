// // USE CASE: react-hook-form started sometimes defaulting values to arrays instead of false.... this breaks everything
export const convertArrayValuesToFalse = (data: Record<string, any>) =>
  Object.entries(data).reduce((acc, curr) => {
    const [k, v] = curr;

    if (Array.isArray(v)) {
      acc[k] = false;
      return acc;
    }

    if (typeof v === 'undefined') {
      acc[k] = v;
      return acc;
    }

    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      acc[k] = convertArrayValuesToFalse(v);
      return acc;
    }

    acc[k] = v;

    return acc;
  }, {} as Record<string, any>);
