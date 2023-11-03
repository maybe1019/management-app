import styled from 'styled-components';

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
  background: transparent;
  width: fit-content;
  ${({ theme }) => theme.typography['small-bold']};
  & path {
    stroke: ${({ theme }) => theme.colors.gray};
  }
`;
