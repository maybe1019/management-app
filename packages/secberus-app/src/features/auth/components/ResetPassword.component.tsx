import React from 'react';
import { Box, Grid, Flex, GridItem } from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Input, Link, Text, Wavyloader } from '@secberus/components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import qs from 'query-string';
import { forgotPasswordSubmit } from '@secberus/services';
import { LoadingFormComponent } from './Loading.component';

const schema = yup.object().shape({
  email: yup.string().trim().required('Email is a required field'),
  newPassword: yup
    .string()
    .required('New password is a required field')
    .min(8, 'Must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[!@#$%^&*?]/, 'Must contain at least one special character'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

interface ResetPasswordFormFields {
  email: string;
  newPassword: string;
  confirmPassword: string;
  recaptcha?: string;
}

export const ResetPasswordComponent: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const { code = '', username = '' } = qs.parse(search);
  const [hasReset, setHasReset] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, errors, setError } =
    useForm<ResetPasswordFormFields>({
      mode: 'onSubmit',
      resolver: yupResolver(schema),
      defaultValues: { email: username as string },
    });

  const onSubmit = async ({ email, newPassword }: ResetPasswordFormFields) => {
    if (!code) return;
    setIsLoading(true);
    const response = await forgotPasswordSubmit({
      username: email,
      code: code as string,
      newPassword,
    });
    setIsLoading(false);

    if (response && typeof response !== 'string') {
      const {
        err: { message },
      } = response;
      return setError('email', { message });
    }

    setHasReset(true);
    setTimeout(() => {
      history.push('/auth/entry');
    }, 2000);
  };

  if (isLoading) return <LoadingFormComponent />;

  if (hasReset) {
    return (
      <Flex direction="column" padding="16px" maxWidth="520px">
        <Box marginBottom="16px">
          <Text type="small">Password has been successfully reset!</Text>
        </Box>
        <Grid
          alignItems="center"
          justifyContent="center"
          gridTemplateRows="80px auto"
          gap="16px"
        >
          <GridItem margin="auto">
            <Wavyloader />
          </GridItem>
          <Text type="small-regular">Redirecting back to sign in...</Text>
        </Grid>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      padding="16px"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box marginBottom="32px">
        <Text type="small">Reset your password</Text>
      </Box>
      <Flex flexDirection="column" marginBottom="24px" sx={{ gap: 24 }}>
        <Input
          ref={register}
          placeholder="name@company.com"
          label="Email"
          type="email"
          name="email"
          autoFocus
          error={errors.email}
          noMargin
        />
        <Input
          ref={register}
          label="New password"
          type="password"
          name="newPassword"
          error={errors.newPassword}
          noMargin
        />
        <Input
          ref={register}
          label="Confirm new password"
          type="password"
          name="confirmPassword"
          error={errors.confirmPassword}
          noMargin
        />
      </Flex>
      <Flex sx={{ gap: '16px' }} align="center">
        <Button type="submit">Reset password</Button>
        <Link to="/auth/entry" color="gray">
          Back to sign in
        </Link>
      </Flex>
    </Flex>
  );
};
