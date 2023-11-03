import { secberusApiGW } from '../injections';

export const organizationApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    listOrgs: {
      providesTags: ['Organization', { type: 'Organization', id: 'LIST' }],
    },
    getOrg: {
      providesTags: ['Organization'],
    },
    createOrg: {
      invalidatesTags: [{ type: 'Organization', id: 'LIST' }],
    },
    updateOrg: {
      invalidatesTags: ['Organization'],
    },
    deleteOrg: {
      invalidatesTags: [{ type: 'Organization', id: 'LIST' }],
    },
    getOrgUsers: {
      providesTags: ['Organization', 'User', { type: 'User', id: 'LIST' }],
    },
    switchOrg: {
      invalidatesTags: ['Organization', 'User'],
    },
  },
});
