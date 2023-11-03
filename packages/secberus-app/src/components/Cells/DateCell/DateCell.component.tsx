import React from 'react';
import day from 'dayjs';
import { Text, TextProps } from '@secberus/components';
import relativeTime from 'dayjs/plugin/relativeTime';

day.extend(relativeTime);

export interface DateCellProps {
  datetime?: any;
  relative?: boolean;
  format?: string;
  invalidString?: string;
  textProps?: TextProps;
}

/**
 * Helper table cell class to quickly get formatted time strings.
 * Accepts both a unix timestamp or an instance of `Date`.
 *
 * @param datetime - unix timestamp or Date
 * @param relative - should the time be relative? (i.e.: x mins ago)
 * @param format - format string should follow (i.e.: YYYY-MM-DD HH:mm (Z)). If relative is set, will be ignored.
 * @param invalidString - string to show if invalidate date instance.
 * @param textType - props of underlying Text component.
 * @constructor
 */
export const DateCell = ({
  datetime,
  relative,
  format = 'YYYY-MM-DD',
  invalidString = '-',
  textProps,
}: DateCellProps) => {
  const instance = React.useMemo(() => {
    if (datetime instanceof Date) return day(datetime);
    return day.unix(datetime ?? 0);
  }, [datetime]);

  const dateStr = React.useMemo(() => {
    if (!datetime || datetime === 0 || !instance.isValid())
      return invalidString;
    return relative ? instance.fromNow() : instance.format(format);
  }, [instance, format, invalidString, relative, datetime]);

  return (
    <Text type="small-regular" {...textProps}>
      {dateStr}
    </Text>
  );
};
