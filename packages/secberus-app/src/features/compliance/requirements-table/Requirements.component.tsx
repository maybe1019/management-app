import React from 'react';
import { useHistory } from 'react-router-dom';
import { TableGW, ColumnSortFunction, ExpandIcon } from '@secberus/components';
import { ComplianceControlAugmented, Policy } from '@secberus/services';
import { useDeepMemo } from '@secberus/utils';
import { cloneDeep } from 'lodash';
import {
  flattenFrameworks,
  MaybeComplianceControlOrFrameworkWithTracking,
} from '../../../utils/flattenFramework';
import { handleRequirementControlSort } from '../utils/TableSort.util';
import { ScopedHoveredExpanderCell } from '../../../components';
import { requirementCols, StyledExpandIcon } from '.';

export const RequirementTable = ({
  items,
}: {
  items: ComplianceControlAugmented[];
  view: 'policies' | 'violations';
  staticList?: boolean;
}) => {
  const history = useHistory();
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

  //@ts-expect-error not typed
  const handleRowClick = (record, index, event) => {
    const link = `compliances/subrequirement/details/${record.id}`;
    history.push(link);
  };
  const tableDataWithFailedPolicyChildren = useDeepMemo(() => {
    // Clone to prevent delete operative from modifying memo dependencies
    const tableDataCloned = cloneDeep(tableData);
    return tableDataCloned.map(data => {
      const content: Record<string, any> = data;
      //@ts-expect-error poorly typed
      const failingPolicies = data.policies?.filter(
        (policy: Policy) => policy.violation_count
      );
      content.hasChildren = !!failingPolicies.length;
      if (failingPolicies.length) {
        content.children = [
          {
            isChild: true,
            data: failingPolicies,
            controlId: data.id,
            // @ts-expect-error poorly typed, policies not on type
            passingPolicies: data.policies?.length - failingPolicies.length,
          },
        ];
      } else {
        // There's no failing policies, so clean up
        if ('children' in content) {
          delete content.children;
        }
      }
      return content;
    });
  }, [tableData]);

  return (
    <StyledExpandIcon>
      <TableGW
        data={tableDataWithFailedPolicyChildren}
        columns={requirementCols}
        onSort={onSort}
        onRow={(row, index) => ({
          onClick: !row.isChild
            ? handleRowClick.bind(null, row, index)
            : undefined,
        })}
        rowClassName={record =>
          record.isChild ? 'rc-table-cell-no-hover' : ''
        }
        rowHoverBehavior={{
          cursor: 'pointer',
          injectedStyles: ScopedHoveredExpanderCell,
        }}
        expandable={{
          rowExpandable: record => record?.hasChildren,
          indentSize: 32,
          expandIcon: ExpandIcon,
        }}
      />
    </StyledExpandIcon>
  );
};
