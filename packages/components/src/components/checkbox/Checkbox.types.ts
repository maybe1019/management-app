import { TypographyProperties } from '../../types';

export interface CheckboxLabelProps {
  labelType?: TypographyProperties;
}

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelType?: CheckboxLabelProps['labelType'];
  indeterminate?: boolean;
  gutterBottom?: boolean;
}
