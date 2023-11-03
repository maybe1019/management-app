import styled from 'styled-components';
import { TimesLight } from '@secberus/icons';
import { Tabbar2Props } from './TabBar.types';

export const StyledTimesLight = styled(TimesLight)`
  path {
    stroke: ${({ theme }) => theme.colors['dark']};
  }
`;

// eslint-disable-next-line
export const StyledTabBar = styled.div<Pick<Tabbar2Props, 'closeable' | 'noMargin' | 'tabWidth' | 'useCarousel'>>`
  min-height: 48px;
  height: calc(100% - 40px);
  // Set widths or grid for tabs based upon tabWidth
  ${({ tabWidth, closeable, useCarousel }) => {
    if (useCarousel) {
      return {
        display: 'flex',
        maxWidth: '100%',
      };
    }
    if (!tabWidth) {
      return {
        display: 'grid',
        gridGap: '8px',
        gridTemplateColumns: `repeat(
          auto-fill,
          [col-start]
            minmax(${closeable ? '168px' : '160px'}, 1fr)
            [col-end]
        )`,
      };
    }
    return {
      display: 'block',
      maxWidth: '100%',
      overflowX: 'auto',
    };
  }}
  flex-wrap: wrap;
  padding-left: ${({ noMargin }) => (noMargin ? '0px' : '40px')};
  &.tabbar-container {
    ${({ tabWidth, useCarousel }) => {
      if (useCarousel) {
        return {
          display: 'flex',
        };
      }
      return tabWidth
        ? {
            display: 'flex',
            gap: '8px',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            overflowX: 'auto',
          }
        : {};
    }}
  }
  &.light_tabbar {
    background-color: ${({ theme }) => theme.colors['light-gray']};
    .close-tab {
      transition: background 0.3s;
      &:hover {
        background: ${({ theme }) => theme.colors['white']};
      }
    }
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

export const Tab = styled.div<Pick<Tabbar2Props, 'closeable' | 'tabWidth'>>`
  ${({ closeable }) =>
    closeable
      ? {
          paddingRight: '16px',
          paddingLeft: '16px',
        }
      : {
          paddingRight: '32px',
          paddingLeft: '32px',
        }};
  ${({ tabWidth }) =>
    tabWidth
      ? {
          width: `${tabWidth}px`,
          minWidth: `${tabWidth}px`,
        }
      : {}}
  .tab-title {
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    ${({ theme }) => theme.typography['small-bold']};
  }
  padding-right: ${({ closeable }) => (closeable ? '16px' : '32px')};
  padding-left: ${({ closeable }) => (closeable ? '16px' : '32px')};
  display: flex;
  justify-content: ${({ closeable }) =>
    closeable ? 'space-between' : 'space-around'};
  align-items: center;
  cursor: pointer;
  flex-basis: 1;
  border-radius: 8px 8px 0px 0px;
  text-decoration: none;
  background: ${({ theme }) => theme.colors['medium-gray']};
  ${({ closeable }) =>
    closeable
      ? {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }
      : {}}
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
    .close-tab {
      transition: background 0.3s;
      &:hover {
        background: ${({ theme }) => theme.colors['medium-gray']};
      }
    }
  }
  &.active_dark {
    border-radius: 8px 8px 0px 0px;
    ${({ theme }) => ({
      background: theme.colors['extra-dark'],
      color: theme.colors.white,
    })};
  }
`;

export const CustomIconTab = styled.div`
  position: relative;
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: ${({ theme }) => theme.colors['medium-gray']};
  }
  .icon {
    flex-shrink: 0;
  }
`;
