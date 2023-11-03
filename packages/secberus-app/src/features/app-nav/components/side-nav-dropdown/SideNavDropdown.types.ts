import type { ListProps, ListOption } from '@secberus/components';

interface PositionOffset {
  top?: number;
  bottom?: number;
  left?: number;
}

export type SideNavDropdownArrowDirection = 'UP' | 'DOWN';

export interface DropdownListProps {
  elevation?: boolean;
  direction?: SideNavDropdownArrowDirection;
  rowHeight?: number;
  maxRows?: number;
  offset?: PositionOffset;
}

export interface SideNavDropdownProps {
  variant?: 'light' | 'dark';
  text: string;
  listOptions: ListOption[];
  dividerTop?: boolean;
  dividerBottom?: boolean;
  icon?: JSX.Element;
  subText?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  dark?: boolean;
  arrowDirection?: SideNavDropdownArrowDirection;
  menuPortalTarget?: HTMLElement | null;
  ListProps?: Partial<ListProps>;
  DropdownListProps?: DropdownListProps;
}
