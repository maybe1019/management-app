import { ReactNode } from 'react';
import { CSSProperties } from 'styled-components';
import { Control } from 'react-hook-form';
import { InputProps } from '../text-input/input/TextInput.types';
import { ButtonProps } from '../button/Button.types';
import { SelectProps, SelectOption } from '../select/Select.types';

export interface IntegrationInputMain {
  title?: string;
  // input?: InputProps | InputProps[]; deprecated TODO: updated
  input?: InputProps | InputProps[];
  select?: SelectProps | SelectProps[];
  errors?: { [key: string]: unknown };
  renderUnderInput?: ReactNode;
  link?: string;
  buttons?: ButtonProps[];
  gridStyles?: CSSProperties;
  isEdit?: boolean;
}

export interface IntegrationInputProps extends InputProps {
  fillWidth?: boolean;
  name?: string;
  selectProps?: {
    options?: SelectOption[];
    placeholder?: string;
    control: Control;
    defaultValue?: SelectOption;
  };
}
