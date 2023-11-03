import { RCTableExtendedColumnType } from '@secberus/components';
import { AccessPolicy } from '@secberus/services';
import { OverlayExpanderCell } from '../../../components';
import { AuthorCell } from '../../../components/Cells/AuthorCell';

export const accessPoliciesColumns: RCTableExtendedColumnType<AccessPolicy>[] =
  [
    {
      key: 'name',
      title: 'Name',
      sort: true,
      resize: true,
      render: (_val, row, _idx) => (
        <OverlayExpanderCell buttonText="View policy">
          {row.name}
        </OverlayExpanderCell>
      ),
    },
    {
      key: 'secberus_managed',
      title: 'Author',
      ellipsis: true,
      sort: true,
      width: 160,
      render: (_val, row, _idx) => (
        <AuthorCell
          secberusManaged={row?.secberus_managed}
          textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
        />
      ),
    },
  ];
