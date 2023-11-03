import { Text, RCTableExtendedColumnType } from '@secberus/components';
import { User } from '@secberus/services';
import styled from 'styled-components';
import { OverlayExpanderCell } from '../../../components';

const NoAccessBox = styled.div`
  background: #fee4e4;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 8px;
  width: max-content;
`;

const NoAccessDesignator: React.FC = () => (
  <NoAccessBox>
    <Text type="xsmall-bold">No access</Text>
  </NoAccessBox>
);

const OwnerAccessBox = styled.div`
  background: #deeefe;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 8px;
  width: max-content;
`;

const OwnerAccessDesignator: React.FC = () => (
  <OwnerAccessBox>
    <Text type="xsmall-bold">Account owner</Text>
  </OwnerAccessBox>
);

const AccessCell: React.FC<User> = ({ orgs, account_owner }) => {
  if (account_owner) return <OwnerAccessDesignator />;
  if (!orgs?.length) return <NoAccessDesignator />;
  if (orgs.length === 1)
    return <Text type="xsmall-regular">{orgs[0].name}</Text>;
  return <Text type="xsmall-regular">{orgs.length} organizations</Text>;
};

export const userTableColumns: RCTableExtendedColumnType<User>[] = [
  {
    key: 'name',
    resize: true,
    ellipsis: true,
    width: 300,
    title: 'Name',
    sort: true,
    render: (_val, row, _idx) => (
      <OverlayExpanderCell buttonIcon="pen">
        <Text
          type="xsmall-regular"
          color="extra-dark"
        >{`${row.name} ${row.family_name}`}</Text>
      </OverlayExpanderCell>
    ),
  },
  {
    key: 'email',
    ellipsis: true,
    resize: true,
    title: 'Email',
    sort: true,
    render: (_val, row, _idx) => (
      <Text type="xsmall-regular" color="extra-dark">
        {row.email}
      </Text>
    ),
  },
  {
    key: 'account_owner',
    resize: true,
    ellipsis: true,
    title: 'Access',
    width: 350,
    onCell: ({ orgs, account_owner }) => ({
      title: account_owner
        ? 'Account owner'
        : orgs?.map(org => org.name).join(', '),
    }),
    sort: true,
    render: (_val, row, _idx) => <AccessCell {...row} />,
  },
];
