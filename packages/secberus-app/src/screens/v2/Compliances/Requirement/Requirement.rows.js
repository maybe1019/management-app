import React from 'react';
import { useHistory } from 'react-router-dom';
import { areEqual } from 'react-window';
import { Button, TableGW } from '@secberus/components';

import {
  policyColumns as gwPCol,
  violationColumns as gwVCol,
} from './Requirement.columns';
import { SubTableWrapper, PassingCount } from './Requirement.styled';
import { Box } from '@chakra-ui/react';
import { RequirementTable } from './Requirement.table.tsx';
import { handleControlPoliciesSort } from '../Control/sort';
import { HoveredExpanderCell } from '../../../../components';
import { useSorting } from '../../../../features/sorting';

export const PolicyRow = React.memo(({ data, index, style }) => {
  const history = useHistory();
  const [passingPolicies, setPassingPolicies] = React.useState([]);
  const item = data[index];

  const { id, policies, failed_policy_count, policy_count } = item;

  const policiesPassingCount = policy_count - failed_policy_count;
  const passing = failed_policy_count < 1;

  React.useMemo(() => {
    if (policies) {
      setPassingPolicies(policies.filter(p => !!p.violation_count));
    }
  }, [policies]);

  const onSort = ([col, dir]) => {
    if (dir === null)
      return setPassingPolicies(policies.filter(p => !!p.violation_count));
    const sortedData = handleControlPoliciesSort(
      policies.filter(p => !!p.violation_count),
      col,
      dir.toLowerCase()
    );
    setPassingPolicies(sortedData);
  };

  const handleRowClick = (record, index, event) => {
    const link = `policy/details/${record.id}`;
    history.push(link);
  };

  return (
    <div style={style}>
      <Box>
        <RequirementTable items={data} />
      </Box>
    </div>
  );
}, areEqual);

export const ViolationRow = React.memo(({ data, index, style, isLoading }) => {
  const item = data[index];

  const { violations, failed_policy_count } = item;

  const passing = failed_policy_count < 1;

  return (
    <div style={style}>
      <Box>
        <RequirementTable items={[item]} />
      </Box>
      {!passing && (
        <SubTableWrapper>
          {violations.length > 0 && (
            <TableGW isLoading={isLoading} columns={gwVCol} data={violations} />
          )}
        </SubTableWrapper>
      )}
    </div>
  );
}, areEqual);
