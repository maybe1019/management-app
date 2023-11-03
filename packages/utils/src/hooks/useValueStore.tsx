import React from 'react';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

// Not useful beyond being DRY so don't export
type TypedRecord<T> = Record<string, T>;

// Not useful...but always export hook arg types.
export type UseValueStoreProps<Value> = {
  defaultValue?: TypedRecord<Value>;
};

/**
 * @author Duncan Pierce <duncan@secberus.com>
 * @description Unopinionative key-value store helper which will maintain a
 * stateful and strictly typed storage. Performs cheap calculations
 * for primitives, and slightly more expensive but consistent for object
 * and array values
 *
 * @param defaultValue any value other than an array, initial state
 * @example
 * useValueStore<Record<string, string[]>>(
 *   { abc: { def: ['ghi', 'jkl'] }}
 * )
 * useValueStore<string>({foo: 'bar'})
 * useValueStore<boolean>({ baz: true, bat: false })
 */
export function useValueStore<Value>({
  defaultValue = {},
}: UseValueStoreProps<Value>) {
  const [selectedValues, setSelectedValues] = React.useState<
    TypedRecord<Value>
  >(defaultValue || {});
  /**
   * @author Duncan Pierce <duncan@secberus.com>
   * @description Add or update the current state with a new value. The state
   * will overwrite the existing key. If the value is an object or array it
   * performs a lodash merge on the object to prevent shallow data transfers.
   * If the value is a primitive (string, boolean, number) it will spread.
   *
   * @param key string - property key to access
   * @param value unknown - value to add or update
   *
   * @example
   * addOrUpdateValue('abc', false);
   * addOrUpdateValue('foo', { baz: null });
   */
  const addOrUpdateValue = React.useCallback(
    (key: string, value: Value): void => {
      // typeof object will be truthy for arrays so merge is fine
      if (
        typeof selectedValues[key] === 'object' ||
        selectedValues[key] !== null
      ) {
        // Deep merge object values to prevent loss of nested objects
        setSelectedValues(merge(selectedValues, { [key]: value }));
      } else {
        // any other type
        setSelectedValues({
          ...selectedValues,
          [key]: value,
        });
      }
    },
    [selectedValues]
  );

  /**
   * @author Duncan Pierce <duncan@secberus.com>
   * @description Sets multiple values with a deep merge. More expensive
   * but allows for you to set as many records as you want.
   * @param values Record<string, unknown>
   * @example
   * setManyValues({ abc: 'def', ghi: 'jkl' })
   */
  const setManyValues = React.useCallback(
    (values: TypedRecord<Value>) => {
      setSelectedValues(merge(selectedValues, values));
    },
    [selectedValues]
  );

  /**
   * @author Duncan Pierce <duncan@secberus.com>
   * @description Expensive delete calculation, deletes the key entirely.
   * If you're just trying to disable a state, use addOrUpdateValue instead.
   * This should only be used when trying to maintain a clean state with no
   * hanging values
   *
   * @param key string
   * @returns void
   *
   * @example deleteValue('foo')
   */
  const deleteValue = React.useCallback(
    (key: string): void => {
      if (!(key in selectedValues)) return;
      // deep clone so the delete operant doesn't modify state
      const clonedValues = cloneDeep(selectedValues);
      delete clonedValues[key];
      setSelectedValues(clonedValues);
    },
    [selectedValues]
  );
  return {
    selectedValues,
    addOrUpdateValue,
    setManyValues,
    deleteValue,
  };
}
