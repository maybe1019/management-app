import React from 'react';
import * as Sentry from '@sentry/react';
import { createEnvAwareLogger } from '@secberus/utils';
import { ComponentFail } from '../../components';

const FallbackError: React.FC<{ message: string; height?: string | number }> = (
  { message, height, children } = { message: 'Something went wrong' }
) => {
  if (children)
    return (
      <>
        {React.Children.map(children, child => {
          return React.isValidElement(child)
            ? React.cloneElement(child, { message })
            : children;
        })}
      </>
    );
  return (
    <>
      <ComponentFail height={height} message={message} supportButton />
    </>
  );
};

const logger = createEnvAwareLogger();

interface Props {
  children: React.ReactNode;
  height?: string | number;
  message?: string;
  fallbackElement?: React.ReactElement;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const {
      message = 'Sorry, something went wrong trying to load this page.',
      children,
      height = 'calc(100vh - 72px)',
      fallbackElement,
    } = this.props;

    const { hasError } = this.state;

    if (!hasError) return children;

    if (
      process.env.REACT_APP_DEPLOYED_ENV &&
      ['prod', 'stage'].includes(process.env.REACT_APP_DEPLOYED_ENV)
    ) {
      return (
        <Sentry.ErrorBoundary
          fallback={
            <FallbackError height={height} message={message}>
              {fallbackElement}
            </FallbackError>
          }
        >
          {children}
        </Sentry.ErrorBoundary>
      );
    }

    return (
      <FallbackError height={height} message={message}>
        {fallbackElement}
      </FallbackError>
    );
  }
}
