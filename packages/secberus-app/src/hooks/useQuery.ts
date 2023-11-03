import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  filterObject,
  isEmptyObject,
  StringWithAutoComplete,
  useDeepEffect,
} from '@secberus/utils';

// try parse json
export const tryParseJSON = (str?: string | null) => {
  if (str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  }
  return str;
};

// replace key values in object
const replaceKeys = (obj: Record<string, any>, replace: any) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key] = replace;
    return acc;
  }, {} as Record<string, any>);

// filter nullish values from array
export const filterNullish = (arr: any[]) => {
  const filtered = arr.filter(v => v !== null && v !== undefined);
  return filtered.length > 0 ? filtered : undefined;
};

// function to make empty string undefined
export const emptyStringToUndefined = (str: string) =>
  str === '' ? undefined : str;

export const filterNullishValuesFromObj = (obj: Record<string, any>) => {
  const reduced = Object.keys(obj).reduce((acc, key) => {
    if (Array.isArray(obj[key]) && obj[key].length > 0) {
      acc[key] = obj[key];
    }
    if (
      !Array.isArray(obj[key]) &&
      obj[key] !== null &&
      obj[key] !== undefined &&
      obj[key] !== ''
    ) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Record<string, any>);

  return isEmptyObject(reduced) ? undefined : reduced;
};

// remove keys from object with null or undefined values
export const removeEmptyValues = <
  T extends Record<string, any> | string | any[]
>(
  obj?: T
): T =>
  (obj &&
    (typeof obj === 'string'
      ? emptyStringToUndefined(obj)
      : Array.isArray(obj)
      ? filterNullish(obj)
      : filterNullishValuesFromObj(obj))) as T;

// use local storage hook
const useLocalStorage = <T>(key?: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = React.useState<T | undefined>(() => {
    if (!key) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? tryParseJSON(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(
        // @ts-ignore
        key,
        JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteValue = (k?: string) => {
    if (k === key || !k) {
      setStoredValue(undefined);
    }
    if (k || key) {
      // @ts-expect-error - TS can't detect that we're checking for key existence
      window.localStorage.removeItem(k || key);
    }
  };

  return [storedValue, setValue, deleteValue] as const;
};

/**
 * Returns an object of query parameters
 *
 * @typeParam T - A string literal or string literal union representing the param keys you are expecting
 */
export const useQuery = <T extends string = string>() => {
  const query = new URLSearchParams(useLocation().search);
  return Object.fromEntries(query) as Record<T, string>;
};

/**
 * Returns a formatted url with any query parameters.
 * @param url
 * @param key
 * @param value
 */
export const generateURL = (url: string, key: string, value: any) => {
  const searchParams = new URLSearchParams();
  searchParams.set(key, JSON.stringify(value));
  return `${url}?${searchParams.toString()}`;
};

const useSetSearchParams = () => {
  const { replace } = useHistory();

  const setSearchParams = useCallback(
    (k: string, d: Record<string, any>) => {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.search);

      const reduced = removeEmptyValues(d);

      reduced
        ? searchParams.set(k, JSON.stringify(reduced))
        : searchParams.delete(k);

      replace(`${url.pathname}?${searchParams.toString()}`);
    },
    [replace]
  );

  return { setSearchParams };
};

type QueryTypes = 'sort' | 'pagination' | 'filter';

/**
 * @param key - key of the query, e.g. 'sort', 'pagination', 'filter'
 * @param defaultValue - default value of the query, e.g. 'false', '[]', '{}'
 *
 * @returns getter, setter, and deleter of the query, as well as the URLSearchParams object itself
 *
 * @example
 * const { getQuery, updateQuery, deleteQuery, query } = useQuery('sort')
 * // We can also pass a default value to the hook at the key specified when we initialize the hook:
 * const { getQuery, updateQuery } = useQuery('sort', { "id": "name", "desc": false })
 * // For convenience, 'sort' is now the default key of this query hook instance, so we can do e.g.:
 * updateQuery({ "id": "name", "desc": true })
 * // or
 * const sort = getQuery()
 * // however, we can also pass a custom key to any of the functions returned by useQuery to override the default key:
 * const getQuery('filter')
 * updateQuery('filter', { "name": "John" })
 *
 * // we can also use the hook without a default key:
 * const { getQuery, updateQuery } = useQuery()
 * // in this case, we must pass a key to the functions returned by useQuery:
 * const sort = getQuery('sort')
 * updateQuery('sort', { "id": "name", "desc": true })
 *
 * // useQuery accepts a type parameter to specify the type of the returned, parsed query value
 * const { getQuery } = useQuery<{ "id": string, "desc": boolean }>('sort', { "id": "name", "desc": false })
 * const sort = getQuery() // type of sort is { "id": string, "desc": boolean }
 *
 * @remarks
 * Some auto-complete functionality is provided for common keys, but they are suggestions only.
 */
export function useQueryV2<T>(
  key?: StringWithAutoComplete<QueryTypes>,
  defaultValue?: T,
  persist?: boolean,
  filterKeys?: string[]
) {
  const location = useLocation();
  const { replace } = useHistory();
  const { setSearchParams } = useSetSearchParams();
  const [persistedQuery, setPersistedQuery, deletePersistedQuery] =
    useLocalStorage(key, {} as Partial<Record<string, any>>);

  /**
   * @returns the URLSearchParams object directly for backwards compat and maximum flexibility
   * @example
   * const { query } = useQuery()
   * const sort = decodeAndParseURI(query.get('sort'))
   */
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  React.useEffect(() => {
    if (
      key &&
      persist &&
      persistedQuery &&
      !isEmptyObject(filterObject(persistedQuery, filterKeys ?? [])) &&
      !location.search
    ) {
      setSearchParams(
        key,
        filterKeys ? filterObject(persistedQuery, filterKeys) : persistedQuery
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, persist]);

  useDeepEffect(() => {
    if (defaultValue && key) {
      setSearchParams(key, defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, defaultValue]);

  /**
   * @param k - key of the query, e.g. 'sort', 'pagination', 'filter'
   *
   * @returns the parsed value of the query at the inherited key or the key passed as an argument
   *
   * @remarks
   * can be used with or without a key argument, but if used without a key argument, the key must be passed to the useQuery hook when it is initialized
   *
   * @example
   * const { getQuery } = useQuery('sort')
   * const sort = getQuery()
   * // or
   * const { getQuery } = useQuery()
   * const sort = getQuery('sort')
   *
   * // also accepts a generic type argument, which will be used to type the return value and takes precedence over the type argument passed to useQuery:
   * const sort = getQuery<{ "id": string, "desc": boolean }>()
   * // or
   * const sort = getQuery<{ "id": string, "desc": boolean }>('sort')
   */
  const getQuery = useCallback(
    <T1 = T>(k?: StringWithAutoComplete<QueryTypes>) => {
      const q = new URLSearchParams(window.location.search);
      const val = q.get(k ?? key ?? '');

      return tryParseJSON(val) as T1;
    },
    [key]
  );

  /**
   * @param key - key of the query, e.g. 'sort', 'pagination', 'filter'
   *
   * @returns void
   *
   * @example
   * const { deleteQuery } = useQuery()
   * deleteQuery('sort')
   * // or
   * const { deleteQuery } = useQuery('sort')
   * deleteQuery()
   *
   * @remarks
   * can be used with or without a key argument, but if used without a key argument, the key must be passed to the useQuery hook when it is initialized
   */
  const deleteQuery = useCallback(
    (k?: StringWithAutoComplete<QueryTypes>) => {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.search);

      searchParams.delete(k ?? key ?? '');

      // only support managing persisted state for initial key passed to hook
      if (key && !k) {
        setPersistedQuery((prev: any) => {
          return {
            ...prev,
            ...replaceKeys(getQuery() ?? {}, []),
          };
        });
      }

      replace(`${url.pathname}?${searchParams.toString()}`);
    },
    [getQuery, key, replace, setPersistedQuery]
  );

  /**
   * @param keyOrData - key of the query, e.g. 'sort', 'pagination', 'filter', or the data to be set
   * @param data - data to be set
   * @returns void
   * @remarks
   * If key is not supplied, the first argument will be treated as the data to be set.
   * If key is supplied, the second argument will be treated as the data to be set.
   *
   * @example
   * const { updateQuery } = useQuery('sort')
   * updateQuery({ "id": "name", "desc": true })
   * // or
   * const { updateQuery } = useQuery()
   * updateQuery('sort', { "id": "name", "desc": true })
   *
   * // updateQuery also accepts a callback function as the first or second argument (depending on if key is supplied), which will be called with the current value of the query:
   * updateQuery('sort', (sort) => ({ ...sort, "desc": !sort.desc }))
   * // or
   * updateQuery((sort) => ({ ...sort, "desc": !sort.desc }))
   * // this is useful for updating the query without having to read the current value first
   *
   */
  const updateQuery = useCallback(
    <T1 = T>(
      keyOrData?: T | ((arg0?: T) => T) | StringWithAutoComplete<QueryTypes>,
      data?: T1 | ((arg0?: T1) => T1)
    ) => {
      const d =
        typeof keyOrData === 'string'
          ? data instanceof Function
            ? data(getQuery(keyOrData))
            : data
          : keyOrData instanceof Function
          ? keyOrData(getQuery())
          : keyOrData;

      const k = typeof keyOrData === 'string' ? keyOrData : key;

      if (key && d)
        setPersistedQuery((prev: any) => {
          const reduced = removeEmptyValues(d);

          if (reduced) {
            return { ...prev, ...d };
          }
          return undefined;
        });

      if (k && d) {
        setSearchParams(k, d);
      }
    },
    [getQuery, key, setPersistedQuery, setSearchParams]
  );

  if (getQuery('force_reset')) {
    const key = getQuery<string>('force_reset');
    deleteQuery(key);
    deleteQuery('force_reset');
    deletePersistedQuery(key);
  }

  return { query, updateQuery, deleteQuery, getQuery };
}
