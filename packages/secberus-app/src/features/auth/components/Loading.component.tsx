import React from 'react';
import { Text, Wavyloader } from '@secberus/components';
import { Flex } from '@chakra-ui/react';

export const LoadingFormComponent: React.FC<{ message?: string }> = ({
  message = 'Loading...',
}) => {
  return (
    <Flex
      align="center"
      justify="space-around"
      direction="column"
      padding="45px"
      height="200px"
    >
      <Text type="bold">{message}</Text>
      <Wavyloader size="large" />
    </Flex>
  );
};
