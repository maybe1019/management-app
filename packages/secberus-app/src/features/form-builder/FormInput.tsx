import {
  Input,
  Checkbox,
  InputProps,
  CheckboxProps,
  RadioGroup,
  RadioGroupProps,
  TextArea,
  TextAreaProps,
} from '@secberus/components';
import { ComposedFormInput } from './definitions';

export const FormInput = Input as React.FC<ComposedFormInput<InputProps>>;

export const FormCheckbox = Checkbox as React.FC<
  ComposedFormInput<CheckboxProps>
>;

export const FormRadioGroup = RadioGroup as React.FC<
  ComposedFormInput<RadioGroupProps>
>;

export const FormTextArea = TextArea as React.FC<
  ComposedFormInput<TextAreaProps>
>;
