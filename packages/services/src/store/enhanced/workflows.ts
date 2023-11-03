import { secberusApiGW } from '../injections';

// Enhanced endpoints for workflows
export const workflowsApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    listWorkflows: {
      providesTags: (result) => {
        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({
                type: 'Workflow' as const,
                id,
              })),
              { type: 'Workflow', id: 'LIST' },
            ]
          : ['Workflow', { type: 'Workflow', id: 'LIST' }];
      },
    },
    getWorkflow: {
      providesTags: ['Workflow'],
    },
    updateWorkflow: {
      invalidatesTags: ['Workflow'],
    },
    createWorkflow: {
      invalidatesTags: [{ type: 'Workflow', id: 'LIST' }],
    },
    deleteWorkflow: {
      invalidatesTags: [{ type: 'Workflow', id: 'LIST' }],
    },
    enableWorkflow: {
      invalidatesTags: ['Workflow'],
      async onQueryStarted({ workflowId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          workflowsApi.util.updateQueryData('listWorkflows', {}, (draft) => {
            const idx = draft.results.findIndex(({ id }) => id === workflowId);
            draft.results[idx].enabled = true;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    },
    disableWorkflow: {
      invalidatesTags: ['Workflow'],
      async onQueryStarted({ workflowId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          workflowsApi.util.updateQueryData('listWorkflows', {}, (draft) => {
            const idx = draft.results.findIndex(({ id }) => id === workflowId);
            draft.results[idx].enabled = false;
          })
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
