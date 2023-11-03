import React from 'react';
type Render =
  | string
  | React.ElementType
  | React.ReactNode
  | JSX.Element
  | Element;
/*
 TODO @sigkar 05/09/2023 - when all tab bars are updated to TabBar2, delete
 TabBar and any types associated with it
*/

/**
 * @deprecated
 */
export interface StyledTab {
  mode?: 'dark' | 'light';
}

/**
 * @deprecated
 */
export interface SubkeyTab {
  title: string;
  component?: string | React.FunctionComponent<unknown> | Element | JSX.Element;
  count?: number | string | JSX.Element | React.FunctionComponent<unknown>;
  path: string;
  route: string;
  show?: boolean;
}

/**
 * @deprecated
 */
export interface Tabs {
  [key: string]: SubkeyTab;
}

/**
 * @deprecated
 */
export interface TabBarProps {
  defaultTab: string;
  tabs: Tabs;
  mode?: 'dark' | 'light';
  className?: string;
  hasChildren?: boolean;
}

/**
 * @author Duncan Pierce <sigkar>
 */
export type Tabs2 = {
  [key: string]: TabContent;
};

/**
 * @param closeable boolean - allows you to granularly set closeable status.
 * If you do not set a value here, it defaults to the global closeable status.
 */
export type TabContent = {
  title: string;
  render: Render;
  closeable?: boolean;
  onClick?: (activeTab: keyof Tabs2) => unknown;
  className?: string;
};

/**
 * @param closeable default ALL tabs as closeable. does not override
 * granularly set closeable status on a per-tab basis
 * @param tabWidth if you set this, the tab bar will scroll instead of set
 * into a grid like usual.
 */
export type Tabbar2Props = {
  defaultTabKey?: string;
  tabs: Tabs2;
  mode?: 'dark' | 'light'; //todo: expose background/border colors
  defaultRender: Render;
  customTabs?: Array<Render>;
  closeable?: boolean;
  onTabClick?: (key: string) => void;
  onTabClose?: (arg0: string) => unknown;
  detachedTabBarContent?: boolean;
  noMargin?: boolean;
  tabWidth?: number;
  useCarousel?: boolean;
};
