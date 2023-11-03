import React from 'react';
import styled from 'styled-components';
import {
  RiskBadge,
  ViolationsBadge,
  BaseBadge,
  Text,
  RCTableExtendedColumnType,
  SeverityBadge,
} from '@secberus/components';
import { secberusApi_Policy } from '@secberus/services';
import { ResourcesContext } from '../../../app/core/wrappers/WithResources';
import { OverlayExpanderCell } from '../../../components';

const StyledViolationsBadge = styled(ViolationsBadge)`
  border-radius: 16px;
`;

const PolicyCell = styled.span`
  color: ${({ theme }) => theme.colors.dark};
  display: flex;
  align-items: center;
  min-width: 0;
  & > p {
    ${({ theme }) => theme.typography.smallBold}
    text-overflow: ellipsis;
    white-space: normal;
    overflow: hidden;
    margin-bottom: 0em;
    margin-top: 0em;
  }
`;

const StyledRiskBadge = styled(RiskBadge)`
  padding: 4px 8px;
  border-radius: 16px;
`;

export const policyColumns: RCTableExtendedColumnType<secberusApi_Policy>[] = [
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
    width: 480,
    sort: true,
    resize: true,
    ellipsis: true,
    render: (_val, row, _idx) => (
      <OverlayExpanderCell buttonText="View policy">
        <PolicyCell>
          <Text type="xsmall-regular" color="extra-dark">
            {row.name}
          </Text>
        </PolicyCell>
      </OverlayExpanderCell>
    ),
  },
  {
    key: 'resource_name',
    dataIndex: 'resource_name',
    title: 'Resource type',
    width: 300,
    resize: true,
    ellipsis: true,
    render: (_val, row, _idx) => (
      <ResourcesContext.Consumer>
        {resourceMap => {
          return (
            <BaseBadge
              background="transparent"
              label={
                <Text type="xsmall-regular" color="extra-dark">
                  {row?.resource_id
                    ? resourceMap[row?.resource_id]?.description
                    : '-'}
                </Text>
              }
              iconMap="resource"
              // @ts-expect-error its defined
              icon={resourceMap[row?.resource_id]?.datasource_types[0]}
            />
          );
        }}
      </ResourcesContext.Consumer>
    ),
  },
  {
    key: 'score',
    title: 'Risk',
    width: 90,
    render: (_val, row, _idx) => <StyledRiskBadge riskScore={row.score ?? 0} />,
  },
  {
    key: 'violation_count',
    title: 'Violations',
    width: 90,
    render: (_val, row, _idx) => (
      <StyledViolationsBadge violations={row.violation_count} />
    ),
  },
];
