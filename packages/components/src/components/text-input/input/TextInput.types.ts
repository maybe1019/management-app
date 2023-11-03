import { InputWrapperProps } from '../wrapper/TextInputWrapper.types';

export interface InputProps
  extends InputWrapperProps,
    React.InputHTMLAttributes<HTMLInputElement> {}
