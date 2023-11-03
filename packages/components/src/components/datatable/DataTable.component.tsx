/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import _ from 'lodash';
import { RowRenderProps } from 'react-fluid-table';
import { useStaggeredLoading } from '../../hooks/useStaggeredLoading';
import { useContainerSize } from '../../hooks';
import { BaseToolTip } from './tooltip/ToolTip';
import { Tooltip, StyledTable, Container } from './DataTable.styled';
import { DataTableProps, TableColumnProps, IRow } from './DataTable.types';
import { DataTableColumnHeader } from './header/ColumnHeader.component';
import { DataTableRow } from './row';
import { DataTableCellContent } from './cellContent';
import { StaticExpandableTable } from './static-expandable/StaticExpandableTable';
import { Placeholder } from './DataTable.placeholders';
import { LinkWrapper } from './DataTable.util';

const rebuildTooltip = _.debounce(() => Tooltip.rebuild(), 200, {
  leading: false,
  trailing: true,
});

const isRowEqual = (prev: any, next: any) => {
  const isSame = _.isEqual(prev.row, next.row);
  return isSame;
};

/**
 * Virtualized data table - with option for static rendering.
 *
 * @param idKey - Partially deprecated! Only used in static tables to key components
 * @param virtualized - passing false will render the table as a static, non virtualized component
 *
 */
export const DataTableBase = <T,>({
  isLoading,
  data,
  columns,
  rowRenderer,
  getRow,
  height,
  width,
  rowHeight = 48,
  tooltips,
  alternatingRowColor = true,
  className,
  virtualized = true,
  expanded = false,
  maxLength,
  rowStyles,
  defaultSortBy,
  placeholder,
  linkOpts,
  idKey,
}: React.PropsWithChildren<DataTableProps<T>>) => {
  const [activeSort, setActiveSort] = React.useState<
    Record<string, Record<string, unknown>>
  >({});
  const staggeredLoading = useStaggeredLoading(isLoading);
  const [tableData, setTableData] = React.useState<IRow[]>();
  // using a ref in a hook https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const [container, setContainerNode] = React.useState();
  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setContainerNode(node);
    }
  }, []);

  const { height: containerHeight } = useContainerSize(container);

  React.useEffect(() => {
    if (!defaultSortBy) return setTableData(data);
    const { id, dir } =
      typeof defaultSortBy === 'string'
        ? { id: defaultSortBy, dir: 'desc' }
        : defaultSortBy;
    const ascending = dir === 'asc';
    const col = columns.find(c => c.key === id);
    setActiveSort({
      [id as string]: {
        active: true,
        ascending,
      },
    });

    const sortedData = col?.sort
      ? col.sort(ascending, data ?? [])
      : _.orderBy(
          data ?? [],
          [
            x =>
              typeof x[id as string] === 'string'
                ? x[id as string].toLowerCase()
                : x[id as string],
          ],
          dir as 'asc' | 'desc'
        );

    setTableData(sortedData);
  }, [data, defaultSortBy, columns]);

  const defaultSort = (
    ascending: boolean,
    sortData: IRow[],
    id: string
  ): IRow[] => _.orderBy(sortData, [id], [ascending ? 'asc' : 'desc']);

  const columnsPlus = React.useMemo(
    () =>
      columns.map((col: TableColumnProps): TableColumnProps => {
        const CellContentComponent = col.cellContent
          ? (col.cellContent as React.FC)
          : DataTableCellContent;

        const sortFn = col.sort ? col.sort : defaultSort;

        const handleSort = (ascending: boolean, id: string) =>
          setTableData(sortFn(ascending, tableData ?? [], id));

        return {
          ...col,
          header: React.memo(() => (
            <DataTableColumnHeader
              id={col.key}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
              sort={handleSort}
              width={col.width}
              minWidth={col.minWidth}
              className={col.className}
              disableSort={col.disableSort}
            >
              {col.title}
            </DataTableColumnHeader>
          )),
          content: React.memo(({ row }) => {
            const rowData = getRow ? getRow({ id: row.id }) : row;
            return (
              <LinkWrapper row={rowData} target={col.key} linkOpts={linkOpts}>
                <CellContentComponent row={rowData} target={col.key} />
              </LinkWrapper>
            );
          }),
        };
      }),
    [activeSort, columns, getRow, linkOpts, tableData]
  );

  const DefaultRowRenderer: React.FC<RowRenderProps> = props => {
    return (
      <DataTableRow
        alternatingRowColor={alternatingRowColor}
        fontWeight={rowStyles?.['font-weight'] ?? 400}
        {...props}
      >
        {props.children}
      </DataTableRow>
    );
  };

  const RowRenderer = React.memo(rowRenderer || DefaultRowRenderer, isRowEqual);

  React.useEffect(() => {
    rebuildTooltip();
  }, [tableData, columns]);

  if (isLoading && !staggeredLoading)
    return (
      <Placeholder
        type="empty"
        className={className}
        tableProps={{
          data: [],
          columns: columnsPlus,
          rowHeight,
          width,
        }}
      />
    );

  if (!isLoading && !staggeredLoading && !tableData?.length) {
    return (
      <Placeholder
        type={placeholder ?? 'noresults'}
        height={height}
        className={className}
        tableProps={{
          data: [],
          columns: columnsPlus,
          rowHeight,
          width,
        }}
      />
    );
  }
  if (staggeredLoading || !tableData?.length)
    return (
      <Placeholder
        type={staggeredLoading ? 'loading' : placeholder ?? 'filter'}
        height={height}
        className={className}
        tableProps={{
          data: [],
          columns: columnsPlus,
          rowHeight,
          width,
        }}
      />
    );

  return (
    <>
      <Container
        ref={measuredRef}
        className={className}
        onScroll={rebuildTooltip}
        width={width}
      >
        {virtualized ? (
          <StyledTable
            data={tableData}
            tableHeight={(height as any) || containerHeight || undefined}
            columns={columnsPlus}
            rowHeight={rowHeight}
            rowRenderer={RowRenderer}
          />
        ) : (
          <StaticExpandableTable
            data={tableData}
            columns={columnsPlus}
            expanded={expanded}
            maxLength={maxLength}
            rowStyles={rowStyles}
            idKey={idKey}
          />
        )}
      </Container>
      {tooltips?.map(Tip => (
        <Tip />
      ))}
      <BaseToolTip />
    </>
  );
};

export const DataTable = React.memo(
  DataTableBase,
  _.isEqual
) as typeof DataTableBase;
