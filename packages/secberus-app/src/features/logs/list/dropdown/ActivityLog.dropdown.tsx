import { Box, Grid } from '@chakra-ui/react';
import { Text } from '@secberus/components';
import { useMemo } from 'react';
import day from 'dayjs';
import { ChildType } from '../../types/ActivityLog.types';

function TitleValueOutput({ title, value }: { title: string; value: string }) {
  return (
    <Box paddingBottom="16px">
      <Text type="small-bold">{title}</Text>
      <Text type="small-regular">{value}</Text>
    </Box>
  );
}

type DropdownTimeAndKeyValueStrings = {
  date: string;
  keyValues: string | undefined;
};
export function ActivityLogDropdown({
  data,
  id,
  time,
  event_type: eventType,
}: ChildType) {
  // cheapest to memo here, the render will not occur until the dropdown occurs.
  const { date, keyValues } = useMemo(() => {
    const returnContent: DropdownTimeAndKeyValueStrings = {
      date: day(new Date(time * 1000)).format('YYYY-MM-DD HH:mm:ss (Z)'),
      keyValues: undefined,
    };
    // Build remaining key values from data
    const {
      message: _message,
      level: _level,
      event_type: _eventType,
      ...rest
    } = data;
    // Key values aren't consistent along logs. They may exist, they may not.
    const miscEntries = Object.entries(rest);
    if (miscEntries.length) {
      // build string based upon keyValue map
      returnContent.keyValues = miscEntries.reduce((acc, kv) => {
        acc += `${acc.length ? ', ' : ''}${kv.join(': ')}`;
        return acc;
      }, '');
    }
    return returnContent;
  }, [time, data]);
  return (
    <Grid templateColumns="fit-content(30%) auto" gap="64px">
      <Box wordBreak="break-all" className="activity-log-grid-col-1">
        <TitleValueOutput title="Timestamp" value={date} />
        {data.level ? (
          <TitleValueOutput title="Level" value={data.level} />
        ) : null}
        {eventType ? (
          <TitleValueOutput title="Event type" value={eventType} />
        ) : null}
        <TitleValueOutput title="ID" value={id} />
      </Box>
      <div className="activity-log-grid-col-2">
        <Box>
          <TitleValueOutput title="Message" value={data.message} />
          {typeof keyValues === 'string' ? (
            <TitleValueOutput title="Data" value={keyValues} />
          ) : null}
        </Box>
      </div>
    </Grid>
  );
}
