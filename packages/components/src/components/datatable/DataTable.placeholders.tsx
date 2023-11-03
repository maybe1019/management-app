import React from 'react';
import { InfoLight } from '@secberus/icons';
import { Table } from 'react-fluid-table';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { Box, Flex } from '@chakra-ui/react';
import { isEqual } from 'lodash';
import {
  DataTableProps,
  PlaceholderType,
  PlaceholderContent,
} from './DataTable.types';
import {
  EmptyDataTableContainer,
  EmptyDataTableContent,
} from './DataTable.styled';

const PlaceHolderTableHeaderOnly = styled(Table)`
  .react-fluid-table-header {
    background-color: white;
    border-bottom: 1px solid ${props => props.theme.colors['light-gray']};
  }
  &.react-fluid-table {
    border: unset;
    overflow: hidden !important;
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.td`
  border-bottom: 1px solid #ececec;
  min-height: ${props => props.height}px;
  width: ${props => props.width};
`;

export interface PlaceholderProps {
  type: PlaceholderType;
  className?: string;
  tableProps: DataTableProps;
  height?: string | number;
}

export const SkeletonRow = styled(Flex)`
  * {
    margin-right: 5px;
  }
`;

const StyledSkeleton = styled(Skeleton)`
  && {
    background-color: rgb(0 0 0 / 2%);
    background-image: linear-gradient(
      90deg,
      rgb(0 0 0 / 2%),
      #f5f5f5,
      rgb(0 0 0 / 2%)
    );
  }
`;

const areEqual = (prevProps: PlaceholderProps, nextProps: PlaceholderProps) => {
  const [
    {
      tableProps: { rowHeight: prevRH, width: prevW },
      ...prevRest
    },
    {
      tableProps: { rowHeight: nextRH, width: nextW },
      ...nextRest
    },
  ] = [prevProps, nextProps];

  if (!isEqual([prevRH, prevW], [nextRH, nextW])) return false;
  if (!isEqual(prevRest, nextRest)) return false;
  return true;
};

export const TablePlaceholderComponent: React.FC<PlaceholderContent> = ({
  message = 'No results available',
  iconProps,
  children,
}) => (
  <EmptyDataTableContainer className="empty-data-table-container">
    <EmptyDataTableContent
      className="empty-data-table-content"
      margin={iconProps?.margin}
    >
      <InfoLight
        className="empty-data-table-icon"
        color="#6A6A88"
        width={iconProps?.width || 48}
        height={iconProps?.height || 48}
      />
      {message}
      {children}
    </EmptyDataTableContent>
  </EmptyDataTableContainer>
);

export const Placeholder: React.FC<PlaceholderProps> = React.memo(
  ({
    type,
    className,
    tableProps: { columns, rowHeight, width: tableWidth },
    height,
  }) => {
    const Content = () => {
      switch (type) {
        case 'loading': {
          return (
            <SkeletonRow w="100%" justifyContent="left" flexGrow="1">
              {columns.map(({ width: colWidth }) => (
                <Box h="100%" width={colWidth ?? '100%'} minW={colWidth}>
                  <StyledSkeleton height="100%" />
                </Box>
              ))}
            </SkeletonRow>
          );
        }
        case 'filter':
          return null;
        case 'empty': {
          return (
            <RowContainer>
              {[0, 1, 2].map(() => (
                <Row height={rowHeight} width="100%" />
              ))}
            </RowContainer>
          );
        }
        case 'noresults': {
          return <TablePlaceholderComponent />;
        }
        default:
          return null;
      }
    };

    return (
      <Flex
        h={height || '100%'}
        className={className}
        flexDirection="column"
        overflowY="auto"
      >
        <PlaceHolderTableHeaderOnly
          data={[]}
          tableHeight={33}
          tableWidth={tableWidth as any}
          columns={columns}
          rowHeight={rowHeight}
        />
        <Content />
      </Flex>
    );
  },
  areEqual
);
