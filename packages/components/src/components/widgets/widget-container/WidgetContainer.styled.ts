import styled from 'styled-components';

export const StyledWidgetContainer = styled.div`
  background: ${({ theme }) => theme.colors['light-gray']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  min-width: 148px;
  padding: 16px;
  position: relative;
  height: 100%;
`;

export const WidgetTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  ${({ theme }) => theme.typography['small-bold']};
  margin-bottom: 16px;
  padding-right: 16px;
`;
