import { userApi, UserOrg } from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import React from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch, useTypedSelector } from '../../store/RootStateType';
import { ORG_PATH_REGEX } from './constants';
import { orgBroadcastChannel, ORG_EVENTS } from './orgListener';
import { orgContextActions, selectCurrentOrg } from './slice';
import { useOrgUrlPrefix } from './useOrgUrlPrefix';

const getOrgIdFromPathname = (pathname: string) => pathname.split('/')[2];

export const useDetectOrg = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentOrg = useTypedSelector(selectCurrentOrg);
  const { data: self, ...getSelf } = userApi.useGetSelfQuery(
    //@ts-expect-error purposely bunk / invalid arg for cache
    { break_cache: 'break_cache' }
  );

  const hasOrg = ORG_PATH_REGEX.test(location.pathname);

  const [org, setOrg] = React.useState<UserOrg>();
  const shouldReplaceCurrentOrg =
    !!hasOrg &&
    !!currentOrg &&
    !location.pathname.includes(`org/${currentOrg?.id}/`);
  const isLoading = useIsLoading([getSelf.isLoading, getSelf.isFetching]);

  React.useEffect(() => {
    if (isLoading || !self?.orgs?.[0]?.id) return;
    const orgId_ = shouldReplaceCurrentOrg
      ? getOrgIdFromPathname(location.pathname)
      : currentOrg
      ? currentOrg.id
      : self.orgs[0].id!;
    const org_ = self?.orgs?.find(({ id }) => id === orgId_) ?? self.orgs[0];
    setOrg(org_);
  }, [
    setOrg,
    org,
    hasOrg,
    self,
    isLoading,
    currentOrg,
    shouldReplaceCurrentOrg,
    location.pathname,
  ]);

  React.useEffect(() => {
    if (!org) return;
    dispatch(orgContextActions.organizationSelected(org));
  }, [dispatch, org]);

  React.useEffect(() => {
    const bc = orgBroadcastChannel();

    let message;
    if (shouldReplaceCurrentOrg) {
      message = 'Current Organization has been replaced from URL state';
    } else if (!hasOrg && !currentOrg) {
      message = 'Default organization has been set';
    } else {
      message = 'Current organization used';
    }

    bc.postMessage({
      event: ORG_EVENTS.orgInit,
      message,
    });
    // Only want this to run once on init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOrgUrlPrefix(org, self?.orgs);
  return {
    isLoading: getSelf.isLoading || !getSelf.isSuccess,
    isError: getSelf.isError,
    orgId: org?.id,
  };
};
