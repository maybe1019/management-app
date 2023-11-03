import React from 'react';
import { selectIsAuthenticated } from '@secberus/services';
import { useTypedSelector } from '../../../store/RootStateType';

export const WithAuthGate: React.FC<{ component: React.ComponentType }> = ({
  children,
  component: Component,
}) => {
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  if (isAuthenticated) return <Component>{children}</Component>;
  return <>{children}</>;
};
