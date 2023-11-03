import React from 'react';
import { Flex } from '@chakra-ui/react';
import {
  Button,
  ButtonDropdown,
  ConfirmModal,
  Text,
  Option,
} from '@secberus/components';
import { PenDark, Settings } from '@secberus/icons';
import { secberusApi_Policy } from '@secberus/services';
import { useModalToggle } from '@secberus/utils';
import { useHistory, useLocation } from 'react-router-dom';
import { usePermissions } from '../../../../../app/rbac/definitions';
import { useDeletePolicy } from '../../hooks/usePolicyRequests';

export const HeaderButtons: React.FC<{ policy: secberusApi_Policy }> = ({
  policy,
}) => {
  const [history, location] = [useHistory(), useLocation()];
  const [deleteModal, toggleDeleteModal] = useModalToggle();
  const { handleDelete: handleDeletePolicy, isLoading: isPolicyDeleting } =
    useDeletePolicy(policy?.name);
  const {
    canRead: readExceptions,
    canCreate: createExceptions,
    canUpdate: updateExceptions,
    canDelete: deleteExceptions,
  } = usePermissions('exceptions');
  const {
    canCreate: createPolicy,
    canUpdate: updatePolicy,
    canDelete: deletePolicy,
  } = usePermissions('policies');
  const isSqlPolicy = (policy?.language).toLowerCase() === 'sql';

  const editPolicy = () => {
    history.push({
      pathname: `/policies/${policy!.id}/form/details`,
      state: { prevRoute: location.pathname },
    });
  };

  const handleClone = async () => {
    history.push({
      pathname: `/policies/${policy!.id}/form/details?clone=true`,
      state: { prevRoute: location.pathname },
    });
  };

  const onDeletePolicy = async (item: secberusApi_Policy) => {
    await handleDeletePolicy(item.id);
    toggleDeleteModal();
    history.push('/policies');
  };

  const exceptionsLink = () => {
    history.push({
      pathname: `/policies/${policy.id!}/exceptions`,
      state: { prevRoute: location.pathname },
    });
  };

  const DropDownSettings = (): JSX.Element | null => {
    let options: Option[] = [];

    if (
      readExceptions &&
      createExceptions &&
      updateExceptions &&
      deleteExceptions
    ) {
      options.push({
        name: 'Manage exceptions',
        id: 'exception',
        onClick: exceptionsLink,
      });
    }

    if (isSqlPolicy && createPolicy) {
      options.push({
        name: 'Clone policy',
        id: 'clone',
        onClick: handleClone,
      });
    }

    if (!policy.secberus_managed && deletePolicy) {
      options = [
        ...options,
        {
          name: 'Delete policy',
          id: 'delete',
          destructive: true,
          onClick: toggleDeleteModal,
        },
      ];
    }

    if (options.length === 0) return null;
    return (
      <ButtonDropdown
        variant="secondary"
        alignRight
        listWidth="180px"
        label={<Settings />}
        options={options}
        icon
      />
    );
  };

  return (
    <>
      <Flex sx={{ gap: '8px' }}>
        <DropDownSettings />
        {!policy.secberus_managed &&
          (policy?.language || '').toLowerCase() !== 'rego' &&
          updatePolicy && (
            <Button
              variant="primary"
              onClick={editPolicy}
              data-test-id="editPolicyButton"
            >
              <PenDark /> Edit policy
            </Button>
          )}
      </Flex>
      {deleteModal && (
        <ConfirmModal
          title="Confirm deletion"
          handleClose={async (confirmed: boolean) => {
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
