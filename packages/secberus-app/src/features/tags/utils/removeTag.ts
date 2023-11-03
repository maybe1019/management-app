import { omit } from 'lodash';

export const removeTag = (
  referenceValue: Record<string, any>,
  formData: Record<string, any>
) => {
  const [key, value] = Object.entries(referenceValue)[0];

  const defaultValue = resetByFilterType(key, value, formData);
  return { key, defaultValue };
};

//NOTE: Helper Functions

const resetByFilterType = (
  key: string,
  value: string,
  formData: Record<string, any>
) => {
  if (key.includes('id') || key.includes('_type')) {
    return { ...formData[key], [value]: false };
  }
  if (key === 'severity_label') {
    return { ...formData[key], [value]: false };
  }
  if (key === 'tag' || key === 'resource_data') {
    return omit(formData[key], [value]);
  }
  if (key === 'show_passing') {
    return { true: false };
  }
  return { true: false, false: false };
};
