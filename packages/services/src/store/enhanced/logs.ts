import { secberusApiGWGenerated } from '../secberusApiGWGenerated';
import { Cursor } from '../injections/secberusApiGW.generated';

export type LogLevel = 'CRITICAL' | 'ERROR' | 'WARNING' | 'INFO';

// Args
type ApiLogsPagination = {
  limit?: number;
  page: number;
  query_id: string;
  sort_by?: Array<string>;
};
type ApiLogsFilters = {
  datasource_name?: Array<string>;
  datasource_type?: Array<string>;
  policy_name?: Array<string>;
  text_search?: string;
};
type ApiLogsParams = {
  earliest?: number | string;
  latest?: number | string;
  filters?: ApiLogsFilters;
};
export type CustomGetLogsApiArgs = {
  pagination?: ApiLogsPagination;
  params?: ApiLogsParams;
};

// Response
export type CustomLog = {
  id: string;
  sid: string;
  source: string;
  type: string;
  time: number;
  data: {
    message: string;
    type: string;
    level: LogLevel;
    event_type: string;
    [key: string]: string;
  };
};
export type CustomGetLogsApiResponse = {
  logs: CustomLog[];
  page_tokens?: Array<string>;
  cursor: Cursor;
};

export type CustomGetLogsQueryIdArgs = {
  params?: ApiLogsParams;
};
export type CustomGetLogsQueryIdApiResponse = {
  query_id: string;
};

export const logsApi = secberusApiGWGenerated.injectEndpoints({
  endpoints: (build) => ({
    getLogs: build.query<CustomGetLogsApiResponse, CustomGetLogsApiArgs>({
      query: (body) => ({
        method: 'POST',
        url: `/ecs/api/logs/page`,
        body,
      }),
    }),
    getQueryId: build.query<
      CustomGetLogsQueryIdApiResponse,
      CustomGetLogsQueryIdArgs
    >({
      query: (body) => ({
        method: 'POST',
        url: '/ecs/api/logs/queryid',
        body,
      }),
    }),
  }),
  overrideExisting: true,
});
