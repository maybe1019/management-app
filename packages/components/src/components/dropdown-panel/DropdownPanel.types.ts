import { TextProps } from '../text/Text.types';

export interface DropdownChildProps {
  title: string;
  titleTextProps?: Partial<TextProps>;
  displayOnly?: boolean;
}

export interface DropdownPanelProps {
  title: string;
  titleTextProps?: Partial<TextProps>;
}
