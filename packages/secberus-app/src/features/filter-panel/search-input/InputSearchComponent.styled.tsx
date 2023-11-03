import styled from 'styled-components';
import { Input, Button } from '@secberus/components';

interface InputProps {
  borderRadius: string;
}

export const InputFilterWrapper = styled.form`
  display: flex;
  position: relative;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.button};
  &:focus-within {
    border-radius: 8px;
    outline: ${({ theme }) => `4px solid ${theme.colors['light-blue']}`};
    box-shadow: none;
  }
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.buttonHover};
  }

  & .validation {
    margin-bottom: 0;
  }
`;

export const SearchInput = styled(Input)<InputProps>`
  position: relative;
  border: none;
  width: 400px;
  outline: none;

  & div {
    & input {
      border-radius: ${({ borderRadius }) => borderRadius};
      padding-right: 48px;
    }
  }
`;

export const ButtonGroup = styled.div`
  position: relative;

  &.hidden {
    display: none;
  }
`;

export const CancelButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 0 16px 0 0;
  box-shadow: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  &.hidden {
    visibility: hidden;
  }

  & svg {
    height: 24px;
    width: 24px;
    transition: all 0.3s;

    stroke: ${({ theme }) => theme.colors.gray};
    & path {
      stroke: ${({ theme }) => theme.colors.gray};
    }
    & circle {
      stroke: ${({ theme }) => theme.colors.gray};
    }
  }

  & svg:active {
    cursor: pointer;
    stroke: ${({ theme }) => theme.colors['medium-gray']};
    & path {
      stroke: ${({ theme }) => theme.colors['medium-gray']};
    }
    & circle {
      stroke: ${({ theme }) => theme.colors['medium-gray']};
    }
  }

  & svg:hover {
    cursor: pointer;
    stroke: ${({ theme }) => theme.colors['medium-gray']};
    & path {
      stroke: ${({ theme }) => theme.colors['medium-gray']};
    }
    & circle {
      stroke: ${({ theme }) => theme.colors['medium-gray']};
    }
  }
`;

export const InputAction = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 8px 8px 0;
  padding: 8px;
  height: 40px;
  width: 40px;
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: none;
  cursor: pointer;

  & svg {
    height: 24px;
    width: 24px;
    margin-right: 0px;
  }

  &.hidden {
    display: none;
  }
`;
