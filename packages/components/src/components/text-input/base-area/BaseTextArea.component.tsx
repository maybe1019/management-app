import React from 'react';
import { BaseStyledInput } from '../base/BaseInput.styled';
import { StyledBaseTextArea } from './BaseTextArea.styled';
import { BaseTextAreaProps } from './BaseTextArea.types';

export const BaseTextArea = React.forwardRef<
  HTMLTextAreaElement,
  BaseTextAreaProps
>(({ className, resize = 'none', ...rest }, ref) => {
  return (
    <BaseStyledInput
      as={StyledBaseTextArea}
      className={className}
      resize={resize}
      ref={ref}
      {...rest}
    />
  );
});
