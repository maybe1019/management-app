import React from 'react';
import { InputProps } from '../../..';
import { TypeAhead, ValueDisplay } from './components';
import type {
  DisplayConditionGateProps,
  TypeAheadProps,
} from './SearchConditionGate.types';
import {
  Container,
  StyledLabel,
  StyledLeftComponent,
  StyledInput,
  LabelContainer,
} from './SearchConditionGate.styled';
export type {
  DisplayOnlyProps,
  TypeAheadProps,
} from './SearchConditionGate.types';

export const SearchConditionDisplayGate: React.FC<DisplayConditionGateProps> =
  ({ textLabelProps, inputProps, leftComponentDisplay, useTypeahead }) => {
    const [value, setValue] = React.useState<string>('');

    return (
      <Container className="containerGate">
        <LabelContainer>
          {'labelProps' in textLabelProps && (
            <StyledLabel
              className="searchConditionDisplay_DropdownLabel"
              color="white"
              type="small-bold"
              {...textLabelProps.labelProps}
            >
              {textLabelProps.labelText}
            </StyledLabel>
          )}
        </LabelContainer>
        <StyledLeftComponent>
          <ValueDisplay
            displayOnlyText={leftComponentDisplay.displayOnlyText}
            className="searchConditionDisplay_Display"
          />
        </StyledLeftComponent>
        {useTypeahead ? (
          <TypeAhead
            className="searchConditionDisplay_typeahead"
            {...(inputProps as TypeAheadProps)}
            inputValue={value}
            onChange={setValue}
          />
        ) : (
          <StyledInput
            className="searchConditionDisplay_input"
            {...({ noMargin: true, ...inputProps } as InputProps)}
          />
        )}
      </Container>
    );
  };
