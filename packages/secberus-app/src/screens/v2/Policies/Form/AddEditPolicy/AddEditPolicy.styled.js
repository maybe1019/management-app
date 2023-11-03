import styled from 'styled-components';
import { NestedListItemLabel, WithNesting } from '../../../../../components';

export const PageHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto;
  gap: 24px;
  background: #1e1e32;
  padding: 40px;
  padding-bottom: 0;
  position: relative;
  & > p {
    grid-column: 1/3;
  }
  & .addEditPolicy__close {
    grid-column: 3/4;
    margin-left: auto;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  & > button {
    margin-right: 16px;
  }
`;

export const ErrorNotification = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors['dark-red']};
  grid-column: 1/-1;
  border-radius: 14px;
  width: fit-content;
  padding: 10px;
`;

// Compliance Modal

export const ComplianceModalForm = styled.form`
  display: grid;
  width: 800px;
  grid-template-rows: 50px 1fr 60px;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 600px;
  margin-top: 8px;
  overflow: auto;
  grid-area: 2 / 1 / 3 / 3;
`;

export const RequirementRow = styled(WithNesting)`
  background: ${({ theme, depth, checked }) => {
    if (depth && checked) return theme.colors['light-gray'];
    return 'unset';
  }};
  padding: 8px 24px;
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const CellData = styled(NestedListItemLabel)`
  color: ${({ theme, depth }) =>
    depth ? theme.colors.dark : theme.colors['dark-gray']};
`;

export const ComplianceOption = styled(FlexContainer)`
  display: flex;
  align-items: center;
  font-family: 'Eina 01', sans-serif;
  font-weight: bold;
  padding: 4px 0px;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  grid-area: 3 / 1 / 4 / 3;
`;
