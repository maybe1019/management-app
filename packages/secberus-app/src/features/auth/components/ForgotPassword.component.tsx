import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { Button, Input, Link, Text } from '@secberus/components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { LoadingFormComponent } from './Loading.component';

const schema = yup.object().shape({
  email: yup.string().trim().required('Email is a required field'),
});

export const ForgotPasswordComponent: React.FC = () => {
  const logger = createEnvAwareLogger();
  const history = useHistory();
  const [hasForgot, setHasForgot] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, errors, setError } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  if (isLoading) return <LoadingFormComponent />;

  if (hasForgot) {
    return (
      <Flex direction="column" padding="16px" maxWidth="520px">
        <Box marginBottom="32px">
          <Text type="small">We sent you an email!</Text>
        </Box>
        <Box marginBottom="32px">
          <Text type="regular">
            Please check your inbox and click the received link to reset your
            password.
          </Text>
        </Box>
        <Button onClick={() => history.push('/auth/entry')}>Sign in</Button>
      </Flex>
    );
  }

  const onSubmit = async ({ email }: any) => {
    try {
      setIsLoading(true);
      const response = await forgotPassword({ username: email });
      setIsLoading(false);
      if ('err' in response) {
        setIsLoading(false);
        return setError('email', { message: response.err.message });
      }
      setHasForgot(true);
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Flex
      id="forgot-password"
      flexDirection="column"
      padding="16px"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box marginBottom="32px">
        <Text type="small">Forgot your password?</Text>
      </Box>
      <Input
        ref={register}
        placeholder="name@company.com"
        label="Email"
        type="email"
        name="email"
        autoFocus
        error={errors.email}
      />
      <Flex sx={{ gap: '16px' }} align="center">
        <Button form="forgot-password" type="submit">
          Continue
        </Button>
        <Link to="/auth/entry" color="gray">
          Back to sign in
        </Link>
      </Flex>
    </Flex>
  );
};
