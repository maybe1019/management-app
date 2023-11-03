import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Flex, Box, Grid } from '@chakra-ui/react';
import {
  Text,
  ConfirmModal,
  Switch,
  SeverityBadge,
  RiskBadge,
  BaseBadge,
  Link,
  BadgeIcon,
} from '@secberus/components';
import { useModalToggle } from '@secberus/utils';
import {
  secberusApi_Policy,
  policiesApi2,
  policiesApi,
} from '@secberus/services';
import { isArray } from 'lodash';
import { ErrorBoundary } from '../../../../../utils/wrappers/ErrorBoundaries';
import { usePermissions } from '../../../../../app/rbac/definitions';
import { generateURL } from '../../../../../hooks/useQuery';
import { useDeletePolicy } from '../../hooks/usePolicyRequests';

export type PolicyDetailHeaderBadge =
  | 'severity'
  | 'risk'
  | 'violations'
  | 'exception'
  | 'statusSwitch'
  | 'resources'
  | 'author'
  | 'category'
  | 'compliance';

interface HeaderComponentProps {
  policy: secberusApi_Policy;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ policy }) => {
  const [history] = [useHistory(), useLocation()];
  const [deleteModal, toggleDeleteModal] = useModalToggle();
  const { canUpdate: canTogglePolicy } = usePermissions('policies');
  const { canList: canListOrgs, canRead: canReadOrgs } = usePermissions('orgs');
  const { handleDelete: handleDeletePolicy, isLoading: isPolicyDeleting } =
    useDeletePolicy(policy?.name);

  const logsURL = React.useMemo(
    () =>
      generateURL('/logs', 'filter', {
        textSearch: [policy?.name],
      }),
    [policy?.name]
  );

  const { data: policyDataSources } = policiesApi.useListPolicyDatasourcesQuery(
    {
      policyId: policy?.id as string,
      limit: '500',
    },
    { skip: !policy }
  );

  const [setSubscription] = policiesApi2.usePolicySubscriptionsMutation();

  const handlePolicySubscription = async (checked: boolean) => {
    if ('subscribed' in policy) {
      return await setSubscription({
        policySubscriptionList: [{ policy_id: policy.id!, enabled: !checked }],
      }).unwrap();
    }
  };

  const onDeletePolicy = async (item: secberusApi_Policy) => {
    await handleDeletePolicy(item.id);
    toggleDeleteModal();
    history.push('/policies');
  };

  return (
    <>
      <Flex direction="column" sx={{ gap: '8px' }}>
        <Grid w="100%" templateColumns="repeat(1, 1fr) 320px">
          <Box w="100%">
            <Flex gridGap="8px">
              {'severity' in policy && (
                <SeverityBadge
                  priorityNum={policy?.severity}
                  background="medium-gray"
                  padding="4px 8px"
                />
              )}
              {'score' in policy ? (
                <RiskBadge
                  icon
                  riskScore={policy.score!}
                  background="medium-gray"
                  pill={false}
                />
              ) : null}
              {isArray(policy?.datasource_types) &&
                policy?.datasource_types.length !== 0 && (
                  <BaseBadge
                    iconMap="resource"
                    icon={
                      policy?.datasource_types[0]
                        ? (policy?.datasource_types[0] as BadgeIcon)
                        : undefined
                    }
                    background="medium-gray"
                  >
                    {policy?.label}
                  </BaseBadge>
                )}
            </Flex>
          </Box>
        </Grid>
        <Grid w="100%" templateColumns="repeat(1, 1fr) 320px">
          <div>
            <Flex wrap="wrap" direction="column" w="90%">
              <Box marginBottom="8px">
                <Text type="medium">{policy.name} </Text>
              </Box>
              <Text type="small-regular" color="dark">
                {policy.description}
              </Text>
            </Flex>
          </div>
          <Flex justifyContent="right">
            <div>
              <Box
                width="264px"
                background="white"
                padding="16px"
                borderRadius="8px"
              >
                <Flex gridGap="16px" direction="column" marginBottom="8px">
                  <Flex alignItems="center" gridGap="8px">
                    {canTogglePolicy ? (
                      <Switch
                        initialChecked={policy.subscribed}
                        updateCheckboxState={(_e, checked) =>
                          handlePolicySubscription(checked)
                        }
                      />
                    ) : (
                      <Flex direction="row">
                        <Text type="small-regular">Status:&nbsp;</Text>
                        <Text type="small-bold">
                          {policy.subscribed ? 'Enabled' : 'Disabled'}
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                  <Flex direction="row" flexWrap="wrap">
                    <Flex direction="row" width="100%">
                      <Text type="small-regular">Policy author:&nbsp;</Text>
                      <Text type="small-bold">
                        {policy.secberus_managed ? 'Secberus' : 'Custom'}
                      </Text>
                    </Flex>
                    <Flex direction="row" width="100%">
                      <Flex direction="row">
                        <Text type="small-regular">
                          Data sources covered:&nbsp;
                        </Text>
                        <Text type="small-bold">
                          {policyDataSources?.cursor?.total ?? 0}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                {canListOrgs && canReadOrgs && (
                  <Link
                    underline
                    color="blue"
                    type="small-regular"
                    to={logsURL}
                  >
                    View activity log
                  </Link>
                )}
              </Box>
            </div>
          </Flex>
        </Grid>
      </Flex>
      {deleteModal && (
        <ConfirmModal
          title="Confirm deletion"
          handleClose={async confirmed => {
            if (confirmed) {
              await onDeletePolicy(policy);
            }
            toggleDeleteModal();
          }}
          isVisible={deleteModal}
          loading={isPolicyDeleting}
        >
          Are you sure you want to delete {policy.name}?
          <Text type="bold">This action is non reversible.</Text>
        </ConfirmModal>
      )}
    </>
  );
};

const WithBoundary: React.FC<HeaderComponentProps> = props => (
  <ErrorBoundary>
    <HeaderComponent {...props} />
  </ErrorBoundary>
);

export { WithBoundary as HeaderComponent };
