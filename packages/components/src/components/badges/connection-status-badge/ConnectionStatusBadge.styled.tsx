import styled from 'styled-components';
import { CheckMark, Error, Minus, Violation } from '@secberus/icons';
import { IconContainerProps } from './ConnectionStatusBadge.types';

export const SuccessIcon = styled(CheckMark)`
  & path,
  circle {
    stroke: ${({ theme: { colors } }) => colors['green']};
  }
`;

export const PartialIcon = styled(Violation)`
  & path,
  circle {
    stroke: ${({ theme: { colors } }) => colors['orange']};
  }
`;

export const FailureIcon = styled(Error)`
  & path {
    stroke: ${({ theme: { colors } }) => colors['red']};
  }
`;

export const NullIcon = styled(Minus)`
  & path {
    stroke: ${({ theme: { colors } }) => colors['gray']};
  }
`;

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background-color: ${({ theme: { colors }, type }) =>
    type === 'success'
      ? colors['light-green']
      : type === 'failure' || type === 'partial'
      ? colors['light-orange']
      : colors['light-gray']};
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
