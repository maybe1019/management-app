export interface Data {
  field: string;
  label: string;
  tagLabel?: string;
  type?: string;
  values?: any[];
  tooltipInfo?: string;
}

export interface FormattedData {
  keyValue: string;
  value: string;
  referenceValue: Record<string, any>;
  iconName?: string;
}
