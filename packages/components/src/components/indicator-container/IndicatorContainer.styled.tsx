import styled from 'styled-components';
import { Text } from '../..';

type ContainerProp = {
  minHeight?: string;
};

export const Container = styled.div<ContainerProp>`
  ${({ minHeight }) => minHeight && `min-height: ${minHeight}`};
  border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  padding: 16px;
  border-radius: 8px;
`;

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
`;

export const HeaderText = styled(Text)`
  ${({ theme }) => theme.typography['small-bold']}
`;
