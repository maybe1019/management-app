export interface HeaderProps {
  readonly width?: number | string;
  minWidth?: number | string;
}

export interface ColumnHeaderProps {
  id?: string;
  activeSort?: Record<string, any>;
  setActiveSort?: (item: Record<string, any>) => void;
  sort?: (ascending: boolean, id: string, data?: Record<string, any>) => void;
  className?: string;
  width?: number | string;
  minWidth?: number | string;
  disableSort?: boolean;
}
