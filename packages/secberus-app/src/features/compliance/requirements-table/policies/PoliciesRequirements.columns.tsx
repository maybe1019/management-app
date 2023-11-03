import {
  RCTableExtendedColumnType,
  SeverityBadge,
  Text,
  ViolationsBadge,
} from '@secberus/components';
import { Policy } from '@secberus/services';
import { OverlayExpanderCell } from '../../../../components';

export const policyColumns: RCTableExtendedColumnType<Policy>[] = [
  {
    key: 'severity',
    title: 'Severity',
    width: 108,
    sort: true,
    resize: true,
    render: (_val, row, _idx) => {
      return (
        <SeverityBadge
          background="transparent"
          priorityNum={row.severity}
          type="xsmall-regular"
          color="extra-dark"
        />
      );
    },
  },
  {
    key: 'name',
    title: 'Policy',
    render: (_val, row, _idx) => (
      <OverlayExpanderCell buttonText="View violations">
        <Text type="xsmall-regular" color="extra-dark">
          {row.name}
        </Text>
      </OverlayExpanderCell>
    ),
    sort: true,
    resize: true,
  },
  {
    key: 'violation_count',
    title: 'Violation',
    width: 120,
    sort: true,
    render: (_val, row, _idx) => {
      return <ViolationsBadge violations={row.violation_count} />;
    },
  },
];
