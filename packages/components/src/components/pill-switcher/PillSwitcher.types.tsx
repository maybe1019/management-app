import {
  ButtonDropdownProps,
  Option,
} from '../button-dropdown/ButtonDropdown.types';

export interface PillSwitcherProps extends ButtonDropdownProps {
  leftLabel: string;
  rightLabel: string;
  onSelect?: (option: Option) => void;
  rightPillWidth?: string;
  initialSelected?: string;
}
