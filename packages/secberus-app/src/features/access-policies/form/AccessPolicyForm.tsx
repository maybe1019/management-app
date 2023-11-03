import { Box, Flex, GridItem, Spinner } from '@chakra-ui/react';
import { Button, Input, TabBar, Text, CodeEditor } from '@secberus/components';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PenLight, TimesDark } from '@secberus/icons';
import {
  accessPoliciesApi,
  CreateAccessPolicyApiArg,
  AccessPolicy,
} from '@secberus/services';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useIsLoading } from '@secberus/utils';
import { createUpdateAccessPolicySchema } from './AccessPolicyForm.schema';
import { StyledTextArea } from './AccessPolicyForm.styled';

export function AddEditAccessPolicy({
  accessPolicy,
  view,
  isLoading,
}: {
  accessPolicy?: AccessPolicy;
  view?: string;
  isLoading?: boolean;
}) {
  const [createAccessPolicy, createAccessPolicyMutation] =
    accessPoliciesApi.useCreateAccessPolicyMutation({});

  const [updateAccessPolicy, updateAccessPolicyMutation] =
    accessPoliciesApi.useUpdateAccessPolicyMutation({});

  const { path } = useRouteMatch();
  const history = useHistory();
  const isEdit = !!accessPolicy?.id;

  /**
   * Required custom form here due to cross-tab functionality.
   */
  const {
    register,
    handleSubmit,
    errors,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: accessPolicy,
    mode: 'onBlur',
    shouldUnregister: false,
    resolver: yupResolver(createUpdateAccessPolicySchema),
  });

  const isFormSubmitting =
    isSubmitting ||
    createAccessPolicyMutation.isLoading ||
    updateAccessPolicyMutation.isLoading;

  const onSubmit = async (
    accessPolicyArgs: CreateAccessPolicyApiArg['createAccessPolicy']
  ) => {
    if (!isEdit) {
      createAccessPolicy({
        createAccessPolicy: accessPolicyArgs,
      }).then(res => {
        if ('data' in res && res?.data?.id) {
          history.push(`/admin/access-policies/edit/${res.data.id}/details`);
        }
      });
    } else {
      accessPolicy?.id &&
        updateAccessPolicy({
          accessPolicyId: accessPolicy?.id,
          updateAccessPolicy: accessPolicyArgs,
        });
    }
  };

  const exitPath = accessPolicy?.id
    ? `/admin/access-policies/access-policy/details/${accessPolicy?.id}`
    : '/admin/access-policies';

  const tabs = {
    details: {
      title: 'Details',
      path: path + '/details',
      route: 'details',
      component: null,
    },
    editor: {
      title: 'Policy editor',
      path: path + '/editor',
      route: 'editor',
      component: null,
    },
  };
  return (
    <Flex
      background="#1e1e32"
      position="fixed"
      top="0px"
      left="0px"
      h="100vh"
      w="100%"
      zIndex="100"
      flexDir="column"
    >
      <Flex
        bg="#1e1e32"
        pt="48px"
        pl="40px"
        pr="40px"
        w="100%"
        justifyContent="space-between"
      >
        <Text type="small" color="white">
          {!isLoading ? (
            accessPolicy?.name ?? 'Create a new access policy'
          ) : (
            <Spinner />
          )}
        </Text>
        <Box>
          <Button
            to={exitPath}
            className="addEditPolicy__close"
            variant="primary"
            icon
            background="dark-gray"
          >
            <TimesDark />
          </Button>
        </Box>
      </Flex>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            alignItems="end"
            justifyContent="space-between"
            padding="0px 40px 48px 40px"
          >
            <Box w="50%">
              <Input
                ref={register}
                defaultValue={accessPolicy?.name}
                name="name"
                label="Name"
                noMargin
                dark
                error={errors?.name}
                disabled={isLoading || isFormSubmitting}
              />
            </Box>
            <Button
              type="submit"
              variant="secondary"
              disabled={isLoading || isFormSubmitting}
            >
              <PenLight /> Save
            </Button>
          </Flex>
          <GridItem>
            <TabBar
              hasChildren={false}
              defaultTab="editor"
              // Tabbar component is null for editors and forms
              // See /src/screens/v2/Policies/Form/AddEditPolicy/AddEditPolicy.js
              // @ts-expect-error See above comment.
              tabs={tabs}
              mode="dark"
            />
          </GridItem>
          <Box bg="#111122">
            <Box display={view === 'details' ? 'block' : 'none'} h="100vh">
              <Flex w="100%" padding="40px">
                <Box w="50%" h="100%" overflowY="auto">
                  <StyledTextArea
                    dark
                    ref={register}
                    name="description"
                    label="Description"
                    defaultValue={accessPolicy?.description}
                    error={errors?.description}
                    disabled={isLoading || isFormSubmitting}
                  />
                </Box>
              </Flex>
            </Box>
            <Box display={view === 'editor' ? 'block' : 'none'} h="100vh">
              {!isFormSubmitting && !isLoading ? (
                <Controller
                  name="logic"
                  control={control}
                  render={({ value }) => {
                    return (
                      <CodeEditor
                        defaultValue={value}
                        onChange={({ code }) => {
                          control.setValue('logic', code);
                        }}
                        options={{
                          padding: {
                            top: 48,
                          },
                        }}
                        width="100%"
                        theme="sb-dark"
                      />
                    );
                  }}
                />
              ) : (
                <Flex
                  w="100%"
                  padding="32px"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Spinner color="white" />
                </Flex>
              )}
            </Box>
          </Box>
        </form>
      </Box>
    </Flex>
  );
}

export function AccessPolicyForm() {
  const params = useParams<{ id?: string; view?: string }>();
  const { data: accessPolicy, ...getAccessPolicy } =
    accessPoliciesApi.useGetAccessPolicyQuery(
      //@ts-expect-error skips
      { accessPolicyId: params?.id },
      {
        skip: !params?.id,
      }
    );
  const isLoading = useIsLoading([
    getAccessPolicy.isLoading,
    getAccessPolicy.isFetching,
  ]);
  return (
    <AddEditAccessPolicy
      accessPolicy={accessPolicy}
      view={params?.view}
      isLoading={isLoading}
    />
  );
}
