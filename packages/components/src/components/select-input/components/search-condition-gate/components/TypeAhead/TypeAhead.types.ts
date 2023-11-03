import { Dispatch, SetStateAction } from 'react';
import { ColorProperties } from '../../../../../../types';

export interface TypeAheadProps {
  typeAheadPlaceholder: string;
  typeAheadOptions: Item[];
  onChange: Dispatch<SetStateAction<string>>;
  inputValue: string;
  inputStyle?: string;
  typeAheadBorderRadius?: string;
  typeAheadBackgroundColor?: ColorProperties;
  typeAheadTextColor?: ColorProperties;
  className?: string;
}

export type Item = {
  value: string;
  id: number;
};
