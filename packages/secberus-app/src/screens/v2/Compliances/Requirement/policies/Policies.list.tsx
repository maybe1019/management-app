import { TableGW } from '@secberus/components';
import { Policy } from '@secberus/services';
import { useHistory } from 'react-router-dom';
import { useDeepMemo } from '@secberus/utils';
import { policyColumns } from '../Requirement.columns';
import { HoveredExpanderCell } from '../../../../../components';

export const PolicyTable: React.FC<{
  data: Policy[];
}> = ({ data }) => {
  const history = useHistory();

  const handleRowClick = (record: Policy) => {
    const link = `policy/details/${record.id}`;
    history.push(link);
  };
  const failingPolicies = useDeepMemo(() => {
    return data.filter(policy => policy.violation_count);
  }, [data]);

  return (
    <TableGW<Policy>
      columns={policyColumns}
      data={failingPolicies}
      onRow={(row, index) => ({
        onClick: handleRowClick.bind(null, row, index),
      })}
      rowHoverBehavior={{
        cursor: 'pointer',
        injectedStyles: HoveredExpanderCell,
      }}
    />
  );
};
