import React from 'react';
import { Button, Text } from '@secberus/components';
import { ErrorPage } from './Styled';

export const NotFoundScreen = () => (
  <ErrorPage>
    <Text type="xlarge">404</Text>
    <Text type="small">Sorry, we could not find this page.</Text>
    <Button to="/" variant="primary">
      Return home
    </Button>
  </ErrorPage>
);
