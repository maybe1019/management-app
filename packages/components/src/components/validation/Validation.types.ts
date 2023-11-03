import { FieldError } from 'react-hook-form';
export interface StyledValidationProps {
  errorVisible: boolean;
  noMargin?: boolean;
}

export interface ValidationHandlerProps {
  label?: string;
  error?: FieldError | { message: string };
  className?: string;
  noMargin?: boolean;
  helperText?: string;
}
