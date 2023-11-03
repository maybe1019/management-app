import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ToggleButtonContainer = styled.div`
  display: flex;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(30, 30, 50, 0.16);
  min-width: 50px;
  width: fit-content;
  height: 36px;
  position: relative;
  & > .toggleOption:first-of-type,
  a:first-of-type {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  & > .toggleOption:last-of-type,
  a:last-of-type {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-right: unset;
  }
  & input {
    display: none;
    opacity: 0;
  }
`;

export const StyledButton = styled.div`
  display: flex;
  align-items: center;
  background: transparent;
  position: relative;
  color: ${({ theme }) => theme.colors.dark};
  ${({ theme }) => theme.typography['small-bold']}
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s;
  border-right: ${({ theme }) => `1px solid ${theme.colors.dark}`};
  & svg {
    margin-right: 6px;
  }
  &.isActive {
    background: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.white};
    & path {
      fill: ${({ theme }) => theme.colors.white};
      stroke: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const ToggleLink = styled(Link)`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.dark};
  ${({ theme }) => theme.typography['small-bold']}
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s;
  border-right: ${({ theme }) => `1px solid ${theme.colors.dark}`};
  & svg {
    margin-right: 6px;
  }
  &.isActive {
    background: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.white};
    & path {
      fill: ${({ theme }) => theme.colors.white};
      stroke: ${({ theme }) => theme.colors.white};
    }
  }
`;
