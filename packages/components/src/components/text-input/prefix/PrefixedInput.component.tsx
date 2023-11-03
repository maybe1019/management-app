import React from 'react';
import { InputWrapper } from '../wrapper';
import { BasePrefixedInput } from '../base-prefix';
import { PrefixedInputProps } from './PrefixedInput.types';

export const PrefixedInput = React.forwardRef<
  HTMLInputElement,
  PrefixedInputProps
>((props, ref) => {
  const {
    backgroundColor,
    className,
    dark,
    disabled,
    disabledColor,
    error,
    label,
    light,
    name,
    noMargin,
    placeholderColor,
    textColor,
    tooltipInfo,
    ...inputProps
  } = props;
  return (
    <InputWrapper
      backgroundColor={backgroundColor}
      className={className}
      dark={dark}
      disabled={disabled}
      disabledColor={disabledColor}
      error={error}
      label={label}
      light={light}
      name={name}
      noMargin={noMargin}
      placeholderColor={placeholderColor}
      textColor={textColor}
      tooltipInfo={tooltipInfo}
    >
      <BasePrefixedInput
        ref={ref}
        name={name}
        disabled={disabled}
        {...inputProps}
      />
    </InputWrapper>
  );
});
