import React from 'react';
import { WithIcon, InputWrapper } from '../wrapper';
import { BaseInput } from '../base';
import { InputProps } from './TextInput.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
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
      icon,
      iconPlacement = 'left',
      justIcon = false,
      helperText,
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
        justIcon={justIcon}
        helperText={helperText}
      >
        <WithIcon placement={icon ? iconPlacement : undefined}>
          {icon && React.cloneElement(icon, { className: 'input-icon' })}
          <BaseInput
            ref={ref}
            name={name}
            disabled={disabled}
            {...inputProps}
          />
        </WithIcon>
      </InputWrapper>
    );
  }
);
