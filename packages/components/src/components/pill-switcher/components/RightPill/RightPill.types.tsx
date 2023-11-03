import { ButtonDropdownProps } from '../../../button-dropdown';

export type RightPillProps = Omit<
  ButtonDropdownProps,
  'variant' | 'icon' | 'className' | 'disabled'
> & { width?: string; initialSelected?: string };
