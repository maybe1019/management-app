import styled, { keyframes } from 'styled-components';

export const SearchDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60px;
  height: fit-content;
  width: 100%;
  position: relative;
  & .error {
    margin-left: 24px;
  }
  & .SearchDropdown__label {
    margin-left: 20px;
    margin-bottom: 6px;
  }
  &.dark {
    & input {
      color: ${({ theme }) => theme.colors.white};
      background: ${({ theme }) => theme.colors['dark-gray']};
    }
  }
  &.disabled {
    pointer-events: none;
    & p {
      color: ${({ theme }) => theme.colors['medium-gray']};
    }
    & input {
      &::placeholder {
        color: ${({ theme }) => theme.colors['medium-gray']};
      }
    }
  }
`;

export const Input = styled.input`
  ${({ theme }) => theme.typography['small-bold']};
  background: ${({ theme }) => theme.colors['light-gray']};
  border: 1px solid transparent;
  outline: none;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.dark};
  transition: box-shadow 0.2s;
  padding: 11px 24px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 24px;
  width: 100%;
  transition: border 0.3s;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  }
  &:focus {
    border: ${({ theme }) => `1px solid ${theme.colors.blue}`};
  }
`;

const growDown = keyframes`
  0% {
      transform: scaleY(0)
  }
  80% {
      transform: scaleY(1.1)
  }
  100% {
      transform: scaleY(1)
  }
`;

export const List = styled.ul`
  position: absolute;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  left: 0px;
  z-index: 200;
  background: white;
  list-style: none;
  width: 100%;
  margin-block-start: 0em;
  padding-inline-start: 0em;
  max-height: 260px;
  animation: ${growDown} 0.2s ease-in-out;
  overflow: auto;
  transform-origin: top center;
`;

export const ListItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  padding: 12px 16px;
  &:hover {
    background: ${({ theme }) => theme.colors['light-gray']};
  }
  &:active {
    background: ${({ theme }) => theme.colors['medium-gray']};
  }
`;

export const ActionListItem = styled(ListItem)`
  position: sticky;
  bottom: 0;
  background: white;
  box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.08);
  border-bottom: unset;
`;

export const Option = styled.p`
  color: ${({ theme }) => theme.colors.dark};
  ${({ theme }) => theme.typography['small-bold']};
  margin-block-start: 0em;
  margin-block-end: 0em;
`;

export const ActionOption = styled(Option)`
  color: ${({ theme }) => theme.colors['dark-gray']};
  padding-left: 8px;
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    height: 24px;
    width: 24px;
    & path {
      stroke: ${({ theme }) => theme.colors['dark-gray']};
    }
  }
`;
