import React from 'react';
import { useSelect } from 'downshift';
import { ChevronDownDark } from '@secberus/icons';
import { Text } from '../../../../../index';
import { DropdownSelectProps, Item } from './Dropdown.types';
import {
  DropdownContainer,
  DropdownButton,
  ListContainer,
  ListItem,
} from './Dropdown.styled';

export const comparatorVerbiageOverride = (
  comparatorString: string
): string => {
  switch (comparatorString.toLowerCase()) {
    case 'matches':
      return 'Is';
    case 'not_matches':
      return 'Is not';
    case 'oneof':
      return 'Contains';
    case 'prefix':
      return 'Starts with';
    case 'suffix':
      return 'Ends with';
    case 'regex':
      return 'Regex matches';
    default:
      return comparatorString;
  }
};

export const DropdownSelect: React.FC<DropdownSelectProps> = ({
  items,
  dropdownLabel,
  labelMargin,
  dropdownIcon = <ChevronDownDark />,
  dropdownTextColor = 'white',
  dropdownBackgroundColor = 'dark-gray',
  dropdownLabelColor = 'medium-gray',
  className,
  onChange,
  defaultValue,
  maxHeight = '144px',
}) => {
  const itemToString = (item: Item | null) => (item?.value ? item.value : '');
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect<Item>({
    items,
    itemToString,
    defaultSelectedItem: defaultValue || items[0],
  });

  React.useEffect(() => {
    onChange && selectedItem && onChange(selectedItem);
  }, [selectedItem, onChange]);

  return (
    <DropdownContainer className={className}>
      <Text
        type="small-bold"
        as="label"
        {...getLabelProps()}
        color={dropdownLabelColor ?? dropdownTextColor}
      >
        {dropdownLabel}
      </Text>
      <div>
        <DropdownButton
          backgroundColor={dropdownBackgroundColor}
          color={dropdownTextColor}
          labelMargin={labelMargin}
          isOpen={isOpen}
          type="button"
          {...getToggleButtonProps()}
        >
          <span>
            {selectedItem?.value
              ? comparatorVerbiageOverride(selectedItem.value)
              : 'Contains'}{' '}
          </span>
          {dropdownIcon}
        </DropdownButton>
        <ListContainer maxHeight={maxHeight} {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <ListItem
                {...getItemProps({
                  key: item.value,
                  index,
                  item,
                })}
              >
                <Text type="small-bold">
                  {comparatorVerbiageOverride(item.value)}
                </Text>
              </ListItem>
            ))}
        </ListContainer>
      </div>
    </DropdownContainer>
  );
};
