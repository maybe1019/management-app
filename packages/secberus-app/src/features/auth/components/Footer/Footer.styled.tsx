import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  padding-bottom: 16px;
  z-index: 1000;
`;

export const FooterLink = styled.a`
  ${({ theme }) => theme.typography['small-bold']};
  color: ${({ theme }) => theme.colors.gray};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.dark};
  }
`;
