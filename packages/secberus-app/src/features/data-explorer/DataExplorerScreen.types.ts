import { PropertyNames } from '@secberus/components';
import type { DataExplorerResultsProps } from './components/results/types/DataExplorerResults.types';
import type { ActiveTableViews, KeyTypes } from './components';

export type PathParams = {
  orgId?: string;
  query?: string;
  result?: string;
  queryId?: string;
  // state value: /explorer/:viewtype/:queryId for views/queries/policies
  viewType?: 'view' | 'policy' | 'query';
  [key: string]: any;
};

export type ActiveTabs = {
  name: string;
  openTabs: Record<'tables' | 'views', string[]>;
  query: DataExplorerResultsProps['queryArgs']['query'];
  currentTab: string;
  expandedBrowsers?: Record<string, boolean>;
  searchFilters?: Partial<Record<PropertyNames<ActiveTableViews>, string>>;
  // Optional attributes to apply some basic information. Typed and loose.
  attributes?: {
    type?: 'POLICY' | 'QUERY' | 'VIEW';
    [key: string]: any;
  };
};

export type CreateActiveTab = Pick<ActiveTabs, 'name'>;

export type RecordActiveTabs = Record<string, ActiveTabs>;

export type HandleResultTabUpdate = (
  key: string,
  value: Partial<ActiveTabs>
) => void;

export type DeleteResultTab = (key: string) => void;

export type SetTabAttributes = (
  key: string,
  attributes: ActiveTabs['attributes'] | Record<never, never>
) => void;

export type SetOrRemoveTab = (
  queryId: string | undefined,
  id: string,
  keyType: KeyTypes
) => void;

export type QueryExplorerStatesContext = {
  tabStates: RecordActiveTabs;
  getTabState: (key?: string | null) => ActiveTabs | null;
  setTabState: HandleResultTabUpdate;
  setOpenTabs: SetOrRemoveTab;
  removeOpenTab: SetOrRemoveTab;
  deleteTabState: DeleteResultTab;
  setTabAttributes: SetTabAttributes;
};
