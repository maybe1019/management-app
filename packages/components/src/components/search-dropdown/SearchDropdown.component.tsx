import React, { useState } from 'react';
import classNames from 'classnames';
import Downshift from 'downshift';
import { Text, Validation } from '../index';
import {
  SearchDropdownContainer,
  Input,
  List,
  ListItem,
  Option,
  ActionOption,
  ActionContainer,
  ActionListItem,
} from './SearchDropdown.styled';

interface SelectedItems {
  [key: string]: any;
}

interface DropdownProps {
  id: string;
  valueKey?: string;
  className?: string;
  label: string;
  name?: string;
  disabled?: boolean;
  options: any;
  defaultValue?: string;
  onChange: (...args: any) => void;
  value: SelectedItems | null | undefined;
  placeholder: string;
  displayKey: string;
  error?: { message: string };
  dark?: boolean;
  actionItem?: {
    onClick: () => void;
    render?: React.ReactNode;
    label?: string;
    icon?: React.ReactNode;
  };
}

interface GetInputPropsOptionsRef
  extends React.HTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
}

export const SearchDropdown: React.FC<DropdownProps> = ({
  label,
  onChange,
  options,
  valueKey,
  placeholder,
  value,
  displayKey,
  className,
  dark,
  error,
  disabled,
  actionItem,
}) => {
  const itemId = valueKey ?? 'id';
  const [inputValue, setInputValue] = useState('');
  const [inputNode, setInputNode] = React.useState<any>();
  const internalInputRef = React.useCallback(node => {
    if (node !== null) {
      setInputNode(node);
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e?.target.value);
  };

  const setSelected = (selectedItem: any | null) => {
    if (selectedItem)
      onChange({ ...value, [selectedItem[itemId]]: selectedItem });
    setInputValue('');
    inputNode.blur();
  };
  return (
    <Downshift
      onChange={setSelected}
      inputValue={inputValue}
      selectedItem={null}
    >
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        openMenu,
      }) => {
        const filteredOptions = options
          ?.filter((item: any) => !value?.[item[itemId]])
          .filter(
            (item: any) =>
              !inputValue ||
              item[displayKey]
                ?.toLowerCase()
                .includes(inputValue?.toLowerCase())
          );

        return (
          <SearchDropdownContainer
            {...getRootProps()}
            className={classNames(className, { dark, disabled })}
          >
            <Validation error={error} label={label}>
              {label && (
                <Text
                  className="SearchDropdown__label"
                  type="small-bold"
                  color={dark ? 'medium-gray' : 'dark'}
                  {...getLabelProps()}
                >
                  {label}
                </Text>
              )}
              <Input
                {...(getInputProps({
                  onChange: handleInput,
                  onFocus: openMenu,
                }) as GetInputPropsOptionsRef)}
                placeholder={placeholder}
                ref={internalInputRef}
              />
              {isOpen && (
                <List {...getMenuProps()}>
                  {filteredOptions?.length ? (
                    filteredOptions?.map((item: any, index: any) => (
                      <ListItem
                        {...getItemProps({ key: item.id, index, item })}
                      >
                        <Option>
                          {displayKey ? item[displayKey] : item.label}
                        </Option>
                      </ListItem>
                    ))
                  ) : (
                    <Option>No results found...</Option>
                  )}
                  {actionItem &&
                    (actionItem?.render ? (
                      <ListItem>{actionItem?.render}</ListItem>
                    ) : (
                      <ActionListItem onClick={actionItem?.onClick}>
                        <ActionContainer>
                          {actionItem?.icon}
                          <ActionOption>{actionItem?.label}</ActionOption>
                        </ActionContainer>
                      </ActionListItem>
                    ))}
                </List>
              )}
            </Validation>
          </SearchDropdownContainer>
        );
      }}
    </Downshift>
  );
};
