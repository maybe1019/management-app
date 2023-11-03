import React from 'react';
import { DeleteAltLight } from '@secberus/icons';
import clsx from 'clsx';
import { SelectedChip, RemoveChip } from '../styles/SelectInput.styled';
import { ListItem } from '../../../button-dropdown/ButtonDropdown.styled';
import { ColorProperties } from '../../../../types';
import {
  Container,
  OuterInput as StyledInput,
  StyledDownShift,
  StyledDropdownList,
} from './SearchTypeAhead.styled';
import { stateReducer } from './util/DownShift.util';

type ItemType = { [key: string]: any | unknown };
export interface SearchInputTypeAheadProps {
  setSelected: (...params: any) => any;
  selected: { [key: string]: Record<string, unknown> };
  data: { [key: string]: any } | any[];
  valueKey: string;
  displayKey: string;
  placeholder?: string;
  className?: string;
  onChange?: (x: any) => any;
  onBlur?: () => any;
  maxLength?: number;
  backgroundColor?: ColorProperties;
  [key: string]: any;
}

export const SearchTypeAhead: React.FC<SearchInputTypeAheadProps> = ({
  setSelected,
  selected,
  data,
  valueKey,
  displayKey,
  placeholder,
  className,
  onChange,
  onBlur,
  backgroundColor = 'light-gray',
}) => {
  const ref = React.useRef();

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

  return (
    <StyledDownShift
      itemToString={(item: { value: string } | unknown) =>
        // @ts-expect-error  @author: Avery, @note: downshift expects uknown when it works with strings
        item ? item.value : ''
      }
      onSelect={item => handleClick(item)}
      defaultHighlightedIndex={0}
      stateReducer={stateReducer}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        getRootProps,
        selectHighlightedItem,
        highlightedIndex,
        isOpen,
        inputValue,
      }) => {
        return (
          <Container
            className={clsx(className, 'typeahead-container')}
            {...getRootProps()}
          >
            <StyledInput
              {...getInputProps({
                // @ts-expect-error  @author: Avery, @note: ref is confusing af
                ref,
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
                backgroundColor,
              })}
              className="typeahead-input"
            />
            {selected &&
              Object.values(selected)
                .filter((item: ItemType) => item)
                .map((item: ItemType) => (
                  <SelectedChip key={item[valueKey]}>
                    {item[displayKey]}
                    <RemoveChip
                      onClick={() =>
                        setSelected({ ...selected, [item[valueKey]]: null })
                      }
                    >
                      <DeleteAltLight height="24px" width="24px" />
                    </RemoveChip>
                  </SelectedChip>
                ))}
            <StyledDropdownList
              isOpen={isOpen}
              {...getMenuProps()}
              className="dropdown-list"
            >
              {isOpen
                ? data
                    .filter((item: ItemType) => {
                      return !selected[item[valueKey]];
                    })
                    .filter((item: ItemType) => {
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
                    .map((item: ItemType, index: number) => {
                      return (
                        <ListItem
                          highlightedIndex={highlightedIndex}
                          index={index}
                          {...getItemProps({
                            item,
                            index,
                            key: item[valueKey],
                          })}
                        >
                          <div>{item[displayKey]}</div>
                        </ListItem>
                      );
                    })
                : null}
            </StyledDropdownList>
          </Container>
        );
      }}
    </StyledDownShift>
  );
};
