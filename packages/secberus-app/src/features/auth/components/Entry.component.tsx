import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Input, Text, Link } from '@secberus/components';
import { Box, Grid, Flex } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { LoginRequest } from './definitions';

const schema = yup.object().shape({
  username: yup.string().trim().required('Email is a required field'),
});

export const EntryFormComponent: React.FC = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ username }: Pick<LoginRequest, 'username'>) => {
    const to = { pathname: '/auth/confirm', state: { username } };
    history.push(to);
  };

  return (
    <Flex
      direction="column"
      padding="16px"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box marginBottom="32px">
        <Text type="small">Sign In</Text>
      </Box>
      <Grid marginBottom="16px">
        <Input
          ref={register}
          placeholder="name@company.com"
          label="Email"
          type="email"
          name="username"
          autoFocus
          error={errors.username}
        />
      </Grid>
      <Flex sx={{ gap: '16px' }} align="center">
        <Button type="submit">Next</Button>
        <Link to="/auth/forgot" color="gray">
          Forgot password?
        </Link>
      </Flex>
    </Flex>
  );
};
