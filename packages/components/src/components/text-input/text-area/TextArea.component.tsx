import React from 'react';
import { InputWrapper } from '../wrapper';
import { BaseTextArea } from '../base-area';
import { TextAreaProps } from './TextArea.types';

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
        helperText={helperText}
      >
        <BaseTextArea
          ref={ref}
          name={name}
          disabled={disabled}
          {...inputProps}
        />
      </InputWrapper>
    );
  }
);
