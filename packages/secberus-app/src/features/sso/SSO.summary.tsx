import React from 'react';
import { Input } from '@secberus/components';
import { selectEmail } from '@secberus/services';

import { Box } from '@chakra-ui/react';
import { useTypedSelector } from '../../store/RootStateType';

export const SSOSummary: React.FC<any> = () => {
  const email = useTypedSelector(selectEmail);

  return (
    <Box maxW="650px">
      <Input
        name="email"
        label="Account Email"
        placeholder="-"
        value={email || ''}
        disabled
      />
    </Box>
  );
};
