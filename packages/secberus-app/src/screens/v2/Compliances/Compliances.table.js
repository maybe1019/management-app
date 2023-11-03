import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { TableGW } from '@secberus/components';
import { handleComplianceSort } from './table-sort';
import { gwCols } from './Compliances.columns';
import { isChildControl } from './Compliances.util';
import { HoveredExpanderCell } from '../../../components';

export const CompliancesTable = ({ isLoading, frameworks }) => {
  const history = useHistory();
  const [tableData, setTableData] = React.useState([]);
  const { url } = useRouteMatch();

  React.useEffect(() => {
    if (frameworks) {
      setTableData(frameworks);
    }
  }, [frameworks]);

  const handleRowClick = (record, index, event) => {
    let link =
      url +
      `/${isChildControl(record) ? 'sub' : ''}requirement/details/${record.id}`;

    history.push(link);
  };

  const onSort = React.useCallback(
    ([col, dir]) => {
      if (!dir | !col) return setTableData(frameworks);
      const sortedData = handleComplianceSort(
        tableData,
        col,
        dir.toLowerCase()
      );
      setTableData(sortedData);
    },
    [frameworks, tableData]
  );
  return (
    <TableGW
      isLoading={isLoading}
      data={tableData}
      columns={gwCols}
      onSort={onSort}
      rowKey="id"
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

export default CompliancesTable;
