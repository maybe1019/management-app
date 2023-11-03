import { CustomGetLogsApiResponse } from '@secberus/services';

type Log = CustomGetLogsApiResponse['logs'][0];

export type ChildType = Pick<Log, 'data' | 'time' | 'id' | 'type'> & {
  isChild: boolean;
  status: Log['data']['status'];
  event_type: Log['data']['event_type'];
};
export type ChildrenLogs = Omit<Log, 'data'> & {
  children: ChildType;
  message: Log['data']['message'];
  level: Log['data']['level'];
  event_type: Log['data']['event_type'];
};
