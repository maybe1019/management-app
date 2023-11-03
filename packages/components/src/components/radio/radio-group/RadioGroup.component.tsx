import React from 'react';
import { InfoLight } from '@secberus/icons';
import { Text, Validation } from '../..';
import { Tooltip } from '../../tooltip/Tooltip.component';
import { Radio } from '..';
import { RadioProps } from '../Radio.types';
import { StyledRadioGroup, LabelContainer } from './RadioGroup.styled';

export interface RadioGroupProps {
  options?: RadioProps[];
  name: string;
  label?: string;
  tooltip?: string;
  error?: { message: string };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  direction?: 'column' | 'row';
}
export const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      error,
      options,
      label = '',
      name,
      tooltip,
      onChange,
      disabled,
      direction = 'column',
    },
    ref
  ) => {
    return (
      <StyledRadioGroup className="radio-group" direction={direction}>
        {label && (
          <LabelContainer>
            <Text type="small-bold">{label}</Text>
            {tooltip && (
              <InfoLight
                height={18}
                width={18}
                data-tip={tooltip}
                data-for={`radio-group-${label}`}
              />
            )}
          </LabelContainer>
        )}
        <Validation label={label} error={error} noMargin>
          {options?.map(
            ({ label, value, defaultChecked, subtext, ...rest }) => (
              <Radio
                id={value}
                className="radio-item"
                key={value}
                ref={ref}
                label={label}
                value={value}
                name={name}
                subtext={subtext}
                defaultChecked={defaultChecked}
                onChange={onChange}
                disabled={disabled}
                {...rest}
              />
            )
          )}
        </Validation>
        <Tooltip id={`radio-group-${label}`} />
      </StyledRadioGroup>
    );
  }
);
