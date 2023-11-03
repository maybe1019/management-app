import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const SidebarContainer = styled.div`
  border-radius: 32px;
  padding: 32px;
  background: ${({ theme }) => theme.colors['light-gray']};
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style-type: none;
  height: fit-content;
  overflow-y: auto;
`;

export const SidebarTab = styled(NavLink)`
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.dark};
  ${({ theme }) => theme.typography.bold};
  font-weight: bold;
  &.active {
    color: ${({ theme }) => theme.colors.gray};
  }
`;
