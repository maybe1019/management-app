export interface KeyValueFilterProps {
  values?: string[][];
  onChange: (values: string[][]) => void;
  allFieldsRequired?: boolean;
}
