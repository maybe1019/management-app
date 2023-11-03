import React from 'react';
import { LoadingOverlay } from '@secberus/components';
import {
  secberusApiGW,
  forceRefreshToken,
  authSlice,
} from '@secberus/services';
import { useAppDispatch } from '../../../store/RootStateType';

const useForgeToken = (id?: string) => {
  const dispatch = useAppDispatch();
  const [forgeToken, request] = secberusApiGW.useSwitchOrgMutation();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      dispatch(authSlice.actions.setOrgIsNotInjected());
      if (id) {
        await forgeToken({ orgid: id });
        await forceRefreshToken();
      }
      dispatch(authSlice.actions.setOrgIsInjected());
      setIsLoading(false);
    })();
  }, [dispatch, forgeToken, id]);

  return {
    isLoading: isLoading || request.isLoading,
    isUninitialized: request.isUninitialized,
  };
};

export const WithOrgInjectedToken: React.FC<{ id?: string }> = ({
  id,
  children,
}) => {
  const { isLoading } = useForgeToken(id);

  if (isLoading) return <LoadingOverlay />;
  return <>{children}</>;
};
