import { secberusApiGW } from '../injections';

// Enhanced endpoints for Access Policies
export const accessPoliciesApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    getAccessPolicy: {
      providesTags: ['AccessPolicy'],
    },
    listAccessPolicies: {
      providesTags: ['AccessPolicy', { type: 'AccessPolicy', id: 'LIST' }],
    },
    createAccessPolicy: {
      invalidatesTags: [{ type: 'AccessPolicy', id: 'LIST' }],
    },
    updateAccessPolicy: {
      invalidatesTags: ['AccessPolicy'],
    },
    deleteAccessPolicy: {
      invalidatesTags: [{ type: 'AccessPolicy', id: 'LIST' }],
    },
  },
});
