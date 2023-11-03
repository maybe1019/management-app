import { FadeScroll } from '@secberus/components';
import styled from 'styled-components';

export const TestResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: 100%;
  height: 342px;
  box-shadow: inset 0px 2px 0px #606468;
  transition: transform 0.6s ease;
  overflow: auto;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
  & > table {
    padding: 16px 0px;
  }
`;

export const TestResultsHeader = styled.div`
  display: flex;
  align-items: center;
  background: #dfe7ef;
  height: 72px;
  padding: 24px;
  & > p {
    margin-right: 16px;
  }
  & > button {
    margin-left: auto;
  }
`;

export const TableContainer = styled.div`
  padding: 24px;
`;

export const ScrollableCell = styled(FadeScroll)`
  display: flex;
  overflow: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;
