import styled from 'styled-components';
import {
  TopContentContainer,
  FilterHeader,
} from '../filter-panel/FilterPanel.styled';
import { FilterGroup } from '../filter-panel/FilterGroup.component';

export const SidebarPanelContentHeader = styled(TopContentContainer)`
  width: auto;
  h2 {
    padding: 0px;
  }
`;

export const SidebarHeader = styled(FilterHeader)`
  padding: 20px 0px;
`;

export const SidebarGroup = styled(FilterGroup)`
  &.filter-group {
    padding-top: 16px;
    padding-bottom: 16px;
  }
`;
