import { Option } from '../button-dropdown';
import { ButtonProps } from '../button/Button.types';
export interface IndicatorContainerProps {
  header: string;
  minHeight?: string;
  className?: string;
  isLoading?: boolean;
  menuOptions?: Option[];
  size?: ButtonProps['size'];
}
