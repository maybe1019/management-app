import { ColorProperties } from '../../../../types';

export interface KeyValueFilterProps {
  values?: string[][];
  onChange: (values: string[][]) => void;
  backgroundColor?: ColorProperties;
  allFieldsRequired?: boolean;
}
