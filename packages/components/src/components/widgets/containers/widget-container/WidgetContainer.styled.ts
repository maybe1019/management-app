import styled from 'styled-components';

export const StyledWidgetContainer = styled.div`
  background: ${({ theme }) => theme.colors['light-gray']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 148px;
  padding: 16px;
  position: relative;
`;

export const WidgetHeader = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  ${({ theme }) => theme.typography['small-bold']};
  margin-bottom: 8px;
`;

export const WidgetTitle = styled.span`
  display: flex;
  align-items: center;
  svg {
    margin-left: 8px;
  }
`;
