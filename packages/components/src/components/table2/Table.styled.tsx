import styled from 'styled-components';
import Table from 'rc-table';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { changeAlphaValue } from '../../utils';
import { ExtendedTable } from './Table.types';

export const StyledTableArrowContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  border: 1px solid transparent;
  ${({ theme }) => theme.components.button.tertiary.base};
  &:hover {
    ${({ theme }) => theme.components.button.tertiary.hover};
  }
  &:active {
    ${({ theme }) => theme.components.button.tertiary.active};
  }
`;

/**
 * @description React Router link which applies the exact same styling as a TD
 */
export const TableLink = styled(Link)`
  height: 100%;
  width: 100%;
  padding: 16px 16px;
  text-decoration: inherit;
  display: flex;
  align-items: center;
  color: inherit;
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;
/**
 * @description Does the exact same styling as TableLink if you do not
 * want a specific cell to be a link in the rows.
 */
export const TableSpacer = styled.div`
  height: 100%;
  width: 100%;
  padding: ${({ theme: { tableSpacingPreference, tableSpacing } }) =>
    tableSpacing[tableSpacingPreference].padding};
  text-decoration: inherit;
  display: flex;
  align-items: center;
  color: inherit;
  background: ${({ theme }) => theme.colors.white};
`;

export const StyledTable = styled(Table as ExtendedTable)`
  &.rc-table {
    position: relative;
    box-sizing: border-box;
    color: #323246;
    font-size: 12px;
    line-height: 1.5;
    font-family: 'Eina 01';
  }
  * .expand-icon {
    cursor: pointer;
    padding-right: 8px;
    // Move the content back 32px (8px for padding, 24px for button)
    margin-left: -32px;
    z-index: 10;
  }
  .rc-table-content {
    ::-webkit-scrollbar {
      width: 8px;

      :horizontal {
        height: 8px;
      }
    }
    scrollbar-width: thin;
    scrollbar-color: transparent;
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 6px;
      width: 8px;

      transition: background-color 2s;
      border: ${`1px solid ${theme?.rgbaColors['light-gray']}`};
      background-color: ${() =>
        changeAlphaValue(theme.rgbaColors['extra-dark'], '0.28')};

      :horizontal {
        min-height: 8px;
      }

      :vertical {
        min-height: 48px;
      }

      &:hover {
        background-color: ${() =>
          changeAlphaValue(theme.rgbaColors['extra-dark'], '0.5')};
      }
    }
  }

  .rc-table-rtl {
    direction: rtl;
  }
  &.rc-table table {
    width: 100%;
    border-spacing: 0px;
    border-collapse: unset;
  }
  &.rc-table.with-select-cell-first {
    th.rc-table-cell:nth-of-type(2),
    td.rc-table-cell:nth-of-type(2) {
      border-left: none;
    }
  }
  &.rc-table .rc-table-cell-fix-left-last {
    border-right-width: 2px;
  }
  &.rc-table {
    th.rc-table-cell-fix-left-last {
      border-right-color: ${({ theme: { colors } }) => colors['medium-gray']};
    }
    td.rc-table-cell-fix-left-last {
      border-right-color: ${({ theme: { colors } }) => colors['light-gray']};
    }
  }
  &.rc-table .rc-table-cell-fix-left-last + th,
  &.rc-table .rc-table-cell-fix-left-last + td {
    // remove border directly after fixed cell
    border-left: none;
  }
  &.rc-table .rc-table-cell-fix-right-first {
    border-left-width: 2px;
  }
  &.rc-table {
    th.rc-table-cell-fix-right-first {
      border-left-color: ${({ theme: { colors } }) => colors['medium-gray']};
    }
    td.rc-table-cell-fix-right-first {
      border-left-color: ${({ theme: { colors } }) => colors['light-gray']};
    }
  }
  &.rc-table th + .rc-table-cell-fix-right-first,
  &.rc-table td + .rc-table-cell-fix-right-first {
    // remove border directly before fixed cell
    border-right: none;
  }
  &.rc-table th,
  &.rc-table td {
    position: relative;
    box-sizing: border-box;
    padding: 0;
    white-space: normal;
    word-break: break-word;
    border-bottom: 1px solid #f1f6fa;
    border-left: 1px solid #f1f6fa;
    transition: box-shadow 0.3s;
  }
  &.rc-table td {
    font-family: 'Eina 01', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme: { tableSpacingPreference, tableSpacing } }) =>
      tableSpacing[tableSpacingPreference].fontSize};
    line-height: ${({ theme: { tableSpacingPreference, tableSpacing } }) =>
      tableSpacing[tableSpacingPreference].lineHeight};
  }
  &.rc-table th {
    border-left: 1px solid #dfe7ef;
    font-family: 'Eina 01-Bold', sans-serif;
    font-style: normal;
    font-size: 13px;
    line-height: 22px;
    color: ${({ theme }) => theme.colors.gray};
  }
  &.rc-table td:last-child {
    border-right: 1px solid #f1f6fa;
  }
  &.rc-table th:last-child {
    border-right: 0;
    border-top-right-radius: 4px;
  }
  &.rc-table th:first-child {
    border-left: 0;
    border-top-left-radius: 4px;
  }
  &.rc-table th {
    padding: 4px 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &.rc-table td {
    ${({
      rowHoverBehavior,
      theme: { tableSpacing, tableSpacingPreference },
    }) => {
      return rowHoverBehavior?.asLink
        ? { padding: '0px', height: '1px' }
        : { padding: tableSpacing[tableSpacingPreference].padding };
    }}
  }
  &.rc-table td a {
    ${({
      rowHoverBehavior,
      theme: { tableSpacing, tableSpacingPreference },
    }) => {
      return rowHoverBehavior?.asLink
        ? { padding: tableSpacing[tableSpacingPreference].padding }
        : {};
    }}
  }
  &.rc-table-rtl.rc-table td {
    border-right: 0;
    border-left: 1px solid #f1f6fa;
  }
  &.rc-table-rtl.rc-table th {
    border-right: 0;
    border-left: 1px solid #dfe7ef;
  }
  .rc-table-cell-fix-left,
  .rc-table-cell-fix-right {
    z-index: 100;
  }
  &.rc-table-rtl .rc-table-cell-fix-right:last-child {
    border-right-color: #f1f6fa;
  }
  &.rc-table-rtl .rc-table-cell-fix-left:last-child {
    border-left-color: transparent;
  }
  &.rc-table-rtl .rc-table-cell-fix-left-first {
    box-shadow: 1px 0 0 #f1f6fa;
  }
  .rc-table-cell-fix-left-first::after,
  .rc-table-cell-fix-left-last::after {
    position: absolute;
    top: 0;
    right: -1px;
    bottom: -1px;
    width: 20px;
    transform: translateX(100%);
    transition: box-shadow 0.3s;
    content: '';
    pointer-events: none;
  }
  &.rc-table-rtl .rc-table-cell-fix-right-first,
  &.rc-table-rtl .rc-table-cell-fix-right-last {
    box-shadow: none;
  }
  .rc-table-cell-fix-right-first::after,
  .rc-table-cell-fix-right-last::after {
    position: absolute;
    top: 0;
    bottom: -1px;
    left: -1px;
    width: 20px;
    transform: translateX(-100%);
    transition: box-shadow 0.3s;
    content: '';
    pointer-events: none;
  }
  td.rc-table-cell.rc-table-cell-ellipsis {
    p,
    span {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-left-first,
  .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-left-last,
  .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-right-first
    .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-right-last {
    overflow: visible;
  }
  .rc-table-cell {
    background: ${({ theme }) => theme.colors.white};
  }
  .rc-table-cell.rc-table-cell-row-hover {
    background: ${({ rowHoverBehavior }) =>
      rowHoverBehavior?.background ?? theme.colors['light-blue']};
    ${TableLink}, ${TableSpacer} {
      background: ${({ rowHoverBehavior }) =>
        rowHoverBehavior?.background ?? theme.colors['light-blue']};
    }
    cursor: ${({ rowHoverBehavior }) =>
      rowHoverBehavior?.cursor ? rowHoverBehavior.cursor : 'auto'};

    ${({ rowHoverBehavior }) => rowHoverBehavior?.injectedStyles ?? ''};
  }
  .rc-table-cell-no-hover .rc-table-cell.rc-table-cell-row-hover {
    background: unset;
    cursor: auto;
    & .overlay-expander-cell {
      &:before {
        background: unset;
      }
      &-button {
        display: none;
      }
    }
  }
  &.rc-table-ping-left {
    th.rc-table-cell-fix-left-last,
    td.rc-table-cell-fix-left-last {
      border-right-color: transparent;
    }
  }
  &.rc-table-ping-right {
    th.rc-table-cell-fix-right-first,
    td.rc-table-cell-fix-right-first {
      border-left-color: transparent;
    }
  }
  &.rc-table-ping-left .rc-table-cell-fix-left-first::after,
  &.rc-table-ping-left .rc-table-cell-fix-left-last::after {
    box-shadow: inset 4px 0 4px rgba(0, 0, 0, 0.04);
  }
  &.rc-table-ping-right .rc-table-cell-fix-right-first::after,
  &.rc-table-ping-right .rc-table-cell-fix-right-last::after {
    box-shadow: inset -4px 0 4px rgba(0, 0, 0, 0.04);
  }
  .rc-table-expand-icon-col {
    width: 0px;
  }
  .rc-table-row.selected .rc-table-cell {
    background: ${({ theme: { colors } }) => colors['light-blue']};
  }
  .rc-table-row-expand-icon-cell + .rc-table-cell {
    border-left: none;
  }
  &.rc-table thead td,
  &.rc-table thead th {
    text-align: left;
    background: #f1f6fa;
  }
  &.rc-table thead .rc-table-cell-scrollbar::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1px;
    width: 1px;
    background: #f1f6fa;
    content: '';
  }
  &.rc-table-rtl.rc-table thead .rc-table-cell-scrollbar::after {
    right: -1px;
    left: auto;
  }
  .sortable-header-cell {
    display: flex;
    align-items: center;
    cursor: default;

    &.sort-enabled {
      cursor: pointer;
    }
    
    .sort-icon {
      flex-shrink: 0;
    }

    &:hover .sort-icon path {
      fill: ${({ theme }) => theme.colors.blue};
    }
  }
  .rc-table-header {
    border: 1px solid #f1f6fa;
    border-right: 0;
    border-bottom: 0;
  }
  .rc-table-placeholder {
    text-align: center;
  }
  &.rc-table tbody .rc-table-cell-with-append {
    display: flex;
    align-items: center;
    padding: 16px 16px 16px 48px;
    height: 100%;
  }
  &.rc-table tbody tr {
    ${({ rowHoverBehavior }) => {
      return rowHoverBehavior?.asLink ? { height: '1px' } : {};
    }}
  &.rc-table tbody tr td,
  &.rc-table tbody tr th {
    background: ${({ theme }) => theme.colors.white};
  }
  &.rc-table tr:last-child td:first-child {
    border-bottom-left-radius: 4px;
  }
  &.rc-table tr:last-child td:last-child {
    border-bottom-right-radius: 4px;
  }
  .rc-table-content {
    border: 0;
    border-radius: 5px 0 0 0;
  }
  .rc-table-body {
    border: 1px solid ${({ theme }) => theme.colors['light-gray']};
    border-right: 0;
    border-bottom: 0;
    border-top: 0;
  }
  .rc-table-fixed-column .rc-table-body::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-right: 1px solid ${({ theme }) => theme.colors['light-gray']};
    content: '';
  }
  .rc-table-expanded-row .rc-table-cell {
    box-shadow: none;
  }
  .rc-table-expanded-row-fixed {
    box-sizing: border-box;
    margin: -16px -8px;
    margin-right: -10px;
    padding: 16px 16px;
  }
  .rc-table-expanded-row-fixed::after {
    position: absolute;
    top: 0;
    right: 1px;
    bottom: 0;
    width: 0;
    border-right: 1px solid ${({ theme }) => theme.colors['light-gray']};
    content: '';
  }
  .rc-table-row-expand-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    color: #aaa;
    line-height: 16px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid currentColor;
    cursor: pointer;
  }
  .rc-table-row-expand-icon.rc-table-row-expanded::after {
    content: '-';
  }
  .rc-table-row-expand-icon.rc-table-row-collapsed::after {
    content: '+';
  }
  .rc-table-row-expand-icon.rc-table-row-spaced {
    visibility: hidden;
  }
  .rc-table-title {
    padding: 16px 8px;
    border: 1px solid ${({ theme }) => theme.colors['light-gray']};
    border-bottom: 0;
  }
  .rc-table-footer {
    padding: 16px 8px;
    border: 1px solid ${({ theme }) => theme.colors['light-gray']};
    border-top: 0;
  }
  &.rc-table tfoot td {
    background: ${({ theme }) => theme.colors.white};
  }
  .rc-table-summary {
    border-top: 1px solid ${({ theme }) => theme.colors['light-gray']};
    border-left: 1px solid ${({ theme }) => theme.colors['light-gray']};
  }
  .rc-table-sticky-holder {
    position: sticky;
    z-index: 2;
  }
  .rc-table-sticky-scroll {
    position: sticky;
    bottom: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    border-top: 1px solid #f3f3f3;
    opacity: 0.6;
    transition: transform 0.1s ease-in 0s;
  }
  .rc-table-sticky-scroll:hover {
    transform: scaleY(1.2);
    transform-origin: center bottom;
  }
  .rc-table-sticky-scroll-bar {
    height: 8px;
    background-color: #bbb;
    border-radius: 4px;
  }
  .rc-table-sticky-scroll-bar:hover {
    background-color: #999;
  }
  .rc-table-sticky-scroll-bar-active {
    background-color: #999;
  }
` as unknown as typeof Table;
