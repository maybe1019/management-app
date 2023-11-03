import React from 'react';
import { PageHeader } from '@secberus/components';
import { Box, Flex } from '@chakra-ui/react';
import { SSOForm } from './SSO.form';
import { SSOSummary } from './SSO.summary';

export const SSO: React.FC<any> = () => {
  return (
    <Box minW="650px">
      <Flex w="100%" padding="0px">
        <PageHeader title="Authentication options" />
      </Flex>
      <Flex w="100%" direction="column" padding="32px">
        <SSOSummary />
        <SSOForm />
      </Flex>
    </Box>
  );
};
