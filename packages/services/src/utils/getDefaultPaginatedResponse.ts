import { Cursor } from '../store/injections/secberusApiGW.generated';

type DefaultPaginatedResponse<T> = {
  cursor: Partial<Cursor>;
  results: T[];
};
export function getDefaultPaginatedResponse<T>(): DefaultPaginatedResponse<T> {
  return {
    cursor: {},
    results: [],
  };
}
