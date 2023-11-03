import styled from 'styled-components';
import { SubwidgetContainerMain } from './Subwidget.types';

export const SubwidgetContainer = styled.div<SubwidgetContainerMain>`
  margin-left: 16px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  background: ${({ theme }) => theme.colors['medium-gray']};
  ${({ theme }) => theme.typography['small-bold']}
`;
