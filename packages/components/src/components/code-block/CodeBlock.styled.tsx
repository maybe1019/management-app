import styled from 'styled-components';

export const HorizontalRule = styled.hr`
  border: none;
  border-top: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  margin: 12px 0px;
  color: ${({ theme }) => theme.colors['medium-gray']};
  text-align: center;
`;

interface ContainerProps {
  expanded: boolean;
}

export const CodeBlockContainer = styled.div<ContainerProps>`
  padding: 24px 30px;
  padding-bottom: ${({ expanded }) => (expanded ? '40px' : '30px')};
  max-height: ${({ expanded }) => (expanded ? '100%' : '200px')};
  overflow: hidden;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors['light-gray']};
  position: relative;
`;
