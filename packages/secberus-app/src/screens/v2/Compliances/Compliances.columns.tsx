import {
  StatusBadge,
  Text,
  ViolationsBadge,
  RCTableExtendedColumnType,
} from '@secberus/components';
import { Flex } from '@chakra-ui/react';
import {
  MaybeComplianceControlOrFrameworkAugmentedWithTracking,
  isControl,
} from '../../../utils/flattenFramework';
import { OverlayExpanderCell } from '../../../components';
import { isChildControl } from './Compliances.util';

export const gwCols: RCTableExtendedColumnType<MaybeComplianceControlOrFrameworkAugmentedWithTracking>[] =
  [
    {
      key: 'description',
      title: 'Controls',
      resize: true,
      render: (_val, row, _idx) => {
        const label = isControl(row) ? row.identifier : row.name;
        const decorator = isControl(row) ? row.ordinal : 0;
        return (
          <OverlayExpanderCell
            buttonText={isChildControl(row) ? 'View control' : 'View controls'}
          >
            <Text // controls start at depth of 2
              type={row.depth === 2 ? 'xsmall-bold' : 'xsmall-regular'}
              color="extra-dark"
            >
              {decorator}. {label}
            </Text>
          </OverlayExpanderCell>
        );
      },
    },
    {
      key: 'violation_count',
      title: 'Status',
      width: 120,
      resize: true,
      render: (_val, { policy_count, violation_count, depth }, _idx) => {
        const passing = policy_count
          ? (violation_count ?? 0) < 1
            ? 'passing'
            : 'failing'
          : 'indeterminate';
        return (
          <StatusBadge
            passing={passing}
            transparent
            type={depth === 0 ? 'xsmall-bold' : 'xsmall-regular'}
            color="extra-dark"
          />
        );
      },
    },
    {
      key: 'failed_policy_count',
      title: 'Passing',
      resize: true,
      width: 160,
      render: (_val, { policy_count, failed_policy_count, depth }, _idx) => (
        <Text
          type={depth === 0 ? 'xsmall-bold' : 'xsmall-regular'}
          color="extra-dark"
        >
          {policy_count! - failed_policy_count!} / {policy_count}
        </Text>
      ),
    },
    {
      key: 'policy_count',
      title: (
        <Flex align="center" justify="center" width="100%">
          <Text type="xsmall-bold" color="gray">
            Policies
          </Text>
        </Flex>
      ),
      width: 120,
      resize: true,
      render: (_val, { policy_count, depth }, _idx) => (
        <Text
          type={depth === 0 ? 'xsmall-bold' : 'xsmall-regular'}
          color="extra-dark"
          align="center"
        >
          {policy_count}
        </Text>
      ),
    },
    {
      key: 'violation_count',
      title: 'Violations',
      render: (_val, { violation_count }, _idx) => (
        <ViolationsBadge violations={violation_count} />
      ),
    },
  ];
