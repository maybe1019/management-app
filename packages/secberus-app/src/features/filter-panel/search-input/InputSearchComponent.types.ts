import { ColorProperties } from '@secberus/components';

export interface InputSearchComponentProps {
  value?: string;
  onChange: (value?: string) => void;
  backgroundColor?: ColorProperties;
  disabledBackgroundColor?: ColorProperties;
  disabledColor?: ColorProperties;
  enableWithNoLength?: boolean;
  className?: string;
  onClose?: () => void;
  expands?: boolean;
  placeholder?: string;
  buttonLabel?: string;
}
