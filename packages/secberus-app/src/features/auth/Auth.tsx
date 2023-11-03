import React from 'react';
import { Redirect, RouteProps, Switch, useLocation } from 'react-router-dom';
import { SecberusLogoLight } from '@secberus/icons';
import { lazily } from 'react-lazily';
import { ErrorBoundary } from '../../utils/wrappers/ErrorBoundaries';
import { RouteGate } from '../../app/routing/RouteGate.component';
import { RouteGateProps } from '../../app/routing/definitions';
import { LogoContainer, Background, StyledModal } from './Auth.styled';
import { authPaths } from './paths';
import { AuthProvider } from './context';
import { Footer } from './components';
import { SSOHandler } from './components/Redirects.component';

const {
  EntryFormComponent,
  PasswordFormComponent,
  SSOCallbackComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  NewUserPasswordComponent,
} = lazily(() => import('./components'));

const defaultRoute: RouteGateProps[] = [
  {
    path: '/auth',
    render: () => <Redirect to={authPaths.entry} />,
  },
];

const routes: RouteGateProps[] = [
  {
    path: authPaths.entry,
    component: EntryFormComponent,
  },
  {
    path: authPaths.confirm,
    component: SSOHandler,
  },
  {
    path: authPaths.login,
    component: PasswordFormComponent,
  },
  {
    path: authPaths.forgot,
    component: ForgotPasswordComponent,
  },
  {
    path: authPaths.reset,
    component: ResetPasswordComponent,
  },
  {
    path: authPaths.newPassword,
    component: NewUserPasswordComponent,
  },
  {
    path: authPaths.callback,
    component: SSOCallbackComponent,
  },
  ...defaultRoute,
];

const AuthComponent = () => {
  const location = useLocation();

  return (
    <Background>
      <LogoContainer>
        <SecberusLogoLight />
      </LogoContainer>
      <StyledModal
        options={{
          closeIcon: false,
          fixedOverScreen: true,
          useBackground: false,
          useAnimation: true,
        }}
        variant="light"
      >
        <AuthProvider>
          <Switch>
            {routes.map(route => (
              <RouteGate {...route} key={`${route.path}`} />
            ))}
          </Switch>
        </AuthProvider>
      </StyledModal>
      {location?.pathname?.includes('auth/entry') && <Footer />}
    </Background>
  );
};

const WithBoundary: React.FC = () => (
  <ErrorBoundary>
    <AuthComponent />
  </ErrorBoundary>
);

export { WithBoundary as AuthFormComponent };
