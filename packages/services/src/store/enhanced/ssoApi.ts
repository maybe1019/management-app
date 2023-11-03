import { secberusApiGW, secberusApi } from '../injections';

// Enhanced endpoints for singleSignOn
export const ssoApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    listSsoProviders: {
      providesTags: ['SSO', { type: 'SSO', id: 'LIST' }],
    },
    getSsoDetails: {
      providesTags: ['SSO'],
    },
    createSsoProvider: {
      invalidatesTags: [{ type: 'SSO', id: 'LIST' }],
    },
    deleteSsoProvider: {
      invalidatesTags: [{ type: 'SSO', id: 'LIST' }],
    },
  },
});

/**
 * Rather than creating separate file, we can just export api2 enhanced endpoint here
 * as we continue to migrate all endpoints over to it.
 */
export const ssoApi2 = secberusApi.secberusApi.enhanceEndpoints({
  endpoints: {
    getSsoConfig: {
      providesTags: ['SSO'],
    },
    loginCallback: {
      extraOptions: {
        maxRetries: 0,
      },
    },
  },
});
