import React from 'react';
import { InputProps } from '../../..';
import { DropdownSelect, TypeAhead } from './components';
import type { DropdownConditionGateProps } from './SearchConditionGate.types';
import {
  Container,
  StyledLabel,
  StyledLeftComponent,
  StyledInput,
  LabelContainer,
} from './SearchConditionGate.styled';
import { TypeAheadProps } from '.';

export type {
  DisplayOnlyProps,
  TypeAheadProps,
} from './SearchConditionGate.types';

export const SearchConditionDropdownGate: React.FC<DropdownConditionGateProps> =
  ({
    textLabelProps,
    inputProps,
    leftComponentDropdown,
    useTypeahead = true,
    onChange,
    defaultValue,
    maxHeight = '144px',
  }) => {
    const [value, setValue] = React.useState('');
    return (
      <Container className="containerGate">
        <LabelContainer>
          {'labelProps' in textLabelProps && (
            <StyledLabel
              className="searchConditionDropdown_DropdownLabel"
              color="white"
              type="small-bold"
              {...textLabelProps.labelProps}
            >
              {textLabelProps.labelText}
            </StyledLabel>
          )}
        </LabelContainer>
        <StyledLeftComponent>
          <DropdownSelect
            maxHeight={maxHeight}
            className="searchConditionDropdown_Dropdown"
            {...leftComponentDropdown}
            onChange={onChange}
            defaultValue={defaultValue}
          />
        </StyledLeftComponent>
        {useTypeahead ? (
          <TypeAhead
            className="searchConditionDropdown_typeahead"
            {...(inputProps as TypeAheadProps)}
            inputValue={value}
            onChange={setValue}
          />
        ) : (
          <StyledInput
            className="searchConditionDropdown_input"
            {...({ noMargin: true, ...inputProps } as InputProps)}
          />
        )}
      </Container>
    );
  };
