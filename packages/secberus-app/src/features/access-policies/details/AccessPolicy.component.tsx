import React from 'react';
import { Box, Flex, Grid, Spinner } from '@chakra-ui/react';
import {
  Text,
  Button,
  CodeEditor,
  DetailHeader,
  ButtonDropdown,
  ConfirmModal,
  DropdownPanel,
  DropdownPanelListItem,
} from '@secberus/components';
import { PenDark, PenLight, Settings } from '@secberus/icons';
import { useHistory, useParams } from 'react-router-dom';
import { accessPoliciesApi } from '@secberus/services';
import { AnyFn, useModalToggle } from '@secberus/utils';
import { usePermissions } from '../../../app/rbac/definitions';
import { AccessPolicyHeader } from './components';

export function AccessPolicy() {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const [deleteModal, toggleDeleteModal] = useModalToggle();
  const { id: accessPolicyId } = params;

  const [createAccessPolicy, createAccessPolicyMutation] =
    accessPoliciesApi.useCreateAccessPolicyMutation({});

  const { data: accessPolicy, ...getAccessPolicyQuery } =
    accessPoliciesApi.useGetAccessPolicyQuery({
      accessPolicyId,
    });

  const { canCreate, canUpdate, canDelete } = usePermissions('access-policies');

  const [deleteAccessPolicy, deleteAccessPoliciesMutation] =
    accessPoliciesApi.useDeleteAccessPolicyMutation();

  const isLoading =
    getAccessPolicyQuery.isLoading ||
    getAccessPolicyQuery.isFetching ||
    getAccessPolicyQuery.isUninitialized;

  const clonePolicy = React.useCallback(async () => {
    if (accessPolicy) {
      createAccessPolicy({
        createAccessPolicy: {
          ...accessPolicy,
          name: `${accessPolicy.name} - Clone`,
        },
      }).then(res => {
        if ('data' in res && res?.data?.id) {
          history.push(`/admin/access-policies/edit/${res.data.id}`);
        }
      });
    }
  }, [accessPolicy, history, createAccessPolicy]);

  const options = React.useMemo(() => {
    if (!canCreate || !canDelete) {
      return null;
    }
    const options: Array<{
      id: string;
      name: string;
      onClick: AnyFn;
      destructive?: boolean;
    }> = [];
    if (canCreate) {
      options.push({
        id: 'edit',
        name: 'Clone policy',
        onClick: clonePolicy,
      });
    }
    if (canDelete && !accessPolicy?.secberus_managed) {
      options.push({
        id: 'delete',
        name: 'Delete policy',
        destructive: true,
        onClick: toggleDeleteModal,
      });
    }
    return options;
  }, [
    canCreate,
    canDelete,
    accessPolicy?.secberus_managed,
    clonePolicy,
    toggleDeleteModal,
  ]);

  return (
    <Grid w="100%" h="100%" templateRows="repeat(5, 1fr)">
      <AccessPolicyHeader isLoading={isLoading} {...accessPolicy} />
      <DetailHeader title="Policy details" marginBottom="0">
        {options && !isLoading && (
          <Flex gridGap="8px">
            <ButtonDropdown
              variant="secondary"
              icon
              label={<Settings />}
              alignRight
              options={options}
              disabled={
                createAccessPolicyMutation.isLoading ||
                deleteAccessPoliciesMutation.isLoading
              }
            />
            {!accessPolicy?.secberus_managed && (
              <Button
                variant="primary"
                to={`/admin/access-policies/edit/${accessPolicy?.id}/details`}
              >
                <PenDark /> Edit policy
              </Button>
            )}
          </Flex>
        )}
      </DetailHeader>
      <Grid templateColumns="1fr 360px" gridGap="120px" padding="32px">
        <Box padding="0px 0px 12px 0px">
          <Box padding="0px 0px 12px 0px">
            <Flex align="center" justify="space-between" alignItems="center">
              <Text type="small-bold">Policy logic</Text>
              {canUpdate && !accessPolicy?.secberus_managed && !isLoading && (
                <Button
                  variant="secondary"
                  size="small"
                  to={`/admin/access-policies/edit/${accessPolicy?.id}/editor`}
                >
                  <PenLight /> Edit code
                </Button>
              )}
            </Flex>
          </Box>
          <Box backgroundColor="#F1F6FA" borderRadius="16px" margin="0px">
            <Box h="350px" borderRadius="16px" paddingX="8px" paddingY="0px">
              {!isLoading ? (
                <CodeEditor
                  width="100%"
                  theme="sb-light"
                  defaultValue={accessPolicy?.logic}
                  options={{
                    readOnly: true,
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    padding: { top: 16 },
                  }}
                />
              ) : (
                <Flex
                  justifyContent="center"
                  h="100%"
                  w="100%"
                  alignItems="center"
                >
                  <Spinner />
                </Flex>
              )}
            </Box>
          </Box>
        </Box>
        <Box width="360px" marginBottom="32px">
          {!isLoading ? (
            <DropdownPanel title="Included in roles">
              {accessPolicy?.roles?.length ? (
                accessPolicy.roles.map(({ id, name }) => (
                  <DropdownPanelListItem title="" key={id} displayOnly={true}>
                    <Text type="small-regular">
                      <Flex
                        justifyContent="left"
                        flexDirection="row"
                        alignItems="center"
                      >
                        {name}
                      </Flex>
                    </Text>
                  </DropdownPanelListItem>
                ))
              ) : (
                <DropdownPanelListItem title="" displayOnly={true}>
                  <Text type="small-regular">
                    <Flex
                      justifyContent="left"
                      flexDirection="row"
                      alignItems="center"
                    >
                      No roles
                    </Flex>
                  </Text>
                </DropdownPanelListItem>
              )}
            </DropdownPanel>
          ) : (
            <Flex justifyContent="center">
              <Spinner />
            </Flex>
          )}
        </Box>
      </Grid>
      {deleteModal && (
        <ConfirmModal
          title="Delete policy"
          handleClose={async confirmed => {
            if (confirmed) {
              await deleteAccessPolicy({
                accessPolicyId,
              });
              history.push(`/admin/access-policies`);
            }
            toggleDeleteModal();
          }}
          isVisible={deleteModal}
          loading={deleteAccessPoliciesMutation.isLoading}
          btnOpts={{
            variant: 'destructive',
            color: 'white',
          }}
          btnText="Confirm deletion"
        >
          This policy will be removed from all associated roles on deletion.
          <br />
          <br />
          <Box display="inline">
            Are you sure you want to delete the policy {accessPolicy?.name}
            ?&nbsp;
            <Text type="bold">This action is non reversible.</Text>
          </Box>
        </ConfirmModal>
      )}
    </Grid>
  );
}
