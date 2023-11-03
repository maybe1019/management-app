import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIsLoading } from '@secberus/utils';
import {
  Button,
  Input,
  Text,
  LoadingOverlay,
  PrefixedInput,
  Checkbox,
} from '@secberus/components';
import { CreateSsoProviderApiArg, ssoApi } from '@secberus/services';
import { Flex } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCallbackModal } from '../callback-modal/useCallbackModal';
import { schema } from './SSO.form.schema';
import { SSOInfo } from './SSO.info';
import { SSOInfoContainer } from './SSO.styled';
import { SSODetails } from './SSO.details';

type SSOKeys = keyof CreateSsoProviderApiArg['addSsoProvider'];
type SSOFieldProps = {
  name: SSOKeys;
  label: string;
  placeholder: string;
  password?: boolean;
  prefix?: string;
  skipIfExists?: boolean;
};
const formFields: SSOFieldProps[] = [
  {
    name: 'name',
    label: 'Provider name',
    placeholder: '<Provider name>',
    skipIfExists: false,
  },
  {
    name: 'client_id',
    label: 'Client ID',
    placeholder: '<Client ID>',
    skipIfExists: true,
  },
  {
    name: 'client_secret',
    label: 'Client secret',
    placeholder: '<Client Secret>',
    password: true,
    skipIfExists: true,
  },
  {
    name: 'issuer_url',
    label: 'Issuer URL',
    prefix: 'https://',
    placeholder: 'your-url.okta.com/',
    skipIfExists: true,
  },
  {
    name: 'email_domains',
    label: 'SSO Email Domain',
    placeholder: 'secberus.com',
    skipIfExists: false,
  },
];

export const SSOForm: React.FC<any> = () => {
  const [showForm, setShowForm] = React.useState<boolean>();

  const { data: ssoDetails, isLoading: ssoDetailsLoading } =
    ssoApi.useGetSsoDetailsQuery();
  const { data: isSSOResult, isFetching } =
    ssoApi.useListSsoProvidersQuery() as {
      data: Record<string, any>;
      isSuccess: boolean;
      isFetching: boolean;
    };
  const [createSSO, { isLoading: isSSOCreating }] =
    ssoApi.useCreateSsoProviderMutation();
  const [deleteSSO, { isLoading: isSSODeleting }] =
    ssoApi.useDeleteSsoProviderMutation();

  const isLoading = useIsLoading([
    ssoDetailsLoading,
    isFetching,
    isSSODeleting,
    isSSOCreating,
  ]);

  const isConfigured = React.useMemo(
    () => (isSSOResult ? Object.keys(isSSOResult).length > 0 : false),
    [isSSOResult]
  );

  const { errors, register, handleSubmit, setValue, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      sso_enabled: isConfigured,
      email_domains: '',
      name: '',
    },
  });

  // Get email and names from the key:value array sent from backend
  const { email_domains, name } = React.useMemo(() => {
    if (isConfigured) {
      return {
        email_domains: Object.values(isSSOResult)[0][0],
        name: Object.keys(isSSOResult)[0],
      };
    } else {
      return {
        email_domains: null,
        name: null,
      };
    }
  }, [isSSOResult, isConfigured]);

  React.useEffect(() => {
    if (email_domains && typeof email_domains === 'string') {
      setValue('email_domains', email_domains);
    }
    if (name && typeof name === 'string') {
      setValue('name', name);
    }
  }, [name, email_domains, setValue]);

  const { RenderCallbackModal, showCallbackModal } = useCallbackModal({
    onClose: async (confirm: boolean) => {
      if (!confirm || !name) return;
      await deleteSSO({
        providerName: name,
      });
    },
  });

  const onSaveChange = async (
    data: CreateSsoProviderApiArg['addSsoProvider']
  ) => {
    await createSSO({
      addSsoProvider: {
        ...data,
        email_domains: [data.email_domains] as unknown as string[],
      },
    });
  };

  const disabledField = isConfigured;

  React.useEffect(() => {
    setShowForm(isConfigured);
  }, [isConfigured, setValue]);

  if (isLoading) return <LoadingOverlay />;
  return (
    <>
      <Flex sx={{ gap: '24px' }} direction="column">
        <Flex paddingLeft="24px" width="fit-content" sx={{ gap: '48px' }}>
          <label htmlFor="sso_enabled">
            <Flex alignItems="center">
              <Checkbox
                id="sso_enabled"
                name="sso_enabled"
                checked={showForm}
                onChange={() => setShowForm(!showForm)}
                disabled={disabledField}
                gutterBottom={false}
              />
              <Text type="bold">
                {isConfigured
                  ? 'Single sign-on enabled'
                  : 'Enable single sign-on'}
              </Text>
            </Flex>
            <Text type="small-bold" color="gray">
              Allow users to log in with their organization's credentials.
            </Text>
          </label>
        </Flex>
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ x: -150 }}
              exit={{ x: 0 }}
              animate={{ x: 0 }}
            >
              <Flex sx={{ rowGap: '24px' }} direction="column">
                <Flex
                  sx={{ columnGap: '48px', rowGap: '24px' }}
                  flexWrap="wrap"
                >
                  <SSOInfoContainer>
                    <SSOInfo accountDetails={ssoDetails} />
                    <Flex direction="column">
                      {formFields.map(fieldProps => {
                        if (fieldProps.skipIfExists && isConfigured)
                          return <></>;
                        if (fieldProps.prefix)
                          return (
                            <Controller
                              as={PrefixedInput}
                              control={control}
                              {...fieldProps}
                            />
                          );

                        return (
                          <Input
                            ref={register}
                            type={fieldProps.password ? 'password' : 'text'}
                            // @ts-expect-error not really sure yet
                            error={errors[fieldProps.name]}
                            key={fieldProps.name}
                            disabled={disabledField}
                            {...fieldProps}
                          />
                        );
                      })}
                    </Flex>
                  </SSOInfoContainer>
                  <SSOInfoContainer>
                    <SSODetails accountDetails={ssoDetails} />
                  </SSOInfoContainer>
                </Flex>
                <Flex paddingBottom="24px" sx={{ gap: '24px' }}>
                  {!isConfigured && (
                    <Button
                      onClick={handleSubmit(onSaveChange)}
                      disabled={disabledField}
                      isLoading={isLoading}
                    >
                      {disabledField ? 'Saved' : 'Save Changes'}
                    </Button>
                  )}
                  {isConfigured && (
                    <>
                      <Button onClick={showCallbackModal} variant="destructive">
                        Delete
                      </Button>
                    </>
                  )}
                </Flex>
              </Flex>
            </motion.div>
          )}
        </AnimatePresence>
      </Flex>
      <RenderCallbackModal />
    </>
  );
};
