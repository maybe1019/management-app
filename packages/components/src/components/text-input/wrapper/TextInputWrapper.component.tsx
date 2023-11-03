import React from 'react';
import classNames from 'classnames';
import { InfoLight } from '@secberus/icons';
import ReactTooltip from 'react-tooltip';
import { Validation } from '../../index';
import { StyledTextColorSelector } from '../../text/Text.styled';
import {
  LabelContainer,
  StyledInputContainer,
} from './TextInputWrapper.styled';
import { InputWrapperProps } from './TextInputWrapper.types';

export const InputWrapper: React.FC<InputWrapperProps> = ({
  name,
  disabled,
  label,
  className,
  error,
  dark,
  light,
  tooltipInfo,
  noMargin,
  textColor,
  backgroundColor,
  disabledColor,
  placeholderColor,
  children,
  justIcon,
  helperText,
}) => {
  return (
    <StyledInputContainer
      className={classNames({ disabled, dark, light }, className)}
      backgroundColor={backgroundColor}
      placeholderColor={placeholderColor}
      textColor={textColor}
      disabledColor={disabledColor}
    >
      <Validation
        error={error}
        label={label}
        noMargin={noMargin}
        helperText={helperText}
      >
        {label && (
          <LabelContainer>
            <StyledTextColorSelector
              className="TextInput__label"
              type="xsmall-bold"
              color={textColor}
              as="label"
              light={light}
              dark={dark}
            >
              {label}
            </StyledTextColorSelector>
            {!!tooltipInfo && (
              <>
                <InfoLight
                  height={18}
                  width={18}
                  data-tip={tooltipInfo}
                  data-for={name}
                />
                {!justIcon && <ReactTooltip id={name} />}
              </>
            )}
          </LabelContainer>
        )}
        {children}
      </Validation>
    </StyledInputContainer>
  );
};
