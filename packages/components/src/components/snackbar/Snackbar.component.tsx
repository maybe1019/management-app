import React from 'react';
import { CheckBall, ErrorBall, TimesDark } from '@secberus/icons';
import {
  ActionButton,
  IconContainer,
  Message,
  Snack,
  IconButton,
} from './Snackbar.styled';
import { SnackbarMain } from './Snackbar.types';

export const Snackbar: React.FC<SnackbarMain> = ({
  children,
  remove,
  duration,
  opacity,
  type = 'default',
  dismiss,
  actionProps,
}) => {
  const removeRef = React.useRef<any>();
  removeRef.current = remove;
  const [progress, setProgress] = React.useState(0);
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (progress === 100) {
        removeRef.current();
        return clearTimeout(timeout);
      }
      if (dismiss) return setProgress(100);
      if (!focused) return setProgress(progress + 1);
    }, duration / 100);

    return () => clearTimeout(timeout);
  }, [progress, duration, focused, dismiss]);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const handleAction = () => removeRef.current();

  const onClose = () => setProgress(100);

  const Content = () => {
    switch (type) {
      case 'action': {
        return (
          <>
            <Message className="message" type="small-bold" color="white">
              {children}
            </Message>
            <ActionButton type="button" onClick={actionProps?.onClick}>
              {actionProps?.label}
            </ActionButton>
          </>
        );
      }
      case 'fail': {
        return (
          <>
            <IconContainer>
              <ErrorBall height={24} width={24} />
            </IconContainer>
            <Message className="message" type="small-bold" color="white">
              {children}
            </Message>
          </>
        );
      }
      case 'success': {
        return (
          <>
            <IconContainer>
              <CheckBall height={24} width={24} />
            </IconContainer>
            <Message className="message" type="small-bold" color="white">
              {children}
            </Message>
          </>
        );
      }
      default: {
        return (
          <Message className="message" type="small-bold" color="white">
            {children}
          </Message>
        );
      }
    }
  };

  return (
    <Snack
      id="snackBar"
      opacity={opacity}
      onKeyDown={handleAction}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      onFocus={handleFocus}
      onBlur={handleBlur}
      type={type}
    >
      <div className="content-container">
        <Content />
        <IconButton onClick={onClose}>
          <TimesDark height={24} width={24} />
        </IconButton>
      </div>
    </Snack>
  );
};
