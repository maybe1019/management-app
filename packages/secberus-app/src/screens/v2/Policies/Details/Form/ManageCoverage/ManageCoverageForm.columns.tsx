import React from 'react';
import {
  BadgeIcon,
  BaseBadge,
  Checkbox,
  RCTableExtendedColumnType,
} from '@secberus/components';
import { Datasource } from '@secberus/services';
import { useManageCoverageFormColumnsProps } from './ManageCoverageForm.types';

export const useManageCoverageFormColumns = ({
  selected,
  isAllOnPageSelected,
  handleSelectAllOnPage,
  handleSelectRow,
}: useManageCoverageFormColumnsProps): RCTableExtendedColumnType<Datasource>[] => [
  {
    key: 'select',
    dataIndex: 'select',
    width: 46,
    sort: false,
    title: (
      <Checkbox
        className="select-checkbox"
        id="select-all"
        onClick={() => handleSelectAllOnPage()}
        checked={isAllOnPageSelected}
        gutterBottom={false}
      />
    ),
    render: (_val, row) => (
      <Checkbox
        className="select-checkbox"
        id={row.id}
        onChange={handleSelectRow}
        checked={selected?.includes(row.id as string)}
        gutterBottom={false}
      />
    ),
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Data source',
    sort: true,
    render: (_val, row) => (
      <BaseBadge
        transparent
        typography="xsmall-regular"
        color="extra-dark"
        iconMap="datasource"
        icon={row.datasource_type_id as BadgeIcon}
        label={row.name}
      />
    ),
  },
];
