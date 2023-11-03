import { secberusApiGW } from '../injections';

// Enhanced endpoints for policies
export const policiesApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    listPolicies: {
      providesTags: (result) => {
        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({
                type: 'Policy' as const,
                id,
              })),
              { type: 'Policy', id: 'LIST' },
            ]
          : [{ type: 'Policy', id: 'LIST' }];
      },
    },
    getPolicy: {
      providesTags: (_result, _error, { policyId }) => [
        { type: 'Policy', id: policyId },
      ],
    },
    updatePolicy: {
      invalidatesTags: ['Policy'],
    },
    deletePolicy: {
      invalidatesTags: [{ type: 'Policy', id: 'LIST' }],
    },
    createPolicy: {
      invalidatesTags: [{ type: 'Policy', id: 'LIST' }],
    },
    listPolicyExceptions: {
      providesTags: [
        'Exception',
        'Policy',
        { type: 'Policy', id: 'LIST' },
        { type: 'Exception', id: 'LIST' },
      ],
    },
    summarizePolicies: {
      providesTags: ['Policy', { type: 'Policy', id: 'LIST' }],
    },
    unsubscribePolicy: {
      invalidatesTags: ['Policy'],
      // Leaving for future ref:
      // async onQueryStarted({ policyId }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     policiesApi.util.updateQueryData(
      //       'getPolicy',
      //       { policyId },
      //       (draft) => {
      //         console.log(draft, 'draft');
      //         Object.assign(draft, { subscribed: false });
      //       }
      //     )
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    },
    subscribePolicy: {
      invalidatesTags: ['Policy'],
    },
    subscribePoliciesBulk: {
      invalidatesTags: ['Policy', { type: 'Policy', id: 'LIST' }],
    },
    unsubscribePoliciesBulk: {
      invalidatesTags: ['Policy', { type: 'Policy', id: 'LIST' }],
    },
    listPolicyDatasources: {
      providesTags: [
        'DataSource',
        'Policy',
        { type: 'DataSource', id: 'LIST' },
        { type: 'Policy', id: 'LIST' },
      ],
      extraOptions: {
        maxRetries: 1,
      },
    },
    updatePolicyDatasources: {
      invalidatesTags: [
        'Policy',
        'DataSource',
        { type: 'DataSource', id: 'LIST' },
      ],
    },
  },
});
