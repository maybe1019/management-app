export interface CheckedMultiSelectProps {
  data: DataItem[];
  valueKey: string;
  displayKey: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: any) => void;
  error?: { message: string };
  label?: string;
  name?: string;
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  minItemsShown?: number;
  selectAllLabel: string;
  selectLimit?: number;
  allowSelectAll?: boolean;
  menuPortalTarget?: HTMLElement | null;
  disableClickAwayListener?: boolean;
}

export interface StyledDropdownListProps {
  maxHeight?: number;
}

export interface DataItem {
  [key: string]: any;
}
