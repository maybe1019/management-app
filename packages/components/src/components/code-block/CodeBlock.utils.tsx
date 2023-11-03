import { Data } from './CodeBlock.types';

const reduceToDataValue = (
  acc: Record<string, string | boolean>,
  curr: Data
) => {
  const { data } = curr;
  return (acc = { ...acc, ...data });
};

export const returnDataOnly = (data: Data[]): Record<string, any> => {
  return data.reduce(reduceToDataValue, {});
};

export const containsTrue = (isExpanded: Record<string, boolean>): boolean => {
  const values = Object.entries(isExpanded);

  return values.some(([key, val]) => key !== 'persistButton' && val === true);
};
