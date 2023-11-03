import {
  PaginationControlsProps,
  PaginationNavigationProps,
} from '@secberus/components';
import { Cursor } from '@secberus/services';

export interface UsePaginationProps {
  navProps: Omit<PaginationNavigationProps, 'onRight' | 'onLeft'>;
  limitProps: Omit<PaginationControlsProps, 'valueKey' | 'options'> &
    Partial<Pick<PaginationControlsProps, 'options'>>;
  tableId: string;
  defaultPage?: Cursor['page'];
  defaultLimit?: Cursor['limit'];
  hideSelect?: boolean;
  pages?: Cursor['pages'];
  contextId?: string;
  onChange?: ({ page, limit }: { page: string; limit?: string }) => void;
}

export interface UsePaginationStoreProps
  extends Pick<UsePaginationProps, 'tableId'>,
    Required<Pick<UsePaginationProps, 'defaultLimit' | 'defaultPage'>> {
  limit?: string;
  page?: string;
  contextId?: string;
}

export type LocalStorageStateLimitPage = Pick<
  UsePaginationStoreProps,
  'limit' | 'page'
>;

export type LocalStorageByOrg = Record<
  string,
  { [key: string]: LocalStorageStateLimitPage }
>;

export type LocalStorageState = Array<LocalStorageByOrg>;
