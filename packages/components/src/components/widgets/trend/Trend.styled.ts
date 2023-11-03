import styled from 'styled-components';
import { WidgetContainer } from '../widget-container/WidgetContainer.component';

export const StyledDenote = styled.p`
  ${({ theme }) => theme.typography.caption}
  color: ${({ theme }) => theme.colors.gray};
  padding-right: 16px;
  transform: translateY(-8px);
`;

export const TrendWidgetContainer = styled(WidgetContainer)`
  overflow: hidden;
  padding: 0px;
  .flex-widget {
    padding-left: 0;
    padding-right: 0;
  }
  span {
    margin-bottom: 0;
  }
`;
