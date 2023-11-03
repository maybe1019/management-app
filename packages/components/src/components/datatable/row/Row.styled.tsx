import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { StyledRowProps } from './Row.types';

export const StyledRow = styled.div<StyledRowProps>`
  border-bottom: 1px solid ${props => props.theme.colors['light-gray']};
  ${props =>
    props.alternatingRowColor &&
    css`
      background: ${props.index % 2 === 0
        ? props.theme.colors['light-gray']
        : 'unset'};
      transition: all 0.2s ease-in-out;
      &:hover {
        background: ${props.theme.colors['medium-gray']};
      }
      .react-fluid-table-header {
        background-color: ${props.theme.colors.white};
      }
    `}
  ${props =>
    props.fontWeight &&
    css`
      font-weight: ${props?.fontWeight ? props?.fontWeight : 400};
    `}
`;

export const DataTableColLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.dark};
  overflow: auto;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.dark};
  }
`;
