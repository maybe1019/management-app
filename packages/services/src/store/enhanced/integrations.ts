import { secberusApiGW } from '../injections';

// Enhanced endpoints for integrations
export const integrationsApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    getIntegration: {
      providesTags: ['Integration'],
    },
    listIntegrations: {
      providesTags: ['Integration', { type: 'Integration', id: 'LIST' }],
    },
    createIntegration: {
      invalidatesTags: [{ type: 'Integration', id: 'LIST' }],
      extraOptions: { muteError: 400 },
    },
    updateIntegration: {
      invalidatesTags: ['Integration'],
    },
    deleteIntegration: {
      invalidatesTags: [{ type: 'Integration', id: 'LIST' }],
    },
    verifyIntegration: {
      invalidatesTags: ['Integration'],
    },
    authorizeIntegration: {
      invalidatesTags: ['Integration'],
    },
    createSplunk: {
      invalidatesTags: ['Integration'],
    },
    deleteSplunk: {
      invalidatesTags: [{ type: 'Integration', id: 'LIST' }],
    },
    getSplunk: {
      providesTags: ['Integration'],
      extraOptions: { muteError: [400, 404], maxRetries: 0 },
    },
    createSumoLogic: {
      invalidatesTags: ['Integration'],
      extraOptions: {
        muteError: [400],
        maxRetries: 1,
      },
    },
    deleteSumoLogic: {
      invalidatesTags: [{ type: 'Integration', id: 'LIST' }],
      extraOptions: {
        muteError: [404],
        maxRetries: 1,
      },
    },
    getSumoLogic: {
      providesTags: ['Integration'],
      extraOptions: { muteError: [400, 404], maxRetries: 0 },
    },
  },
});
