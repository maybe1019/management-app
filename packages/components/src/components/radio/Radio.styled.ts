import styled from 'styled-components';

export const StyledRadioButton = styled.div`
  display: flex;
  min-height: 24px;
  align-items: flex-start;
  &:focus {
    outline: none;
  }
  &:hover {
    & input {
      border: ${({ theme }) => `2px solid ${theme.colors.dark}`};
    }

    &.dark {
      & input {
        border: ${({ theme }) => `2px solid ${theme.colors.gray}`};
      }
    }
  }
  &.disabled {
    pointer-events: none;
    & input {
      border: ${({ theme }) => `2px solid ${theme.colors['medium-gray']}`};
    }
    & label {
      color: ${({ theme }) => theme.colors['medium-gray']};
    }
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  ${({ theme }) => theme.typography['small-bold']};
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;
  transition: color 0.3s;
  && {
    margin-bottom: 0px;
  }

  &.dark {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Subtext = styled(Label)`
  ${({ theme }) => theme.typography['xsmall-regular']};
`;

export const StyledRadio = styled.input`
  margin-top: 2px;
  margin-right: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  width: 20px;
  min-width: 20px;
  height: 20px;
  outline: none;
  cursor: pointer;
  padding: 2px;
  transition: border 0.3s;
  background-clip: content-box;
  border: ${({ theme }) => `2px solid ${theme.colors.gray}`};
  border-radius: 50%;
  &:checked {
    padding: 2px;
    transition: border 0s;
    &.disabled {
      && {
        border: ${({ theme }) => `6px solid ${theme.colors['medium-gray']}`};
      }
    }
    && {
      border: ${({ theme }) => `6px solid ${theme.colors.dark}`};
      &.dark {
        border: ${({ theme }) => `6px solid ${theme.colors.white}`};
      }
    }
    background-color: ${({ theme }) => theme.colors.white};
    &.dark {
      background-color: ${({ theme }) => theme.colors.dark};
    }
  }

  &.dark {
    border: ${({ theme }) => `2px solid ${theme.colors.white}`};
  }
`;
