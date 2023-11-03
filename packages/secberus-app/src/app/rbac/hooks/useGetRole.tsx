import React from 'react';
import { Org } from '@secberus/services';
import { useTypedSelector } from '../../../store/RootStateType';
import { selectCurrentOrg } from '../../../features/organization/slice';
import { useSelf } from '../../core/wrappers/WithFindSelf';
import type { Permission } from '../definitions';

/**
 * @param id Allows us to check for users roles outside of current org context
 */
export const useGetRole = (id?: Partial<Pick<Org, 'id'>>) => {
  const selectedCurrentOrg = useTypedSelector(selectCurrentOrg);
  const currentOrgId = id || selectedCurrentOrg?.id;
  const { orgs } = useSelf();

  const role = React.useMemo(() => {
    const foundOrg =
      orgs?.find(
        ({ id: orgId }: Record<'id', string>) => orgId === currentOrgId
      ) || orgs?.[0];

    return foundOrg?.roles as unknown as Permission[];
  }, [currentOrgId, orgs]);

  return {
    role,
  };
};
