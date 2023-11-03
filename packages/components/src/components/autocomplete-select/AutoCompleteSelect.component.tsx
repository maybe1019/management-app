// @ts-nocheck
import React from 'react';
import Downshift from 'downshift';
import { Delete } from '@secberus/icons';
import ReactTooltip from 'react-tooltip';
import { Button } from '../button/Button.component';
import {
  InnerInput,
  StyledListItem,
  OuterInput,
  StyledDownShift,
  StyledDropdownList,
} from './AutoCompleteSelect.styled';

export interface AutoCompleteSelectMain {
  setSelected: (...params: any) => any;
  selected: string | number | null | { [key: string]: any };
  data: { [key: string]: any } | any[];
  valueKey: string;
  displayKey: string;
  placeholder?: unknown;
  className?: string;
  onChange?: () => any;
  onBlur?: () => any;
  maxLength?: number;
  [key: string]: any;
}

export const AutoCompleteSelect: React.FC<AutoCompleteSelectMain> = ({
  setSelected,
  selected,
  data,
  valueKey,
  displayKey,
  placeholder,
  className,
  onChange,
  onBlur,
  maxLength,
}) => {
  const [focused, setFocused] = React.useState(false);
  const stateReducer = (state: any, changes: any) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.mouseUp:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          inputValue: '',
          isOpen: false,
        };
      case Downshift.stateChangeTypes.blurInput:
        return {
          ...changes,
          isOpen: state.isOpen,
          highlightedIndex: state.highlightedIndex,
          inputValue: state.inputValue,
        };
      default:
        return changes;
    }
  };

  const handleClick = (val: any) => {
    if (val) {
      setSelected({ ...selected, [val[valueKey]]: val });
      if (onChange) onChange({ ...selected, [val[valueKey]]: val });
    }
  };

  const handleInputKeyDown = ({
    event,
    isOpen,
    selectHighlightedItem,
    highlightedIndex,
  }: any) => {
    if (isOpen && ['Tab', ',', ';'].includes(event.key)) {
      event.preventDefault();
      if (highlightedIndex != null) {
        selectHighlightedItem();
      }
    }
  };

  const buildMessage = (item, maxLength) => {
    if (item.length > maxLength) {
      return (
        <>
          <span data-tip={item}>{item.substr(0, maxLength).trimEnd()}...</span>
          <ReactTooltip />
        </>
      );
    }
    return item;
  };

  return (
    <StyledDownShift
      itemToString={item => (item ? item.value : '')}
      onSelect={item => handleClick(item)}
      defaultHighlightedIndex={0}
      stateReducer={stateReducer}
    >
      {({
        getInputProps,
        getRootProps,
        getItemProps,
        getMenuProps,
        selectHighlightedItem,
        highlightedIndex,
        isOpen,
        inputValue,
      }) => {
        return (
          <OuterInput
            as="div"
            focused={focused}
            className={className}
            {...getRootProps()}
          >
            {selected &&
              Object.values(selected)
                .filter(item => item)
                .map(item => (
                  <Button
                    endIcon
                    key={item[valueKey]}
                    onClick={() =>
                      setSelected({ ...selected, [item[valueKey]]: null })
                    }
                  >
                    {buildMessage(item[displayKey], maxLength)}
                    <Delete color="#fff" />
                  </Button>
                ))}
            <InnerInput
              name="autoCompleteInput"
              key="inner"
              {...getInputProps({
                onFocusCapture: event => setFocused(true),
                onBlurCapture: event => setFocused(false),
                onKeyDown: event =>
                  handleInputKeyDown({
                    event,
                    selectHighlightedItem,
                    highlightedIndex,
                    isOpen,
                    inputValue,
                  }),
                onBlur,
                placeholder,
              })}
            />
            <StyledDropdownList isOpen={isOpen} {...getMenuProps()}>
              {isOpen
                ? data
                    .filter(item => {
                      return !selected[item[valueKey]];
                    })
                    .filter(item => {
                      if (!inputValue) {
                        return true;
                      } else if (item[displayKey]) {
                        return item[displayKey]
                          .toLowerCase()
                          .includes(inputValue.toLowerCase());
                      } else if (item[valueKey]) {
                        return item[valueKey]
                          .toLowerCase()
                          .includes(inputValue.toLowerCase());
                      }
                    })
                    .map((item, index) => {
                      return (
                        <StyledListItem
                          highlightedIndex={highlightedIndex}
                          index={index}
                          {...getItemProps({
                            item,
                            index,
                            key: item[valueKey],
                          })}
                        >
                          <div>{item[displayKey]}</div>
                        </StyledListItem>
                      );
                    })
                : null}
            </StyledDropdownList>
          </OuterInput>
        );
      }}
    </StyledDownShift>
  );
};
