import { secberusApi } from '@secberus/services';
import type { OptionKey } from '../query/DataExplorerQuery.component';

export type RecordOptionKey = Record<OptionKey, string>;

export type CloseCallbackArgs = {
  modalType: OptionKey;
  id?:
    | secberusApi.SaveQueryApiResponse['id']
    | secberusApi.SaveViewApiResponse['id'];
  name?: secberusApi.EditQueryApiResponse['name'];
};

export type DeleteModalProps = {
  isVisible?: boolean;
  modalType?: OptionKey;
  closeCallback: (props: CloseCallbackArgs) => unknown;
  query?: secberusApi.SavedSqlQuery;
};

export type CloseCallback = ({
  modalType,
  id,
  name,
}: CloseCallbackArgs) => unknown;

export type EditOrSaveModalProps = {
  isEdit?: boolean;
  isVisible?: boolean;
  modalType?: OptionKey;
  closeCallback: CloseCallback;
  name?: secberusApi.SaveSqlQuery['name'] | secberusApi.SaveView['name'];
  query?: secberusApi.SaveSqlQuery['query'] | secberusApi.SaveView['query'];
};

export type SaveQuery = Pick<secberusApi.SaveSqlQuery, 'query' | 'name'>;
export type SaveView = Pick<secberusApi.SaveView, 'query' | 'name'>;
