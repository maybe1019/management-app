import React from 'react';
import { TimesLight, Pen } from '@secberus/icons';
import { Text, SlidePanel, TableGW } from '@secberus/components';
import { Spinner } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { rolesApi, AccessPolicy } from '@secberus/services';
import {
  Title,
  Divider,
  EditButton,
  PanelHeader,
  PanelWrapper,
  CloseButton,
  TableWrapper,
  StyledGridRow,
  PanelScrollbox,
  SpinnerContainer,
  StyledBlockSection,
} from './RolePanel.styled';
import { RolePanelProps, RolePanelComponentProps } from './RolePanel.types';

const RolePanelComponent: React.FC<RolePanelComponentProps> = ({
  onClose,
  role,
  isLoading,
}) => {
  const history = useHistory();

  return (
    <PanelWrapper>
      {!isLoading ? (
        <>
          <PanelHeader>
            <CloseButton
              icon
              variant="tertiary"
              data-test-id="closeModalButton"
              onClick={() => onClose()}
            >
              <TimesLight />
            </CloseButton>
            <Text type="small">{role?.name}</Text>
            {!role?.secberus_managed && (
              <EditButton
                variant="primary"
                size="small"
                onClick={() => {
                  history.push(`/admin/roles/form/edit/${role?.id}`);
                }}
              >
                <Pen color="white" /> Edit role
              </EditButton>
            )}
          </PanelHeader>
          <PanelScrollbox>
            <Title>Role details</Title>
            <Divider />
            <StyledBlockSection>
              <StyledGridRow>
                <Text type="small-bold" color="gray">
                  Author
                </Text>
                <Text type="small-regular">
                  {role?.secberus_managed ? 'Secberus' : 'Custom'}
                </Text>
              </StyledGridRow>
              {role?.description && (
                <StyledGridRow>
                  <Text type="small-bold" color="gray">
                    Description
                  </Text>
                  <Text type="small-regular">{role?.description}</Text>
                </StyledGridRow>
              )}
            </StyledBlockSection>
            <TableWrapper>
              <TableGW
                isLoading={isLoading}
                data={role?.policies || []}
                columns={[
                  {
                    key: 'access_policy',
                    dataIndex: 'access_policy',
                    title: 'Access policies',
                    width: 224,
                    render: (_val, row: AccessPolicy) => (
                      <Text type="xsmall-regular" color="extra-dark">
                        {row.name}
                      </Text>
                    ),
                  },
                ]}
                onRow={(record, index) => ({
                  onClick: () =>
                    history.push(
                      `/admin/access-policies/access-policy/details/${record.id}`
                    ),
                })}
                rowHoverBehavior={{
                  cursor: 'pointer',
                }}
              />
            </TableWrapper>
          </PanelScrollbox>
        </>
      ) : (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </PanelWrapper>
  );
};

export const RolePanel: React.FC<RolePanelProps> = ({ onClose, isVisible }) => {
  const { roleId } = useParams<{ roleId: string }>();

  const { data, ...query } = rolesApi.useGetRoleQuery({ roleId: roleId });

  return (
    <SlidePanel isVisible={isVisible} onClose={onClose}>
      <RolePanelComponent
        onClose={onClose}
        role={data}
        isLoading={query.isLoading}
      />
    </SlidePanel>
  );
};
