import { TableGW } from '@secberus/components';
import { Policy } from '@secberus/services';
import { useHistory } from 'react-router-dom';
import { ScopedHoveredExpanderCell } from '../../../../components';
import { policyColumns } from '.';

export const PolicyTable: React.FC<{
  data: Policy[];
}> = ({ data }) => {
  const history = useHistory();
  const handleRowClick = (record: Policy) => {
    history.push(`policy/details/${record.id}`);
  };
  return (
    <TableGW<Policy>
      columns={policyColumns}
      data={data}
      key="policy-violations-table"
      onRow={(record, index) => ({
        onClick: handleRowClick.bind(null, record, index),
      })}
      rowHoverBehavior={{
        cursor: 'pointer',
        injectedStyles: ScopedHoveredExpanderCell,
      }}
    />
  );
};
