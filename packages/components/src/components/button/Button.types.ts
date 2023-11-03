import { LinkProps } from 'react-router-dom';
import { ButtonVariants } from '../../types';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<Pick<LinkProps, 'to'>> {
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: ButtonVariants;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  type?: 'submit' | 'button';
  endIcon?: boolean;
  icon?: boolean;
  size?: 'default' | 'small';
  color?: string;
  background?: string;
  desc?: string;
}
