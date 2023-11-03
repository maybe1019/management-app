import { NavLinkProps } from 'react-router-dom';

export interface SidebarComponentProps {
  tabs: SidebarTabs[];
  active?: string;
}

export interface SidebarTabs extends NavLinkProps {
  title: string;
}
