/* eslint-disable react/jsx-props-no-spreading, no-nested-ternary */
import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '../text-input/input/TextInput.component';
import { Button } from '../button/Button.component';
import { ValidationHandlerProps } from '../validation/Validation.types';
import { Select } from '../select/Select.component';
import {
  IntegrationInputMain,
  IntegrationInputProps,
} from './IntegrationInput.types';
import {
  IntegrationInputContainer,
  ButtonsContainer,
  StyledValidation,
} from './IntegrationInput.styled';

interface CompatibleIntegrationInputType {
  input?: IntegrationInputProps | IntegrationInputProps[];
  errors?: ValidationHandlerProps | ValidationHandlerProps[];
}

const CompatibleIntegrationInput: React.FC<CompatibleIntegrationInputType> = ({
  input,
  errors,
}) => {
  if (!input) {
    return null;
  }
  if (Array.isArray(input)) {
    return (
      <>
        {input.map((inputProps: IntegrationInputProps) => {
          if (
            inputProps.type === 'select' &&
            inputProps?.selectProps?.options &&
            inputProps.name
          ) {
            const opts = inputProps!.selectProps!.options;
            return (
              <Controller
                name={inputProps.name}
                control={inputProps.selectProps.control}
                render={({ onChange, value }) => {
                  const val = opts.find(opt => opt.id === value);
                  return (
                    <Select
                      {...inputProps}
                      placeholder={
                        inputProps.selectProps?.placeholder || 'Select a value'
                      }
                      error={
                        // @ts-expect-error poorly typed
                        inputProps.name && errors && errors[inputProps.name]
                          ? // @ts-expect-error poorly typed
                            { message: errors[inputProps.name].message }
                          : undefined
                      }
                      onChange={onChange}
                      value={val}
                      options={opts}
                      returnType="id"
                      valueKey="id"
                    />
                  );
                }}
              />
            );
          }
          return (
            <Input
              {...inputProps}
              // @ts-expect-error poorly typed
              error={inputProps.name && errors && errors[inputProps.name]}
            />
          );
        })}
      </>
    );
  }

  return (
    <StyledValidation
      // @ts-expect-error poorly typed
      error={input.name && errors && errors[input.name]}
      name={input.name}
      fillWidth={input.fillWidth}
    >
      <Input {...input} />
    </StyledValidation>
  );
};

export const IntegrationInput: React.FC<IntegrationInputMain> = ({
  input,
  errors,
  renderUnderInput,
  children,
  buttons,
  gridStyles,
}) => {
  return (
    <IntegrationInputContainer style={gridStyles}>
      <CompatibleIntegrationInput input={input} errors={errors} />
      {renderUnderInput}
      {buttons && (
        <ButtonsContainer>
          {buttons.map(button => {
            return <Button {...button} />;
          })}
        </ButtonsContainer>
      )}
      {children}
    </IntegrationInputContainer>
  );
};
