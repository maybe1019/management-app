import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { TableGW, ColumnSortFunction } from '@secberus/components';
import { flattenFrameworks } from '../../../../utils/flattenFramework';
import { handleRequirementControlSort } from '../table-sort';
import { MaybeComplianceControlOrFrameworkWithTracking } from '../../../../utils/flattenFramework';
import { HoveredExpanderCell } from '../../../../components';
import { requirementCols } from './Requirement.columns';
import { PolicyTable } from './policies/Policies.list';

export const RequirementTable = ({ items }: { items: any[] }) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [tableData, setTableData] = React.useState<
    MaybeComplianceControlOrFrameworkWithTracking[]
  >([]);

  React.useEffect(() => {
    if (items) {
      setTableData(flattenFrameworks(items));
    }
  }, [items]);

  const onSort: ColumnSortFunction = ([col, dir]) => {
    if (dir === null) return setTableData(flattenFrameworks(items));
    const sortedData = handleRequirementControlSort(
      items,
      col ?? '',
      dir.toLowerCase() as 'desc' | 'asc'
    );
    setTableData(sortedData);
  };
  //@ts-expect-error untyped due to table type being any
  const handleRowClick = record => {
    const link = url + `/subrequirement/details/${record.id}`;
    history.push(link);
  };
  return (
    <TableGW
      data={tableData}
      columns={requirementCols}
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
