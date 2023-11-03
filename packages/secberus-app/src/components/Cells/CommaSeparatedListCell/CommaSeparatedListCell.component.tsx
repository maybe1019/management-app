import React from 'react';
import { Text, TextProps } from '@secberus/components';
import { isObject } from '@secberus/utils';

export interface CommaSeparatedListCellProps {
  list: any[];
  useObjectProperty?: string;
  delimiter?: string;
  textProps?: TextProps;
}

/**
 * Helper component to take a list of values and return a comma separated list.
 *
 * Array of objects can be directly passed if the useObjectProperty is set to the
 * property name. Dot notation can be used. For example, to access "@hello":
 *
 * `<CommaSeparatedListCell
 *  useObjectProperty="nested.social"
 *  list={[
 *    {
 *      name: 'Hello',
 *      email: 'hello@gmail.com',
 *      nested: { social: '@hello' },
 *    }
 *  ]}
 * />`
 *
 * @param list
 * @param useObjectValue
 * @param delimiter
 * @param textProps
 * @constructor
 */
export const CommaSeparatedListCell: React.FC<CommaSeparatedListCellProps> = ({
  list,
  useObjectProperty,
  delimiter = ', ',
  textProps,
}) => {
  const getPropertyValue = (propertyName: string, obj: Record<string, any>) =>
    propertyName
      .split('.')
      .reduce((acc, property) => acc?.[property], obj);

  const text = React.useMemo(() => {
    return list
      .map(val => {
        if (isObject(val) && useObjectProperty)
          return getPropertyValue(useObjectProperty, val);
        return val;
      })
      .join(delimiter);
  }, [delimiter, list, useObjectProperty]);

  return (
    <Text type="small-regular" {...textProps}>
      {text}
    </Text>
  );
};
