import React from 'react';
import { Self, userApi } from '@secberus/services';
import { LoadingOverlay } from '@secberus/components';
import { useDeepEffect } from '@secberus/utils';
import { WithAuthGate } from '../../services/auth/WithAuthGate';

// @ts-expect-error forcing some type narrowing here... by the time user is being used ANYWHERE it will definitely be defined..
export const SelfContext = React.createContext<Self>();

const WithFindSelf: React.FC = ({ children }) => {
  const { data: self, refetch, ...query } = userApi.useGetSelfQuery();

  useDeepEffect(() => {
    if (
      !query.isUninitialized &&
      !query.isLoading &&
      !query.isFetching &&
      query.isSuccess &&
      query.status === 'fulfilled' &&
      self &&
      self?.orgs.length > 0 &&
      self?.permissions.length === 0
    ) {
      /**
       * Assume this is the user's initial login. `custom:orgId` in cognito
       * is yet set, which will result in an empty permissions array for initial
       * call to `getSelf` before `switchOrg` is called.
       * @drew
       * @see https://secberus.atlassian.net/browse/WEB-618?focusedCommentId=13746
       */
      refetch();
    }
  }, [query, refetch, self]);

  if (query.isLoading) return <LoadingOverlay />;
  if (!self) throw new Error('Missing self');

  return <SelfContext.Provider value={self}>{children}</SelfContext.Provider>;
};

const WithFindSelfGate: React.FC = ({ children }) => (
  <WithAuthGate component={WithFindSelf}>{children}</WithAuthGate>
);

export { WithFindSelfGate as WithFindSelf };

export const useSelf = () => React.useContext<Self>(SelfContext);
