import React from 'react';
import { Text, RCTableExtendedColumnType } from '@secberus/components';
import { AccessRole } from '@secberus/services';
import { OverlayExpanderCell } from '../../../components';
import { AuthorCell } from '../../../components/Cells/AuthorCell';

export const columns: RCTableExtendedColumnType<AccessRole>[] = [
  {
    key: 'name',
    title: 'Name',
    sort: true,
    width: 310,
    render: (_val, row, _idx) => (
      <OverlayExpanderCell buttonIcon="expand">
        <Text type="xsmall-regular" color="extra-dark">
          {row.name}
        </Text>
      </OverlayExpanderCell>
    ),
  },
  {
    key: 'secberus_managed',
    resize: true,
    ellipsis: true,
    dataIndex: 'secberus_managed',
    title: 'Author',
    width: 70,
    render: (_val, row, _idx) => (
      <AuthorCell
        secberusManaged={row?.secberus_managed}
        textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
      />
    ),
  },
  {
    key: 'policies',
    title: 'Policies',
    className: 'policy-header',
    sort: true,
    width: 45,
    render: (_val, row, _idx) => (
      <Text type="xsmall-regular" color="extra-dark" align="center">
        {row.policies?.length}
      </Text>
    ),
  },
];
