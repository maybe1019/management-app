import { secberusApiGW } from '../injections';

export const complianceFrameworksApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    getComplianceFrameworksSummary: {
      providesTags: (result) => {
        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({
                type: 'ComplianceFramework' as const,
                id,
              })),
              { type: 'ComplianceFramework', id: 'LIST' },
            ]
          : [{ type: 'ComplianceFramework', id: 'LIST' }];
      },
    },
    getComplianceFrameworks: {
      providesTags: (result) => {
        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({
                type: 'ComplianceFramework' as const,
                id,
              })),
              { type: 'ComplianceFramework', id: 'LIST' },
            ]
          : [{ type: 'ComplianceFramework', id: 'LIST' }];
      },
    },
    toggleFramework: {
      invalidatesTags: ['ComplianceFramework'],
      async onQueryStarted(
        { frameworkId, complianceFrameworkPatch },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          complianceFrameworksApi.util.updateQueryData(
            'getComplianceFrameworks',
            {},
            (draft) => {
              const idx = draft.findIndex(({ id }) => id === frameworkId);
              draft[idx] = { ...draft[idx], ...complianceFrameworkPatch };
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    },
  },
});
