import React from 'react';
import { CheckBall } from '@secberus/icons';
import { Flex } from '@chakra-ui/react';
import { Text, TableGW, RCTableExtendedColumnType } from '@secberus/components';
import { ROLE_PERMISSIONS } from './Roles.constants';
import { RolePermissionConstant, RolesProps } from './Roles.types';
import { StyledModal, TableWrapper } from './Roles.styled';

export const RolesPermissions: React.FC<RolesProps> = ({
  isVisible,
  onClose,
}) => {
  const columns: RCTableExtendedColumnType<RolePermissionConstant>[] = [
    {
      key: 'features',
      title: 'Features',
      width: 55,
      render: (_val, row) => (
        <Text type="xsmall-regular" color="extra-dark">
          {row.text}
        </Text>
      ),
      onCell: row => {
        return row.section_title ? { colSpan: 5 } : { colSpan: 1 };
      },
    },
    {
      key: 'viewer',
      title: 'Viewer',
      width: 15,
      render: (_val, row) =>
        row.viewer && (
          <Flex justifyContent="center">
            <CheckBall height="20" width="20" />
          </Flex>
        ),
      onCell: row => {
        return row.section_title ? { colSpan: 0 } : { colSpan: 1 };
      },
    },
    {
      key: 'contributor',
      title: 'Contributor',
      width: 15,
      render: (_val, row) =>
        row.contributor && (
          <Flex justifyContent="center">
            <CheckBall height="20" width="20" />
          </Flex>
        ),
      onCell: row => {
        return row.section_title ? { colSpan: 0 } : { colSpan: 1 };
      },
    },
    {
      key: 'admin',
      title: 'Administrator',
      width: 15,
      render: (_val, row) =>
        row.admin && (
          <Flex justifyContent="center">
            <CheckBall height="20" width="20" />
          </Flex>
        ),
      onCell: row => {
        return row.section_title ? { colSpan: 0 } : { colSpan: 1 };
      },
    },
    {
      key: 'owner',
      title: 'Account Owner',
      width: 15,
      align: 'center',
      render: (_val, row) =>
        row.owner && (
          <Flex justifyContent="center">
            <CheckBall height="20" width="20" />
          </Flex>
        ),
      onCell: row => {
        return row.section_title ? { colSpan: 0 } : { colSpan: 1 };
      },
    },
  ];
  return (
    <StyledModal
      title="Role overview"
      isVisible={isVisible}
      handleClose={onClose}
      variant="light"
    >
      <TableWrapper>
        <TableGW
          columns={columns}
          sticky
          data={ROLE_PERMISSIONS}
          rowHoverBehavior={{
            background: 'transparent',
          }}
          rowClassName={row => {
            return row.section_title ? 'category-row' : '';
          }}
        />
      </TableWrapper>
    </StyledModal>
  );
};
