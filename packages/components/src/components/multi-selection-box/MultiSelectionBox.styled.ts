import styled from 'styled-components';
import { styledOnHoverScrollbar } from '../../css';

export const ScrollBox = styled.div`
  ${styledOnHoverScrollbar()};
  overflow: auto;
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
  height: 100%;
  padding: 8px;
`;

export const MultiSelectionBoxContainer = styled.div`
  background: ${({ theme }) =>
    theme.colors[
      'medium-gray'
    ]}; //make sure default scrollbar thumb color changes with this value!
  border-radius: 32px;
  padding: 16px;
  width: 348px;
  width: 100%;
  /* height: fit-content; */
  box-sizing: border-box;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  padding: 16px;
  ${({ theme }) => theme.typography['small-bold']}
`;

export const ViewSection = styled(FilterSection)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

// Filter Group Styles
export const StyledFilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  & .tooltipInfo {
    margin-left: 8px;
  }
`;

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${({ theme }) => theme.typography['small-bold']}
  color: ${({ theme }) => theme.colors.dark};
  & .chevron {
    margin-right: 4px;
    transition: transform 0.3s ease-out;
    transform-origin: center;
    &.rotate {
      transform: rotate(-90deg);
    }
  }
`;

export const ClearButton = styled.div`
  margin-left: auto;
  cursor: pointer;
`;

interface FilterStyleProps {
  expanded: boolean;
  maxHeight: string;
  minHeight?: string;
}

export const FilterGroupOptions = styled.div<FilterStyleProps>`
  display: flex;
  flex-direction: column;
  margin-top: ${({ expanded }) => (expanded ? '12px' : 0)};
  overflow: hidden;
  height: fit-content;
  position: relative;
  max-height: ${({ expanded, maxHeight }) => (expanded ? maxHeight : 0)};
  margin-left: 2px;
  & .filterComponentWrapper {
    ${({ minHeight }) => (minHeight ? `min-height: ${minHeight}` : '')};
    & > div {
      margin-bottom: 6px;
    }
    & .BaseFilter__icon {
      margin-right: 4px;
    }
    & .ResourceFilter__resourcesLabel {
      margin-left: 4px;
    }
  }
`;

export const StyledSeverityFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
`;
