import React from 'react';
import { match } from 'react-router-dom';
import { SidebarComponentProps } from './Sidebar.types';
import { SidebarContainer, SidebarTab } from './Sidebar.styled';

export const SidebarComponent: React.FC<SidebarComponentProps> = ({ tabs }) => {
  return (
    <SidebarContainer>
      {tabs.map(({ title, to }) => {
        const isActive = (_match: match, location: Location) => {
          if (typeof to === 'string') return location.pathname.includes(to);
          return false;
        };
        return (
          <SidebarTab
            key={`${title}_sidebar_tab`}
            to={to}
            isActive={isActive as any}
          >
            {title}
          </SidebarTab>
        );
      })}
    </SidebarContainer>
  );
};
