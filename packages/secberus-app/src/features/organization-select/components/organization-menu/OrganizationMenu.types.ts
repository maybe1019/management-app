import { Org } from '@secberus/services';
import { RefObject } from 'react';

export interface OrganizationMenuActionItem {
  label: string;
  icon?: JSX.Element;
  show?: boolean;
  onClick?: () => void;
}

export interface OrganizationMenuProps {
  menuPortalTarget?: HTMLElement | null;
  controlRef?: RefObject<HTMLElement | null>;
  orgs: Org[];
  selected?: Partial<Org>;
  onSelected?: (org: Org, notify?: boolean) => void;
  actionItem?: OrganizationMenuActionItem;
  transformName?: (name: string) => string;
}

export interface DropdownListProps {
  rowHeight?: number;
  maxRows?: number;
  alignRight?: boolean;
  maxHeight?: number;
  listWidth?: string;
  listTop?: string;
}

export interface ListItemProps {
  rowHeight?: number;
  selected?: boolean;
}
