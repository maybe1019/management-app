import React from 'react';
import { TimesDark } from '@secberus/icons';
import { Button, TabBar, Text } from '@secberus/components';
import { AddEditExceptions } from '../../components';
import { PageHeader, PageContainer } from './ManageExceptions.styled';

export const ManageExceptions = ({ policy }) => {
  return (
    <PageContainer>
      <PageHeader>
        <Text type="small" color="white">
          {policy.name}
        </Text>
        <Button
          to={`/policies/policy/details/${policy.id}/details`}
          className="addEditPolicy__close"
          variant="primary"
          background="dark-gray"
          icon
        >
          <TimesDark />
        </Button>
      </PageHeader>
      <AddEditExceptions policy={policy} />
    </PageContainer>
  );
};
