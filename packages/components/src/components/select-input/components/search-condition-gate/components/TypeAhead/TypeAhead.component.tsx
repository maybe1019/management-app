import React from 'react';
import Downshift from 'downshift';
import classNames from 'classnames';
import { Text } from '../../../../../index';
import { TypeAheadProps, Item } from './TypeAhead.types';
import { InputField, ListContainer, ListItem } from './TypeAhead.styled';

export const TypeAhead: React.FC<TypeAheadProps> = ({
  typeAheadPlaceholder,
  typeAheadOptions,
  onChange,
  inputValue,
  inputStyle,
  typeAheadBorderRadius = '0px 24px 24px 0px',
  typeAheadBackgroundColor = 'dark-gray',
  typeAheadTextColor = 'white',
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e?.target.value ?? '');
  };

  const setSelected = (selectedItem: { value: string } | null) => {
    if (selectedItem?.value) {
      onChange(selectedItem.value);
    }
  };

  return (
    <Downshift
      itemToString={item => (item ? item.value : '')}
      onChange={setSelected}
      inputValue={inputValue}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        getRootProps,
        clearSelection,
      }) => {
        const filteredItems = typeAheadOptions.filter(
          (item: Item) => !inputValue || item.value.includes(inputValue)
        );
        return (
          <div {...getRootProps(undefined, { suppressRefError: true })}>
            {/* @ts-expect-error @author: Avery @note: throws error on clearing method library contributor uses below, is valid  */}
            <InputField
              className={classNames(inputStyle, className)}
              placeholder={typeAheadPlaceholder}
              borderRadius={typeAheadBorderRadius}
              textColor={typeAheadTextColor}
              {...getInputProps({
                onChange: e => {
                  handleChange(e);
                  if (e.target.value === '') {
                    clearSelection();
                    onChange('');
                  }
                },
              })}
              backgroundColor={typeAheadBackgroundColor}
            />
            {isOpen ? (
              <ListContainer {...getMenuProps()} className={inputStyle}>
                {filteredItems?.length ? (
                  filteredItems.map((item: Item, index: number) => (
                    <ListItem
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                      })}
                    >
                      <Text type="small-bold">{item.value}</Text>
                    </ListItem>
                  ))
                ) : (
                  <ListItem key="No matches found...">
                    <Text type="small-bold">No matches found...</Text>
                  </ListItem>
                )}
              </ListContainer>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
};
