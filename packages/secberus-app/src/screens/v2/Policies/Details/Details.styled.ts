import styled from 'styled-components/macro';
import { FadeScroll } from '@secberus/components';

export const PolicyDetailsWrapper = styled.div``;

export const PageHeader = styled.div`
  display: grid;
  grid-area: head;
  grid-template-rows: auto;
  grid-template-columns: 1fr auto;
  padding: 16px 40px 40px 40px;
  background: #dfe7ef;
  width: 100%;
  gap: 24px;
  & .navigation {
    display: flex;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  grid-area: 2 / 2 / 3 /3;
  justify-content: flex-end;
  gap: 8px;
`;

export const ScrollableCell = styled(FadeScroll)`
  display: flex;
  overflow: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
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
  margin-right: 40px;
  gap: 8px;
  & [class*='FlexContainer'] {
    max-width: 700px;
    flex-wrap: wrap;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: main;
  padding: 24px 16px 16px 0;
`;

export const TableSummary = styled.div`
  background: #f1f6fa;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 4px;
  & .violations-total-count {
    margin-left: auto;
  }
`;

export const DataTextWrapper = styled.div`
  padding-bottom: 24px;
  max-width: 70%;
`;

export const DataProviderWrapper = styled.div`
  padding: 40px;
  gap: 40px;
  display: flex;

  & .textWrapper {
    max-width: 868px;
    margin-left: 50px;
  }

  & .buttonWrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 250px;
    align-items: center;
    & > button {
      width: 100%;
      justify-content: center;
      margin-bottom: 16px;
    }
  }
`;

export const RemediationWrapper = styled.div`
  white-space: pre-line;
  display: flex;
  grid-area: main;
  flex-direction: column;
  padding: 40px;
  & p.small {
    margin-bottom: 24px;
  }
`;

export const LogicWrapper = styled.div`
  grid-area: main;
  grid-column: 1/3;
  overflow: hidden;
  ${props => props.theme.typography.code};
`;

export const DataProviderColumn = styled.div`
  display: flex;
  flex-direction: column;

  & > p {
    display: flex;
    margin-bottom: 24px;
  }
`;

export const ActivityLogWrapper = styled.div`
  display: grid;
  padding: 24px;
  gap: 40px;
  grid-template-columns: auto minmax(700px, 1fr);
  grid-column: 1/-1;
`;
