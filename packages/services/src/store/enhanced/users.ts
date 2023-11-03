import { secberusApiGW } from '../injections';

// Enhanced endpoints for orgs
export const userApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    createUser: {
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    },
    updateUser: {
      invalidatesTags: ['User'],
    },
    listUsers: {
      providesTags: ['User', { type: 'User', id: 'LIST' }],
    },
    getUser: {
      providesTags: ['User'],
    },
    deleteUser: {
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    },
    getUserOrgs: {
      providesTags: ['Organization'],
    },
    getSelf: {
      providesTags: ['Organization', 'User'],
    },
    updateSelf: {
      invalidatesTags: ['User'],
    },
    setUserRoles: {
      invalidatesTags: ['Organization', 'User'],
    },
    addUserRoles: {
      invalidatesTags: ['Organization', 'User'],
    },
    removeUserRoles: {
      invalidatesTags: ['Organization', 'User'],
    },
  },
});
