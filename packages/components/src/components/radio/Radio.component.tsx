import React from 'react';
import classNames from 'classnames';
import { v4 } from 'uuid';
import {
  StyledRadioButton,
  Label,
  StyledRadio,
  Subtext,
  LabelContainer,
} from './Radio.styled';
import { RadioProps } from './Radio.types';

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      id,
      name,
      label,
      value,
      onChange,
      checked,
      className,
      disabled,
      defaultChecked,
      dark,
      subtext,
    },
    ref
  ) => {
    const generatedId = React.useMemo(
      () => `${v4()}-${id || value}`,
      [id, value]
    );
    return (
      <StyledRadioButton
        key={value}
        tabIndex={0}
        className={classNames(className, { disabled, dark })}
      >
        <StyledRadio
          ref={ref}
          type="radio"
          name={name}
          className={classNames({ disabled, dark })}
          tabIndex={-1}
          onChange={onChange}
          id={generatedId}
          checked={checked}
          defaultChecked={defaultChecked}
          value={value}
        />
        <LabelContainer>
          <Label htmlFor={generatedId} className={classNames({ dark })}>
            {label}
          </Label>
          <Subtext htmlFor={generatedId} className={classNames({ dark })}>
            {subtext}
          </Subtext>
        </LabelContainer>
      </StyledRadioButton>
    );
  }
);
