import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  &.small .policy-badge {
    height: 32px;
    width: 32px;
  }
`;
