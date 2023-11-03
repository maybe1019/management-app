import { ColorProperties } from '../../../../../../types';
export type Item = { id: number; value: string };
export interface DropdownSelectProps {
  items: Item[];
  dropdownLabel: string;
  labelMargin: string;
  dropdownIcon?: JSX.Element;
  dropdownTextColor?: ColorProperties;
  dropdownBackgroundColor?: ColorProperties;
  dropdownLabelColor?: ColorProperties;
  className?: string;
  defaultValue?: Item;
  onChange?: (item: Item) => void;
  maxHeight?: string;
}

export interface DropdownButtonProps {
  color: ColorProperties;
  backgroundColor: ColorProperties;
  isOpen: boolean;
  labelMargin: string;
}
