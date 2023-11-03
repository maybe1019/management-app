import { secberusApi_RunQueryApiArg } from '@secberus/services';
import { HandleItemClickArgs } from '../..';

export type KeyTypes = HandleItemClickArgs['keyType'];
export type DataExplorerResultsProps = {
  activeTabs?: {
    type: KeyTypes;
    id: string;
    title: string;
  }[];
  closeTab: (tabKey: string) => void;
  queryArgs: secberusApi_RunQueryApiArg['sqlQuery'];
  setQueryFocusCallback: React.Dispatch<
    React.SetStateAction<
      React.Dispatch<React.SetStateAction<string>> | undefined
    >
  >;
};
