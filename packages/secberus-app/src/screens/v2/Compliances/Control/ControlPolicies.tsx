import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ColumnSortFunction, TableGW } from '@secberus/components';
import { Policy } from '@secberus/services';
import { HoveredExpanderCell } from '../../../../components';
import { policyColumns } from './Control.columns';
import { handleControlPoliciesSort } from './sort';

type ControlPoliciessProps = {
  policies: Policy[];
  isLoading: boolean;
};

export const ControlPolicies: React.FC<ControlPoliciessProps> = ({
  policies,
  isLoading,
}) => {
  const history = useHistory();
  const [tableData, setTableData] = React.useState<Policy[]>([]);
  const { url } = useRouteMatch();

  React.useEffect(() => {
    if (policies) {
      setTableData(policies);
    }
  }, [policies]);

  const onSort: ColumnSortFunction<Policy> = ([sortCol, sortDir]) => {
    if (!sortDir || !sortCol) return setTableData(policies);
    const sortedData = handleControlPoliciesSort(
      tableData,
      sortCol,
      sortDir.toLowerCase() as 'desc' | 'asc'
    );
    setTableData(sortedData);
  };

  //@ts-expect-error untyped typed record
  const handleRowClick = record => {
    const link = url + `/policy/details/${record.id}`;
    history.push(link);
  };

  return (
    <TableGW
      isLoading={isLoading}
      columns={policyColumns}
      data={tableData}
      onSort={onSort}
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
