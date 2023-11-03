import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Input, Link, Text } from '@secberus/components';
import { Box, Grid, Flex } from '@chakra-ui/react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { secberusApiGW, signIn } from '@secberus/services';
import { AuthContext } from '../context';
import { useBullUnicodeChars } from '../hooks/useBullUnicodeChars';
import { useQuery } from '../../../hooks/useQuery';
import { LoginRequest } from './definitions';
import { LoadingFormComponent } from './Loading.component';

const schema = yup.object().shape({
  password: yup.string().trim().required('Password is a required field'),
});

export const PasswordFormComponent: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [newUserRedirect, setNewUserRedirect] = React.useState<boolean>(false);
  const [reinvited, setReinvited] = React.useState<boolean>(false);
  const history = useHistory();
  const location = useLocation<{ username: string }>();
  const { username: qryUsername, password } = useQuery<
    'username' | 'password'
  >();
  // XXX we can't percent-encode query params in Cognito static templates
  // so `+` is passed as-is; URLSearchParams however decodes them into
  // literal spaces (` `)
  // see: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#preserving_plus_signs
  const username = qryUsername
    ? qryUsername.replace(' ', '+')
    : location.state?.username;
  const placeholder = useBullUnicodeChars();

  const { setUser } = React.useContext(AuthContext);
  const [reinviteUser] = secberusApiGW.useReinviteUserMutation();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit = React.useCallback(
    async ({ password }: Pick<LoginRequest, 'password'>) => {
      setIsLoading(true);
      if (!username) return;
      const res = await signIn({ username, password });

      if ('challengeName' in res) {
        setUser(res);
        return setNewUserRedirect(true);
      } else if ('message' in res) {
        if (res.message.includes('Temporary password has expired')) {
          await reinviteUser({ reinviteUser: { email: username } });
          setReinvited(true);
        } else {
          setIsLoading(false);
        }
      }
    },
    [reinviteUser, setUser, username]
  );

  React.useEffect(() => {
    if (username && password) onSubmit({ password });
  }, [username, password, onSubmit]);

  if (newUserRedirect)
    return <Redirect to={{ pathname: '/auth/newPassword' }} />;

  if (reinvited)
    return (
      <Flex direction="column" padding="16px" maxWidth="520px">
        <Box marginBottom="32px">
          <Text type="small">Your temporary password has expired!</Text>
        </Box>
        <Box marginBottom="32px">
          <Text type="regular">
            Don't worry&mdash;we've sent you another invite.
            <br />
            Please check your inbox and click the received link to complete your
            account setup.
          </Text>
        </Box>
        <Button onClick={() => history.push('/auth/entry')}>Sign in</Button>
      </Flex>
    );

  if (!username) return <Redirect to="/auth/entry" />;
  if (isLoading) return <LoadingFormComponent />;

  return (
    <Box padding="16px" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom="32px">
        <Text type="small">Sign In</Text>
      </Box>
      <Grid>
        <Input
          ref={register}
          placeholder={placeholder}
          label="Password"
          type="password"
          name="password"
          defaultValue={password}
          autoFocus
          error={errors.username}
        />
      </Grid>
      <Flex sx={{ gap: '16px' }} align="center" justify="space-between">
        <Button type="submit">Login</Button>
        <Link to="/auth/forgot" color="gray">
          Forgot password?
        </Link>
      </Flex>
    </Box>
  );
};
