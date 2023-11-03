/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px;
  padding-bottom: 16px;
  height: auto;
  flex-direction: row;
  align-items: center;
  h2 {
    ${({ theme }) => ({
      ...theme.typography.small,
      color: theme.colors.dark,
    })}
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 24px;
  }
`;
