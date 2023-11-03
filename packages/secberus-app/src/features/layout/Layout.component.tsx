import { Box } from '@chakra-ui/react';
import React from 'react';
import { LoadingOverlay } from '@secberus/components';
import styled from 'styled-components';
import { useTypedSelector } from '../../store';
import { SideNavBar } from '../app-nav/SideNavBar';

const LayoutGrid = styled(Box)`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: min-content 1fr;
  grid-template-areas: 'side-area main-area';
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

const LayoutSideContent = styled(Box)`
  grid-area: side-area;
  height: 100%;
  // Using preventScroll helps maintain organization select z-index while select
  // is expanded. It is also applied to the Naviation component
  overflow-y: ${props => (props.preventScroll ? 'unset' : 'auto')};
`;

const LayoutMainContent = styled(Box)`
  grid-area: main-area;
  position: relative;
  height: inherit;
  overflow-y: ${props => (props.preventScroll ? 'unset' : 'auto')};
`;

export const LayoutComponent: React.FC = ({ children }) => {
  const { navigation, sideNavOrgSelectList } = useTypedSelector(
    state => state.layout.visible
  );
  const isHardLoading = useTypedSelector(
    (state: any) => state.ui.isHardLoading
  );

  return (
    <LayoutGrid w="100%" h="100%">
      <LayoutSideContent
        preventScroll={sideNavOrgSelectList}
        className="layout-side-content"
      >
        {navigation && <SideNavBar />}
      </LayoutSideContent>
      <LayoutMainContent
        preventScroll={!navigation}
        className="layout-main-content"
      >
        {!isHardLoading ? children : <LoadingOverlay view="screen" />}
      </LayoutMainContent>
    </LayoutGrid>
  );
};
