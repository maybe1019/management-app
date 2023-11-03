import { ColorProperties } from '../../../../types';
import { InputProps } from '../../../text-input/input/TextInput.types';
import { TextProps } from '../../../text/Text.types';
import { DropdownSelectProps, TypeAheadOption } from './components';

export type DisplayOnlyProps = {
  displayOnlyText: string;
  displayOnlyColor?: ColorProperties;
  displayOnlyBackgroundColor?: ColorProperties;
};

export interface TypeAheadProps {
  typeAheadOptions: TypeAheadOption[];
  typeAheadPlaceholder: string;
  useTypeahead?: boolean;
  typeAheadBorderRadius?: string;
  typeAheadBackgroundColor?: ColorProperties;
  typeAheadTextColor?: ColorProperties;
}

export interface LabelProps {
  labelProps: TextProps;
  labelText: string;
}

type Inputs = InputProps | TypeAheadProps;

type BaseConditionGate = {
  textLabelProps: LabelProps;
  inputProps: Inputs;
};

export interface DisplayConditionGateProps extends BaseConditionGate {
  leftComponentDisplay: DisplayOnlyProps;
  useTypeahead?: boolean;
}

export interface DropdownConditionGateProps extends BaseConditionGate {
  leftComponentDropdown: DropdownSelectProps;
  useTypeahead?: boolean;
  defaultValue?: TypeAheadOption;
  onChange?: (...args: any) => void;
  maxHeight?: string;
}
