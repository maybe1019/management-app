import { UseFormMethods } from 'react-hook-form';

export interface MultiSelectionBoxProps
  extends Pick<UseFormMethods, 'register' | 'control' | 'setValue' | 'watch'> {
  data: FilterData;
  className?: string;
  isLoading?: boolean;
  nest?: string;
}

export interface FilterGroupProps
  extends Pick<UseFormMethods, 'register' | 'control' | 'setValue'> {
  groupId: string;
  group: FilterGroupOptionProps;
  hide?: boolean;
  isLoading?: boolean;
  nest?: string;
  formData?: { [key: string]: boolean };
  [key: string]: unknown;
}

export interface FilterComponentProps {
  groupId: string;
  register?: any;
  group: FilterGroupOptionProps;
  control?: any;
}

export interface FilterGroupOptionProps {
  id?: string;
  field: string;
  label: string;
  type?: string;
  expanded?: boolean;
  hide?: boolean;
  maxHeight?: string;
  minHeight?: string;
  placeholder?: string;
  tooltipInfo?: string;
  values: { [key: string]: any }[];
  resetCustomValues?: (...props: any) => any;
  componentProps?: {
    [key: string]: any;
  };
}

export interface FilterData {
  views?: { id: string; display: string; icon: JSX.Element; to: string }[];
  filters: FilterGroupOptionProps[];
}

export interface InputComponentProps extends FilterComponentProps {
  value?: { [key: string]: boolean };
  onChange: (selected: { [key: string]: boolean }) => void;
}
