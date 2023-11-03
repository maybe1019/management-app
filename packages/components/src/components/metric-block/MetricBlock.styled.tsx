import styled from 'styled-components';
import { InfoLight } from '@secberus/icons';
import { Text } from '../';

type ContainerProp = {
  minHeight?: string;
};

export const Container = styled.div<ContainerProp>`
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`};
  border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  padding: 0;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: clip;
`;

export const HeaderTextContainer = styled.div`
  padding: 16px 16px 13px;
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled(Text)`
  display: flex;
  align-items: center;
  grid-gap: 0 6px;
  ${({ theme }) => theme.typography['small-bold']};
  color: ${({ theme }) => theme.colors.gray};
`;

export const ColoredInfoIcon = styled(InfoLight)`
  circle,
  path {
    stroke: #6a6a88;
  }
`;
