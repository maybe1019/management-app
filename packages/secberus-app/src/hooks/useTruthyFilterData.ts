import React from 'react';
import { pickBy } from 'lodash';
import { isObject } from '@secberus/utils';

// The filter params we get from the query params only include truthy values but MSB returns truthy and falsey values.
// The filterData object changes on the intiial render as a result.
// We only care about passing truthy values to our update fn however so filtering it in this way will prevent an extra render.

export const useTruthyFilterData = (filterData: Record<string, any>) => {
  const truthy = React.useMemo(
    () =>
      Object.entries(filterData).reduce((acc, [key, val]) => {
        acc[key] = isObject(val)
          ? pickBy(val, o => typeof o === 'boolean' || typeof o === 'string')
          : val;
        return acc;
      }, {} as Record<string, any>),
    [filterData]
  );

  return truthy;
};
