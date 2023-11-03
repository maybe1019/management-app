import styled from 'styled-components';
import { Table } from 'react-fluid-table';
import ReactTooltip from 'react-tooltip';
import { styledScrollbar } from '../../css';

export const StyledTable = styled(Table)`
  .react-fluid-table-row {
    border-bottom: unset;
  }
  .react-fluid-table-header {
    align-items: center;
    background-color: ${props => props.theme.colors.white};
    border-bottom: 1px solid ${props => props.theme.colors['light-gray']};
  }
  &.react-fluid-table {
    border: unset;
    overflow: scroll;

    ${styledScrollbar()};
  }
`;

export const Tooltip = styled(ReactTooltip)`
  p {
    color: ${props => props.theme.colors.white};
  }
  ul {
    margin-bottom: 0;
    top: 5px;
    padding-inline-start: 15px;

    li,
    p {
      color: ${props => props.theme.colors.white};
    }
  }
`;

export const TableContainer = styled.div`
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 24px;
`;

interface ExportGuardWrapperMain {
  height: number | string;
}

export const ExportGuardWrapper = styled.div<ExportGuardWrapperMain>`
  .react-fluid-table {
    height: ${({ height }) => height}px !important;
  }
`;

export const Container = styled.div<{ width?: number | string }>`
  height: 100%;
  width: ${props =>
    typeof props.width === 'number' ? `${props.width}px` : props.width};
  .sticky-header {
    z-index: 100;
  }
`;

export const EmptyDataTableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const EmptyDataTableContent = styled.div<{ margin?: string }>`
  ${({ theme }) => ({
    ...theme.typography.small,
    color: theme.colors.gray,
  })}
  margin-top: 8%;
  svg {
    margin: ${({ margin = '0 auto 16px auto' }) => margin};
    path,
    circle {
      stroke: ${({ theme }) => theme.colors.gray};
    }
  }
`;
