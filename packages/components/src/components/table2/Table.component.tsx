import React, { useContext } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import styled, { CSSProperties, ThemeContext } from 'styled-components';
import { Spinner } from '@chakra-ui/react';
import {
  ChevronDownLight,
  ChevronRightLight,
  InfoLight,
  Sort,
  CaretUp,
  CaretDown,
} from '@secberus/icons';
import { DefaultRecordType, ExpandableConfig } from 'rc-table/lib/interface';
import {
  RCTableExtendedColumnType,
  RCTableExtendedTableProps,
} from './Table.types';
import { StyledTable, StyledTableArrowContainer } from './Table.styled';
import { TableContext, TableContextProvider } from './TableContext';
import { useTableLoadTransitionBuffer } from './hooks/useTableLoadTransitionBuffer';

const ResizeSeperatorHandle = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.blue};
  width: 3px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transform: translateX(50%);
  -ms-transform: translateX(50%);
  transform: translateX(50%);
  z-index: 1;
  touch-action: none;
  cursor: ew-resize;
  opacity: 0;
  &:hover {
    opacity: 100;
  }
`;

const HandleComponent = React.forwardRef((props: any, ref) => {
  const { handleAxis, ...restProps } = props;
  return (
    <ResizeSeperatorHandle
      ref={ref}
      className={`foo handle-${handleAxis}`}
      {...restProps}
      draggable={false}
      role="separator"
      onClick={e => {
        e.stopPropagation();
      }}
    />
  );
});

const SortableHeader = ({ children, ...rest }: any) => {
  const tableContext = useContext(TableContext);

  const {
    dispatch,
    state: { sortColumn, sortDirection, onSort },
  } = tableContext;

  // function(s)
  const onClick = () => {
    // change the state of the sorted column
    if (!rest.sort) return;

    // sorting the same column
    const oldCol = sortColumn;
    const oldDir = sortDirection;
    let newDir: string | null = 'ASC';
    let newCol: string | null = rest.columnKey;

    if (oldCol === newCol) {
      newDir = !oldDir ? 'ASC' : oldDir === 'ASC' ? 'DESC' : null;
      newCol = !newDir ? null : newCol;
    }

    // only changes the arrow
    dispatch({
      type: 'updateSortedColumn',
      col: newCol,
      dir: newDir,
    });

    // onSort actually changes the data
    if (onSort) {
      onSort([newCol, newDir]);
    }
  };

  const isColumnSorted = rest.columnKey === sortColumn;
  const isAscending = sortDirection === 'ASC';
  const Icon = isColumnSorted ? (isAscending ? CaretUp : CaretDown) : Sort;

  return (
    <th {...rest}>
      <div
        className={`sortable-header-cell ${rest.sort ? 'sort-enabled' : ''}`}
        onClick={onClick}
      >
        {children}
        {rest.sort && (
          <Icon
            className={`sort-icon ${(sortDirection || '')
              .toLowerCase()
              .trim()}`}
            width="16px"
            height="16px"
            color="#6A6A88"
          />
        )}
      </div>
    </th>
  );
};

const ResizableTitle = (props: any) => {
  const { onResize, width, resize, children, ...restProps } = props;
  const [calculatedWidth, setCalculatedWidth] = React.useState<number | null>(
    width ?? 0
  );

  if (!resize) {
    return <SortableHeader {...restProps}>{children}</SortableHeader>;
  }

  const onResizeStart = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    const elem = data.node.closest('th');

    if (elem) {
      const cellWidth = elem.offsetWidth;
      setCalculatedWidth(cellWidth);
    } else {
      setCalculatedWidth(null);
    }
  };

  if (!width && calculatedWidth === null) {
    return <SortableHeader {...restProps}>{children}</SortableHeader>;
  }

  return (
    <Resizable
      width={width ?? calculatedWidth}
      height={0}
      onResizeStart={onResizeStart}
      onResize={onResize}
      handle={<HandleComponent />}
      axis="x"
    >
      <SortableHeader {...restProps}>{children}</SortableHeader>
    </Resizable>
  );
};

const LoadingComponentStyles = styled.div`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingComponent = () => {
  return (
    <LoadingComponentStyles>
      <Spinner sx={{ flexShrink: 0 }} />
    </LoadingComponentStyles>
  );
};

export const EmptyDataTableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const EmptyDataTableContent = styled.div`
  ${({ theme }) => ({
    ...theme.typography['small-bold'],
    color: theme.colors.gray,
  })}
  margin: auto;
  padding: 84px;
  svg {
    margin: 0 auto;
    path,
    circle {
      stroke: ${({ theme }) => theme.colors.gray};
    }
  }
`;

export const EmptyTablePlaceholder = ({
  message = 'No results available',
}: {
  message?: string;
}): JSX.Element => (
  <EmptyDataTableContainer>
    <EmptyDataTableContent>
      <InfoLight color="#6A6A88" width={24} height={24} />
      {message}
    </EmptyDataTableContent>
  </EmptyDataTableContainer>
);

