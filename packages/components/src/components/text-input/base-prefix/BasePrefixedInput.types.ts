export interface BasePrefixedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  prefix?: string;
  className?: string;
  onChange?: (...args: any) => void;
}
