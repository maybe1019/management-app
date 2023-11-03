import { isNumber } from 'lodash';
import styled from 'styled-components';
import { BaseTextAreaProps } from './BaseTextArea.types';

export const StyledBaseTextArea = styled.textarea<
  Pick<BaseTextAreaProps, 'resize' | 'height'>
>`
  resize: ${({ resize }) => resize};
  min-height: ${({ height }) =>
    (isNumber(height) ? `${height}px` : height) || '60px'};
`;
