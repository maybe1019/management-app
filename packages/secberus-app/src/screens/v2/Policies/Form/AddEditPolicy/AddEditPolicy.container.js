import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { LoadingOverlay } from '@secberus/components';
import { ErrorBoundary } from '../../../../../utils/wrappers/ErrorBoundaries';
import { policiesApi2 } from '@secberus/services';
import {
  useUpdatePolicy,
  useCreatePolicy,
  useDeletePolicy,
} from '../../hooks/usePolicyRequests';
import { useIsLoading } from '@secberus/utils';
import { useQueryV2 } from '../../../../../hooks/useQuery';
import { PolicyEditor } from '../../../../../features/policy-editor/PolicyEditor.component';

const AddEditPolicyContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [prevPath, setPrevPath] = React.useState('/policies');

  const { getQuery } = useQueryV2('clone');
  const clone = getQuery();
  const params = useParams();
  const policyId = params?.policyId || params?.id;

  const {
    data: policy,
    isLoading: policyIsLoading,
    isFetching: policyIsFetching,
    isUninitialized: policyIsUninitialized,
  } = policiesApi2.useGetPolicyQuery(
    {
      //@ts-expect-error will skip if policyId is falsy
      id: policyId,
    },
    {
      skip: !policyId,
    }
  );

  const { handleUpdate: updatePolicy, isLoading: isUpdatePolicyLoading } =
    useUpdatePolicy();
  const { handleCreate: createPolicy, isLoading: isCreatePolicyLoading } =
    useCreatePolicy();
  const { handleDelete: deletePolicy, isLoading: isDeletePolicyLoading } =
    useDeletePolicy(policy?.name);

  const isLoading = useIsLoading([
    policyIsLoading,
    policyIsFetching,
    policyIsUninitialized && !!policyId && !clone,
  ]);

  React.useEffect(() => {
    if (location.state?.prevRoute) {
      setPrevPath(location.state.prevRoute);
    }
  }, [dispatch, location]);

  const onSubmit = async ({ resources: selectedResources, ...formData }) => {
    const { id, ...restFormData } = formData;

    const data = {
      ...restFormData,
      query: restFormData?.query,
      label: restFormData?.label || '',
      violation_summary_tmpl: '', // unused field
      secberus_managed: false, // customer policy is not secberus_managed
    };

    const policy =
      policyId && !clone
        ? await updatePolicy({ createPolicy: { ...data, id }, id })
        : await createPolicy({ createPolicy: data });

    if (policy?.data) {
      history.push(`/policies/${policy.data.id}/form/details`);
    }
  };

  const handleDelete = async () => {
    await deletePolicy(policy.id);
    history.push('/policies');
  };

  /**
   * @todo Prevent need for a loadingoverlay by fixing defaultvalue
   * implementation on the actual policyEditor
   */
  if (isLoading) return <LoadingOverlay />;

  return (
    <PolicyEditor
      isLoading={isLoading}
      isFormSubmitting={
        isUpdatePolicyLoading || isCreatePolicyLoading || isDeletePolicyLoading
      }
      policy={policy}
      clone={clone}
      prevPath={prevPath}
      onSubmit={onSubmit}
      onDelete={handleDelete}
    />
  );
};
const WithBoundary = () => (
  <ErrorBoundary>
    <AddEditPolicyContainer />
  </ErrorBoundary>
);

export { WithBoundary as PolicyFormScreen };
