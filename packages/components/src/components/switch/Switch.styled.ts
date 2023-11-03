import styled from 'styled-components';

export const SliderContainer = styled.span`
  cursor: pointer;
  position: absolute;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  transition: all 0.2s ease;
  background-color: ${props => props.theme.colors.gray};
  padding: 3px;
`;

export const SliderBall = styled.span`
  position: relative;
  z-index: 10;
  border-radius: 50%;
  content: '';
  height: 18px;
  width: 18px;
  background: ${props => props.theme.colors.white};
  box-shadow: 0 4px 8px 0 rgba(30, 30, 50, 0.0256);
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &.loading {
    background: transparent;
  }

  &:not(.loading):hover {
    background: ${props => props.theme.colors['light-gray']};
  }
`;

export const InnerDash = styled.span`
  display: block;
  width: 2px;
  height: 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  background: ${props => props.theme.colors.blue};
  opacity: 0;
`;

export const Input = styled.input`
  &:checked + ${SliderContainer} {
    background: ${props => props.theme.colors.blue};

    ${SliderBall} {
      margin-left: calc(100% - 18px);

      &.loading {
        margin-left: calc(100% - 19px);
      }
    }

    ${InnerDash} {
      height: 10px;
      opacity: 1;
    }
  }
`;

export const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 45px;
  height: 24px;
  border-radius: 16px;
  background-color: white;
  & ${Input} {
    opacity: 0;
    height: 0;
    width: 0;
    &:disabled + span {
      opacity: 50%;
      cursor: not-allowed;
    }
  }
  &.loading {
    pointer-events: none;
    cursor: not-allowed;
  }
`;
