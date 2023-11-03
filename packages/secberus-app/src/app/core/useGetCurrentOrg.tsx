import { useParams } from 'react-router-dom';
import { organizationApi } from '@secberus/services';

export const useGetCurrentOrgId = () => {
  const { orgId } = useParams<{ orgId: string }>();
  return orgId;
};

export const useGetCurrentOrg = () => {
  const orgId = useGetCurrentOrgId();
  const { data: organization, ...getOrgQuery } = organizationApi.useGetOrgQuery(
    { orgid: orgId },
    { skip: !orgId }
  );

  if (getOrgQuery.isLoading)
    return { organization: null, id: orgId, isLoading: true };
  if (getOrgQuery.isError)
    return { organization: null, id: orgId, isLoading: false };

  return { organization, id: orgId, isLoading: false };
};
