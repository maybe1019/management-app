import styled from 'styled-components';

export const StyledBadge = styled.div`
  max-height: 32px;
  border-radius: 4px;
  width: fit-content;
  display: flex;
  align-items: center;
  min-width: 70px;
  box-sizing: border-box;
  flex-wrap: nowrap;
  justify-content: center;
  background: transparent;
  & > svg {
    margin-right: 6px;
  }
`;
