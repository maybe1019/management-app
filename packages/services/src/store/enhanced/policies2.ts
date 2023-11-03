import { secberusApi } from '../injections';

export const policiesApi2 = secberusApi.secberusApi.enhanceEndpoints({
  endpoints: {
    listPolicies: {
      providesTags: ['Policy', { type: 'Policy', id: 'LIST' }],
    },
    getPolicy: {
      providesTags: ['Policy'],
    },
    createPolicy: {
      invalidatesTags: [{ type: 'Policy', id: 'LIST' }],
    },
    updatePolicy: {
      invalidatesTags: ['Policy'],
    },
    deletePolicy: {
      invalidatesTags: [{ type: 'Policy', id: 'LIST' }],
    },
    policySubscriptions: {
      invalidatesTags: ['Policy'],
    },
  },
});
