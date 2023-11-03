import type { InputProps } from '../input';
import type { TextAreaProps } from '../text-area';

interface CopyFieldBaseProps {
  value: string;
  label?: string;
  type?: 'area' | 'field';
  onError?: () => void;
  onCopy?: (value: string) => void;
  copyFieldRef?: React.Ref<HTMLTextAreaElement | HTMLInputElement>;
}

export type CopyFieldProps<T> = T extends 'area'
  ? TextAreaProps & CopyFieldBaseProps
  : InputProps & CopyFieldBaseProps;
