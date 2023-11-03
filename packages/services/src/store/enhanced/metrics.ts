import { secberusApiGWGenerated as secberusApi } from '../secberusApiGWGenerated';

import {
  GetMetricApiArg,
  GetMetricApiResponse,
} from '../injections/secberusApiGW.generated';

const metricTypes = {
  violationsOpen: 'Violations Open',
  riskScore: 'Risk Score',
  policiesSubscribed: 'Policies Subscribed',
  resourcesScanned: 'Resources Scanned',
  violationsClosedRemediated: 'Violations Closed Remediated',
  timeToRemediate: 'Time to Remediate',
};

export type MetricType = keyof typeof metricTypes;

type GetMetricApiArgModName = Omit<GetMetricApiArg, 'name'> & {
  name: MetricType;
};

export const metricsApi = secberusApi.injectEndpoints({
  endpoints: (build) => ({
    getMetric: build.query<GetMetricApiResponse, GetMetricApiArgModName>({
      query: (queryArg) => ({
        url: `/metrics/${metricTypes[queryArg.name]}`,
        params: {
          limit: queryArg.limit,
          service: queryArg.service,
          start_time: queryArg.startTime,
          end_time: queryArg.endTime,
        },
      }),
      providesTags: ['Metrics'],
    }),
  }),
  overrideExisting: true,
});
