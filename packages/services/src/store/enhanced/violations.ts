import { secberusApiGW } from '../injections';

// Enhanced endpoints for violations
export const violationsApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    getViolations: {
      providesTags: ['Violation'],
    },
    getViolation: {
      providesTags: ['Violation'],
    },
    suppressViolation: {
      invalidatesTags: ['Violation'],
    },
    suppressViolations: {
      invalidatesTags: ['Violation'],
    },
    unsuppressViolation: {
      invalidatesTags: ['Violation'],
    },
    unsuppressViolations: {
      invalidatesTags: ['Violation'],
    },
  },
});
