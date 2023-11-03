import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Truncated = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const DataTableColLink = styled(Link)`
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  overflow: hidden;
  color: ${props => props.theme.colors.dark};
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.dark};
  }
`;
