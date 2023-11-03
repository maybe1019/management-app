import React from 'react';
import { BaseModal, Button, Select } from '@secberus/components';
import { PlusLight } from '@secberus/icons';
import { useHistory } from 'react-router-dom';
import {
  ButtonWrapper,
  ComplianceModalForm,
  TableContainer,
} from '../../Form/AddEditPolicy/AddEditPolicy.styled';
import { useForm } from 'react-hook-form';
import { flattenFramework } from '../../../../../utils/flattenFramework';
import { useColumns } from './Compliance.columns';
import {
  filterAlreadySelected,
  removeTopLevelFramework,
} from './Compliance.utils';
import { ExpandableTable } from '../../../../../components';
import { useHasPermissions } from '../../../../../app/abac/hooks/useHasPermissions';

const ComplianceModal = ({
  onClose,
  isLoading,
  onSubmit,
  frameworks,
  policyFrameworks,
}) => {
  const history = useHistory();
  const { register, control, handleSubmit } = useForm();

  const columns = useColumns({ register });

  const [selectedFrameworkDropdown, setSelectedFrameworkDropdown] =
    React.useState(frameworks[0] ?? []);

  const flattened = flattenFramework(selectedFrameworkDropdown);

  const handleDropdownSelect = option => setSelectedFrameworkDropdown(option);

  const isAdministratorOrOwner = useHasPermissions(
    'api:compliance-frameworks:update'
  );

  const onFormSubmit = ({ framework: frameworkId }) => {
    onSubmit(flattened.find(f => f.id === frameworkId));
    onClose();
  };

  return (
    <BaseModal
      title="Add to compliance"
      handleClose={() => onClose(false)}
      variant="light"
      loading={isLoading}
    >
      <ComplianceModalForm
        onSubmit={handleSubmit(onFormSubmit)}
        id="compliance-form"
      >
        <Select
          onChange={handleDropdownSelect}
          options={frameworks}
          value={selectedFrameworkDropdown}
          actionItem={
            isAdministratorOrOwner
              ? {
                  label: 'Select frameworks',
                  onClick: () => history.push('/frameworks'),
                  icon: <PlusLight height={16} width={16} />,
                }
              : null
          }
        />
        <TableContainer>
          <ExpandableTable
            columns={columns}
            groupCells
            data={filterAlreadySelected(
              removeTopLevelFramework(flattened),
              policyFrameworks
            )}
            searchKey="identifier"
            rowStyles={{ height: 'fit-content', borderBottom: true }}
            tableDataStyles={{
              height: '100%',
              width: '100%',
              padding: '0px',
            }}
            expanded
          />
        </TableContainer>
        <ButtonWrapper>
          <Button
            type="submit"
            form="compliance-form"
            variant="primary"
            disabled={!control}
            isLoading={isLoading}
          >
            Add to compliance
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ButtonWrapper>
      </ComplianceModalForm>
    </BaseModal>
  );
};

export default ComplianceModal;
