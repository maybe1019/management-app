import styled from 'styled-components';

export const SubTableHeaderContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 15% 55% 7.5% 15% 7.5%;
  padding-top: 12px;
  padding-bottom: 12px;
  &.titles {
    border-bottom: 1px solid ${({ theme }) => theme.colors['light-gray']};
  }
  align-items: center;
`;

export const SubTableTableContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const SubTableHeader = styled.div`
  height: 100%;
  width: 100%;
  white-space: nowrap;
  height: ${props => (props.passing ? '100%' : 'auto')};
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 40px;
`;

export const SubTableWrapper = styled.div`
  padding: 24px;

  & .table-header {
    height: 32px;
    border-bottom: 1px solid #f1f6fa;
    & .table-col-header {
      padding: 4px 8px;
    }
    * {
      ${({ theme }) => theme.typography.caption};
      color: ${({ theme }) => theme.colors.gray};
    }
  }
`;

export const PassingCount = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
  margin-top: 12px;
`;

export const BasicCell = styled.div`
  display: flex;
  align-items: center;
  &.centered {
    justify-content: center;
  }
  &.leftAlign {
    justify-content: flex-start;
  }
`;
