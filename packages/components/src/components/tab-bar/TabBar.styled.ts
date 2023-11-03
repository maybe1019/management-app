import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { StyledTab } from './TabBar.types';

export const StyledTabBar = styled.div<StyledTab>`
  min-height: 48px;
  height: calc(100% - 40px);
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    [col-start] minmax(160px, 1fr) [col-end]
  );
  flex-wrap: wrap;
  padding-left: 40px;
  &.light_tabbar {
    background-color: ${({ theme }) => theme.colors['light-gray']};
  }

  &.dark_tabbar {
    background: ${({ theme }) => theme.colors.dark};
  }

  .light_tab {
    ${({ theme }) => ({
      color: theme.colors.dark,
      ...theme.typography['small-bold'],
    })}
  }

  .dark_tab {
    background: ${({ theme }) => theme.colors.dark};
    ${({ theme }) => ({
      color: theme.colors['medium-gray'],
      ...theme.typography['small-bold'],
    })};
  }
`;

export const Tab = styled(NavLink)<StyledTab>`
  padding-right: 32px;
  padding-left: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  flex-basis: 1;
  border-radius: 8px 8px 0px 0px;
  text-decoration: none;
  background: ${({ theme }) => theme.colors['medium-gray']};
  margin-left: 8px;
  &.active_light {
    ${({ theme }) => {
      return {
        background: `linear-gradient(
          to bottom,
          ${theme.colors.blue} 4px,
          ${theme.colors.white} 4px,
          ${theme.colors.white} 100%
        )`,
        color: theme.colors.blue,
      };
    }}
  }
  &.active_dark {
    border-radius: 8px 8px 0px 0px;
    ${({ theme }) => ({
      background: theme.colors['extra-dark'],
      color: theme.colors.white,
    })}
  }
`;

export const ActiveTabDenotation = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  margin-right: 8px;
  background: unset;
  &.isActive {
    background: ${({ theme }) => theme.colors.blue};
  }
`;

export const CountDenotation = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  &:before {
    content: ' ';
  }
`;
