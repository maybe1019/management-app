import { secberusApiGW } from '../injections';

// Enhanced endpoints for exceptions
export const exceptionsApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    listExceptions: {
      providesTags: ['Exception', { type: 'Exception', id: 'LIST' }],
    },
    getException: {
      providesTags: ['Exception'],
    },
    createException: {
      invalidatesTags: [{ type: 'Exception', id: 'LIST' }],
    },
    deleteException: {
      invalidatesTags: [{ type: 'Exception', id: 'LIST' }],
    },
    updateException: {
      invalidatesTags: ['Exception'],
    },
    listPolicyExceptions: {
      providesTags: [
        'Exception',
        'Policy',
        { type: 'Exception', id: 'LIST' },
        { type: 'Policy', id: 'LIST' },
      ],
    },
  },
});
