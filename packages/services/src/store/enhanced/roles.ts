import { secberusApiGW } from '../injections';

export const rolesApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    listRoles: {
      providesTags: ['Role', { type: 'Role', id: 'LIST' }],
    },
    getRole: {
      providesTags: ['Role'],
    },
    createRole: {
      invalidatesTags: [{ type: 'Role', id: 'LIST' }],
    },
    updateRole: {
      invalidatesTags: ['Role'],
    },
    deleteRole: {
      invalidatesTags: [{ type: 'Role', id: 'LIST' }],
    },
  },
});
