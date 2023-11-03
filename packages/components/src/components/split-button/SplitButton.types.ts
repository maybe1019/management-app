import { ButtonProps } from '../button';
import { ListOption } from '../list';

export interface SplitButtonProps extends ButtonProps {
  options?: ListOption[];
}