export const ExpandIcon: ExpandableConfig<any>['expandIcon'] = ({
  expanded,
  onExpand,
  record,
  expandable,
}) => {
  if (!expandable) {
    return null;
  }
  const Icon = expanded ? ChevronDownLight : ChevronRightLight;
  return (
    <div
      className={`expand-icon ${expanded ? 'expanded' : 'closed'}`}
      onClick={e => {
        e.stopPropagation();
        onExpand(record, e);
      }}
    >
      <StyledTableArrowContainer>
        <Icon height={24} width={24} />
      </StyledTableArrowContainer>
    </div>
  );
};
/**
 * @param rowHoverBehavior { asLink: boolean } - Be sure to use <TableCell>
 * If this prop is truthy. The styling changes it makes to TD are relatively
 * invasive, and require a custom component to take control over the cell.
 * It has to be on ALL cells if asLink is true.
 *
 * TL:DR; Table look wrong? add <TableCell> on ALL cells!
 */
export const TableGW = <RecordType extends DefaultRecordType>({
  data,
  columns,
  sortColumn,
  sortDirection,
  onSort,
  isLoading,
  stateTransitionBuffer,
  disableStateTransitionBuffer,
  emptyText,
  rowClassName,
  selectedRows = [],
  rowKey = 'id',
  minRowHeight,
  ...props
}: RCTableExtendedTableProps<RecordType>) => {
  const { tableSpacing, tableSpacingPreference } = useContext(ThemeContext);
  const selectedRowsSet = React.useMemo(
    () => new Set(selectedRows),
    [selectedRows]
  );
  const internalIsLoading = useTableLoadTransitionBuffer({
    isLoading,
    data,
    stateTransitionBuffer,
    disableStateTransitionBuffer,
  });

  const [columnsWidth, setColumnsWidth] = React.useState(
    columns.map(c => c.width)
  );

  /**
   * Automatically apply height for rows based on it's content and if it can be interacted with.
   */
  const tableRowHeight = React.useMemo((): CSSProperties['height'] => {
    if (props?.onRow && !minRowHeight) {
      return tableSpacing[tableSpacingPreference].actionRowMinHeight;
    } else if (minRowHeight) {
      return `${minRowHeight}px`;
    } else {
      return 'unset';
    }
  }, [minRowHeight, props, tableSpacing, tableSpacingPreference]);

  /**
   * Custom <tr /> element that allows setting a minimum row height for tables.
   * @param props
   * @constructor
   */
  const TableRow = (props: any) => {
    const { children, style, ...restProps } = props;
    return (
      <tr
        style={{
          ...style,
          height: tableRowHeight,
        }}
        {...restProps}
      >
        {children}
      </tr>
    );
  };

  const components = {
    header: {
      cell: ResizableTitle,
    },
    body: {
      row: TableRow,
    },
  };

  /**
   * Automatically sets ".selected" for rowClassName where recorded is selected.
   * Merges existing rowClassName values if they exist.
   * @param args
   */
  const getRowClassName = (...args: [RecordType, number, number]) => {
    const classes =
      typeof rowClassName === 'function' ? rowClassName(...args) : rowClassName;
    const classList = new Set(classes?.split(' '));

    if (selectedRowsSet.has(args[0]?.id)) {
      classList.add('selected');
    }

    return [...classList].join(' ');
  };

  const handleResize =
    (index: any) =>
    (e: any, { size }: any) => {
      setColumnsWidth(columns => {
        const nextColumns = [...columns];
        nextColumns[index] = size.width;
        return nextColumns;
      });
    };

  const columnsExtended = columns.map((col, index) => ({
    ...col,
    width: columnsWidth[index],
    onHeaderCell: (column: RCTableExtendedColumnType<RecordType>) => ({
      width: column.width,
      onResize: handleResize(index),
      resize: col.resize ?? false,
      columnKey: col.key,
      sort: col.sort ?? false,
    }),
  }));
  const expandable = props.expandable || {};
  return (
    <TableContextProvider
      initialState={{
        sortColumn,
        sortDirection,
        onSort,
      }}
    >
      <StyledTable<RecordType>
        components={components}
        columns={columnsExtended}
        data={internalIsLoading ? [] : data}
        emptyText={
          internalIsLoading ? (
            LoadingComponent
          ) : !emptyText || typeof emptyText === 'string' ? (
            <EmptyTablePlaceholder
              message={(emptyText as string) ?? undefined}
            />
          ) : (
            emptyText
          )
        }
        rowKey={rowKey}
        rowClassName={selectedRows ? getRowClassName : rowClassName}
        expandable={{
          rowExpandable: record => !!record?.children,
          indentSize: 32,
          expandIcon: ExpandIcon,
          ...expandable,
        }}
        {...props}
      />
    </TableContextProvider>
  );
};
