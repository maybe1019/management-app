import React from 'react';
import { Button, Text } from '@secberus/components';
import { useLocation } from 'react-router-dom';
import { ErrorContainer } from './Styled';

export const ComponentFail = ({ message, supportButton, height }) => {
  const location = useLocation();
  const mailBody = `Something went wrong trying to load ${location.pathname} %0d%0a%0d%0a`;
  return (
    <ErrorContainer height={height}>
      <Text type="small">{message}</Text>
      {supportButton && (
        <>
          <Button
            onClick={e => {
              window.location = `mailto:support@secberus.com?subject=Error report&body=${mailBody}`;
              e.preventDefault();
            }}
            id="feedback"
            color="primary"
          >
            Contact support
          </Button>
        </>
      )}
    </ErrorContainer>
  );
};
