import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Button, Text } from '@secberus/components';

export const NotAuthenticated = () => {
  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      minW="100vw"
      sx={{ gap: '24px' }}
      direction="column"
    >
      <Text type="xlarge">401</Text>
      <Text type="small">
        Sorry, you don't have the correct permissions to access this resource.
      </Text>
      <Button to="/" variant="primary">
        Return home
      </Button>
    </Flex>
  );
};
