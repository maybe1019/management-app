import React from 'react';
import { Box, Grid, Flex, GridItem } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Text, Wavyloader } from '@secberus/components';
import { completeNewPassword } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { AuthContext } from '../context';
import { NotificationBox } from './Auth.styled';

const info =
  'You logged in with a temporary password. To finish logging in, you must create a new password.';

const schema = yup.object().shape({
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

interface NewUserPasswordFormFields {
  newPassword: string;
  confirmPassword: string;
  recaptcha?: string;
}

export const NewUserPasswordComponent: React.FC = () => {
  const logger = createEnvAwareLogger();
  const [hasReset, setHasReset] = React.useState(false);

  const { user } = React.useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm<NewUserPasswordFormFields>(
    {
      mode: 'onSubmit',
      resolver: yupResolver(schema),
    }
  );

  const onSubmit = async ({ newPassword }: NewUserPasswordFormFields) => {
    try {
      if (!user) throw new Error('Something went wrong signing in');

      const response = await completeNewPassword({ user, newPassword });
      if (response) return setHasReset(true);
    } catch (e) {
      logger.error(e);
    }
  };

  if (hasReset) {
    return (
      <Flex direction="column" padding="16px" maxWidth="520px">
        <Box marginBottom="16px">
          <Text type="small">Password has been successfully created!</Text>
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
          <Text type="small-regular">Logging in...</Text>
        </Grid>
      </Flex>
    );
  }

  return (
    <Flex
      id="new-password"
      direction="column"
      padding="16px"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box marginBottom="16px">
        <Text type="small">Create new password</Text>
      </Box>
      <Box marginBottom="32px">
        <NotificationBox>
          <Text type="small-regular">{info}</Text>
        </NotificationBox>
      </Box>
      <Flex flexDirection="column" marginBottom="24px" sx={{ gap: 24 }}>
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
        <Button form="new-password" type="submit">
          Login
        </Button>
      </Flex>
    </Flex>
  );
};
