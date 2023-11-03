import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import {
  federatedSignIn,
  selectIDPName,
  ssoApi2,
  collectSSODetails,
} from '@secberus/services';
import { useAppDispatch, useTypedSelector } from '../../../store/RootStateType';
import { LoadingFormComponent } from './Loading.component';

export const SSOHandler: React.FC = () => {
  const { state } = useLocation<{ username?: string }>();
  const dispatch = useAppDispatch();

  const idpName = useTypedSelector(selectIDPName) as string;

  const { isLoading, isError, isSuccess, data } = ssoApi2.useGetSsoConfigQuery(
    {
      // @ts-expect-error will be defined when needed. see `skip`.
      email: state?.username,
    },
    { skip: !state?.username }
  );

  React.useEffect(() => {
    if (data && !isError) dispatch(collectSSODetails(data));
  }, [data, isError, dispatch]);

  const isSSO = data?.sso;

  const localAuthRedirect = {
    pathname: '/auth/login',
    state: { username: state?.username },
  };

  React.useEffect(() => {
    if (isSSO && !isLoading && idpName) {
      federatedSignIn(idpName!);
    }
  }, [dispatch, isSSO, idpName, isLoading]);

  if (isError || !state?.username) return <Redirect to="/auth/entry" />;
  if (isLoading || !isSuccess) return <LoadingFormComponent />;
  if (isSSO) return <LoadingFormComponent message="Redirecting..." />;
  if (isSuccess && !isSSO) return <Redirect to={localAuthRedirect} />;
  return <LoadingFormComponent />;
};
