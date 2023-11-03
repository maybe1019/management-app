import { secberusApiGW } from '../injections';

export const reportSchedulesApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    listReportSchedules: {
      providesTags: ['Report', { type: 'Report', id: 'LIST' }],
    },
    createReportSchedule: {
      invalidatesTags: [{ type: 'Report', id: 'LIST' }],
      extraOptions: { muteError: true },
    },
    getReportSchedule: {
      providesTags: ['Report'],
    },
    updateReportSchedule: {
      invalidatesTags: ['Report'],
      extraOptions: { muteError: true },
    },
    deleteReportSchedule: {
      invalidatesTags: [{ type: 'Report', id: 'LIST' }],
    },
    sendVerification: {
      invalidatesTags: ['Report'],
    },
  },
});
