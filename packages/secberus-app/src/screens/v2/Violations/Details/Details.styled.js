import { BaseBadge, Button } from '@secberus/components';
import styled from 'styled-components';

export const ExpandWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 15px;
  z-index: 100;
  display: flex;
  left: 0;
  justify-content: center;
`;

export const Expand = styled(Button)`
  &&& {
    background: ${props => props.theme.colors['medium-gray']};
    ${props => props.theme.typography['small-bold']};
    height: 32px;
    color: ${props => props.theme.colors.dark};
    &:hover {
      color: ${props => props.theme.colors.dark};
      background: ${props => props.theme.colors['light-gray']};
    }
  }
`;

export const JSONBlock = styled(BaseBadge)`
  align-items: unset;
  overflow: auto;
  min-height: fit-content;
  max-height: ${props => (props.expanded ? '100%' : '200px')};
  width: 100%;
  position: relative;
  text-align: left;
  padding: 8px;
  padding-right: 32px;
  padding-bottom: ${props => props.expanded && '48px'};
  min-width: 300px;
  * {
    font-style: normal;
  }
  li {
    white-space: normal;
  }
`;

export const PageHeader = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr auto;
  padding: 16px 40px 40px 40px;
  background: #dfe7ef;
  width: 100%;
  gap: 24px;
  grid-area: 1 / 1 / 2 / 3;
`;

export const FlexContainer = styled.div`
  display: flex;
  grid-column: 1/3;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  

  & .summary-item-label {
    margin-bottom: 8px;
  }
  & .active-violation {
    & path,
    circle {
      stroke: ${({ theme }) => theme.colors.red}};
    }
  }
  & [class*='FlexContainer'] {
    max-width: 700px;
    flex-wrap: wrap;
  }
`;
export const PayloadItem = styled(SummaryItem)`
  margin-right: 0px;
  width: 100%;
`;

export const FadeBottom = styled.div`
  position: absolute;
  bottom: 0px;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(241, 246, 250, 0) 0%, #f1f6fa 100%);
  left: 0;
  border-radius: 16px;
`;
