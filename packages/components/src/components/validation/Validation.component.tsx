import React from 'react';
import classNames from 'classnames';
import { StyledValidation, ValidationSubText } from './Validation.styled';
import { ValidationHandlerProps } from './Validation.types';

export const Validation: React.FC<ValidationHandlerProps> = ({
  label,
  children,
  error,
  className,
  noMargin,
  helperText,
}) => {
  return (
    <StyledValidation
      errorVisible={typeof error !== 'undefined'}
      noMargin={noMargin}
      className={classNames(className, 'validation', { error })}
    >
      {children}
      {error && (
        <ValidationSubText className="info error" type="caption" color="red">
          {(Array.isArray(error)
            ? error.filter(v => v)[0]?.message
            : error?.message) || `${label || 'This'} is required.`}
        </ValidationSubText>
      )}
      {!error && helperText && (
        <ValidationSubText className="info" type="caption" color="gray">
          {helperText}
        </ValidationSubText>
      )}
    </StyledValidation>
  );
};
