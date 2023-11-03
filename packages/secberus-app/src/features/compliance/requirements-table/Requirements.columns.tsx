import { TdHTMLAttributes } from 'react';
import {
  Button,
  RCTableExtendedColumnType,
  StatusBadge,
  Text,
  ViolationsBadge,
} from '@secberus/components';
import { Flex, Box } from '@chakra-ui/react';
import { OverlayExpanderCell } from '../../../components';
import { isControl } from '../../../utils/flattenFramework';
import { PolicyTable, SubTableWrapper } from '.';
import { HoverWrapper } from './';
export const requirementCols: RCTableExtendedColumnType<any>[] = [
  {
    key: 'description',
    title: 'Controls',
    width: 660,
    onCell: (row, index) => {
      const props: TdHTMLAttributes<HTMLTableCellElement> = {};
      if (row.isChild) {
        props.colSpan = 5;
      }
      return props;
    },
    render: (_val, row, _idx) => {
      if (row.isChild) {
        return (
          <>
            <SubTableWrapper>
              <HoverWrapper>
                <PolicyTable data={row.data} />
              </HoverWrapper>
            </SubTableWrapper>
            {row.passingPolicies ? (
              <Flex justifyContent="center" pt="16px">
                <Button
                  to={`subrequirement/details/${row.controlId}`}
                  variant="tertiary"
                  color="gray"
                >
                  Show {row.passingPolicies} passing policies
                </Button>
              </Flex>
            ) : null}
          </>
        );
      }
      const label = isControl(row) ? row.identifier : row.name;
      const decorator = isControl(row) ? row.ordinal : 0;
      return (
        <OverlayExpanderCell buttonText="View control">
          <Text type="xsmall-bold" color="extra-dark">
            {decorator}. {label}
          </Text>
        </OverlayExpanderCell>
      );
    },
  },
  {
    key: 'id',
    title: 'Status',
    width: 124,
    onCell: (row, index) => {
      const props: TdHTMLAttributes<HTMLTableCellElement> = {};
      if (row.isChild) {
        props.colSpan = 0;
      }
      return props;
    },
    render: (_val, { violation_count, depth, policy_count, ...rest }, _idx) => {
      if (rest.isChild) {
        return null;
      }
      const passing = policy_count
        ? (violation_count ?? 0) < 1
          ? 'passing'
          : 'failing'
        : 'indeterminate';
      return (
        <StatusBadge
          passing={passing}
          transparent
          type="xsmall-regular"
          color="extra-dark"
        />
      );
    },
  },
  {
    key: 'failed_policy_count',
    title: 'Passing',
    width: 110,
    onCell: (row, index) => {
      const props: TdHTMLAttributes<HTMLTableCellElement> = {};
      if (row.isChild) {
        props.colSpan = 0;
      }
      return props;
    },
    render: (_val, { policy_count, failed_policy_count, ...rest }, _idx) => {
      if (rest.isChild) {
        return null;
      }
      return (
        <Text type="xsmall-regular" color="extra-dark">
          {policy_count - failed_policy_count} / {policy_count}
        </Text>
      );
    },
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
    width: 110,
    onCell: (row, index) => {
      const props: TdHTMLAttributes<HTMLTableCellElement> = {};
      if (row.isChild) {
        props.colSpan = 0;
      }
      return props;
    },
    render: (_val, { policy_count, ...rest }, _idx) => {
      if (rest.isChild) {
        return null;
      }
      return (
        <Box textAlign="center">
          <Text type="xsmall-regular" color="extra-dark">
            {policy_count}
          </Text>
        </Box>
      );
    },
  },
  {
    key: 'violation_count',
    title: 'Violations',
    width: 125,
    onCell: (row, index) => {
      const props: TdHTMLAttributes<HTMLTableCellElement> = {};
      if (row.isChild) {
        props.colSpan = 0;
      }
      return props;
    },
    render: (_val, { violation_count, ...rest }, _idx) => {
      if (rest.isChild) {
        return null;
      }
      return <ViolationsBadge violations={violation_count} />;
    },
  },
];
