import React from 'react';
import { BaseStyledInput } from './BaseInput.styled';
import { BaseInputProps } from './BaseInput.types';

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, borderRadius, ...rest }, ref) => {
    return (
      <BaseStyledInput
        className={className}
        ref={ref}
        borderRadius={borderRadius}
        {...rest}
      />
    );
  }
);
