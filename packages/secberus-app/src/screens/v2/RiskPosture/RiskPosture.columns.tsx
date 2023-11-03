// @ts-nocheck
import { Box } from '@chakra-ui/react';
import {
  BaseBadge,
  Text,
  SeverityBadge,
  RCTableExtendedColumnType,
  ViolationsIndicator,
} from '@secberus/components';
import { Policy } from '@secberus/services';
import { ResourcesContext } from '../../../app/core/wrappers/WithResources';
import { OverlayExpanderCell } from '../../../components';
import {
  RiskPosturePoliciesCell,
  RiskPosturePoliciesCellNumerator,
  RiskPosturePriorityCell,
  DivisonSign,
  StyledRiskBadge,
  StyledViolationsBadge,
  RiskPosturePoliciesCellDenominator,
} from './RiskPosture.styled';

export const policyColumns: RCTableExtendedColumnType<Policy>[] = [
  {
    key: 'severity',
    title: 'Severity',
    width: 108,
    sort: true,
    resize: true,
    render: (_val, row, _idx) => (
      <SeverityBadge
        type="xsmall-regular"
        color="extra-dark"
        priorityNum={row?.severity}
        background="transparent"
      />
    ),
  },
  {
    key: 'name',
    title: 'Policy',
    ellipsis: true,
    sort: true,
    resize: true,
    render: (_val, row, _idx) => (
      <OverlayExpanderCell buttonText="View policy">
        <Text type="xsmall-regular" color="extra-dark">
          {row.name}
        </Text>
      </OverlayExpanderCell>
    ),
  },
  {
    key: 'resource_name',
    dataIndex: 'resource_name',
    title: 'Resource type',
    width: 240,
    ellipsis: true,
    resize: true,
    render: (_val, row, _idx) => (
      <ResourcesContext.Consumer>
        {resourceMap => {
          return (
            <BaseBadge
              background="transparent"
              label={
                <Text type="xsmall-regular" color="extra-dark">
                  {resourceMap[row?.resource_id]?.description ?? '-'}
                </Text>
              }
              iconMap="resource"
              icon={resourceMap[row?.resource_id]?.datasource_types[0]}
              padding="0px"
            />
          );
        }}
      </ResourcesContext.Consumer>
    ),
  },
  {
    key: 'score',
    title: 'Risk',
    width: 110,
    render: (_val, row, _idx) => (
      <StyledRiskBadge riskScore={row?.score ?? 0} />
    ),
  },
  {
    key: 'violation_count',
    title: 'Violations',
    width: 110,
    render: (_val, row, _idx) => (
      <StyledViolationsBadge violations={row?.violation_count} />
    ),
  },
];

export const categoryColumns: RCTableExtendedColumnType<Policy>[] = [
  {
    key: 'description',
    title: 'Policy categories',
    width: 524,
    resize: true,
    ellipsis: true,
    render: (_val, row, _idx) => (
      <OverlayExpanderCell buttonText="View category">
        <Text type="xsmall-regular" color="extra-dark">
          {row.name}
        </Text>
      </OverlayExpanderCell>
    ),
  },
  {
    key: 'risk_score',
    title: 'Risk',
    width: 92,
    render: (_val, row, _idx) => <StyledRiskBadge riskScore={row.risk_score} />,
  },
  {
    key: 'policy_failed_count',
    title: 'Failed policies',
    width: 134,
    render: (_val, row, _idx) => {
      return (
        <RiskPosturePoliciesCell>
          <RiskPosturePoliciesCellNumerator>
            {row.policy_failed_count}
          </RiskPosturePoliciesCellNumerator>
          <DivisonSign>/</DivisonSign>
          <RiskPosturePoliciesCellDenominator>
            {row.policy_count}
          </RiskPosturePoliciesCellDenominator>
        </RiskPosturePoliciesCell>
      );
    },
  },
  {
    key: 'violations[CRITICAL]',
    title: (
      <Box display="flex" alignItems="center">
        <ViolationsIndicator priority="CRITICAL" /> Critical
      </Box>
    ),
    width: 90,
    render: (_val, row, _idx) => {
      return (
        <RiskPosturePriorityCell>
          {row.violations.CRITICAL}
        </RiskPosturePriorityCell>
      );
    },
  },
  {
    key: 'violations[HIGH]',
    title: (
      <Box display="flex" alignItems="center">
        <ViolationsIndicator priority="HIGH" /> High
      </Box>
    ),
    width: 90,
    render: (_val, row, _idx) => {
      return (
        <RiskPosturePriorityCell>{row.violations.HIGH}</RiskPosturePriorityCell>
      );
    },
  },
  {
    key: 'violations[MEDIUM]',
    title: (
      <Box display="flex" alignItems="center">
        <ViolationsIndicator priority="MEDIUM" /> Medium
      </Box>
    ),
    width: 90,
    render: (_val, row, _idx) => {
      return (
        <RiskPosturePriorityCell>
          {row.violations.MEDIUM}
        </RiskPosturePriorityCell>
      );
    },
  },
  {
    key: 'violations[LOW]',
    width: 90,
    title: (
      <Box display="flex" alignItems="center">
        <ViolationsIndicator priority="LOW" /> Low
      </Box>
    ),
    render: (_val, row, _idx) => {
      return (
        <RiskPosturePriorityCell>{row.violations.LOW}</RiskPosturePriorityCell>
      );
    },
  },
];
