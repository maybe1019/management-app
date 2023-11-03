import PropTypes from 'prop-types';
import * as React from 'react';
import BaseDropdown, {
  DropdownProps as BaseDropdownProps,
} from '@restart/ui/Dropdown';
import { useCombobox } from 'downshift';
import { AnyFn, mergeRefs, useDeepEffect } from '@secberus/utils';
import styled from 'styled-components';
import { BaseStyledInput } from '../text-input/base';
import { MenuPortal } from '../select/Portal.component';
import { WithIcon } from '../text-input/wrapper';

const InputLabel = styled.label`
  ${({ theme }) => theme.typography['xsmall-bold']};
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 0;
`;

const ExternalList = styled.ul`
  background: white;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  list-style: none;
  position: relative;
  margin: 0px;
`;

const InternalList = styled.ul<{ bottomBorderRadius?: boolean }>`
  background: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  max-height: calc(48px * 3);
  overflow-y: auto;
  list-style: none;
  position: relative;
  margin: 0px;

  ${({ bottomBorderRadius }) =>
    bottomBorderRadius &&
    `
    border-radius: 24px
  `};
`;

export const ListItem = styled.li`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  line-height: 24px;
`;

const AnchorListItem = styled.button`
  ${({ theme }) => theme.typography['small-bold']};
  background: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  line-height: 24px;
  box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.08);
  z-index: 999;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;

  &:hover {
    background: ${({ theme }) => theme.colors['light-gray']};
  }
  &:active {
    background: ${({ theme }) => theme.colors['medium-gray']};
  }
  cursor: pointer;
  border: none;
`;

const ComboBox = styled.div`
  display: flex;
  width: 100%;
  margin: 4px 0 0;
`;

const AnchorListItemSpan = styled.span`
  margin-left: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ListItemSpan = styled.span`
  margin-left: 16px;
  ${({ theme }) => theme.typography['small-bold']};
`;

type Generic = Record<string, any>;

type AnchorListItemProps = {
  text: string;
  icon?: JSX.Element;
  onClick?: AnyFn;
};

export interface SearchComboInputProps<T = Generic>
  extends BaseDropdownProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'children'> {
  label?: string;
  itemToString: (item: T | null) => string;
  items: T[];
  getItemFilterPredicate: (inputValue?: string) => (item?: T) => boolean;
  anchorListItemProps: AnchorListItemProps;
  placeholder?: string;
  onSelectItem: (selectedItem: T | null) => void;
  menuPortalTarget?: any;
  noResultsComponent?: React.ReactNode;
  icon?: JSX.Element;
  iconPlacement?: 'left' | 'right';
}

const propTypes = {
  label: PropTypes.string,
  itemToString: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object),
  itemsFilterPredicate: PropTypes.func,
};

const defaultProps: Partial<SearchComboInputProps> = {};

function SearchComboInput<T>({
  getItemFilterPredicate,
  items,
  itemToString,
  label,
  anchorListItemProps,
  placeholder,
  onSelectItem,
  menuPortalTarget,
  noResultsComponent,
  icon,
  iconPlacement = 'left',
}: SearchComboInputProps<T>): JSX.Element {
  const [_items, setItems] = React.useState(items);
  const controlRef = React.useRef<HTMLDivElement | null>(null);

  useDeepEffect(() => {
    setItems(items);
  }, [items]);

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    reset,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(items.filter(getItemFilterPredicate(inputValue)));
    },
    items: _items,
    itemToString,
    stateReducer: (state, { changes, type }) => {
      // https://github.com/downshift-js/downshift/issues/1011
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          // If an item is selected but the input doesnt match the selected item
          // - Agnostic of typeof selectedItem via object values
          if (
            state.selectedItem &&
            Object.values(state.selectedItem).indexOf(changes.inputValue) === -1
          ) {
            reset();
            // If no selected item but input exists
          } else if (state.selectedItem === null && changes.inputValue) {
            return {
              ...changes,
              inputValue: '',
            };
          }
          return changes;
        default:
          return changes;
      }
    },
  });

  React.useEffect(() => {
    onSelectItem(selectedItem);
  }, [onSelectItem, selectedItem]);

  const NoResultsComponent = !noResultsComponent ? (
    <ListItem>
      <ListItemSpan>No results...</ListItemSpan>
    </ListItem>
  ) : (
    noResultsComponent
  );
  return (
    <BaseDropdown>
      <InputContainer>
        <InputLabel
          {...getLabelProps()}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {label}
        </InputLabel>
        <ComboBox ref={controlRef}>
          <BaseDropdown.Toggle>
            {props => (
              <WithIcon placement={icon ? iconPlacement : undefined}>
                {icon && React.cloneElement(icon, { className: 'input-icon' })}
                <BaseStyledInput
                  {...props}
                  {...getInputProps()}
                  placeholder={placeholder}
                />
              </WithIcon>
            )}
          </BaseDropdown.Toggle>
        </ComboBox>
      </InputContainer>
      <BaseDropdown.Menu flip>
        {menuProps => {
          const Menu = menuPortalTarget ? MenuPortal : React.Fragment;
          const menuPortalProps = menuPortalTarget
            ? {
                appendTo: menuPortalTarget,
                controlElement: controlRef?.current,
              }
            : {};
          return (
            <Menu {...menuPortalProps}>
              <ExternalList
                {...menuProps}
                {...getMenuProps()}
                ref={mergeRefs([menuProps.ref, getMenuProps().ref])}
              >
                {isOpen && (
                  <>
                    <InternalList bottomBorderRadius={!anchorListItemProps}>
                      {_items.length
                        ? _items.map((item, index) => (
                            <ListItem
                              key={`${itemToString(item)}${index}`}
                              {...getItemProps({ item, index })}
                              style={
                                highlightedIndex === index
                                  ? { backgroundColor: '#F1F6FA' }
                                  : {}
                              }
                            >
                              <ListItemSpan>{itemToString(item)}</ListItemSpan>
                            </ListItem>
                          ))
                        : NoResultsComponent}
                    </InternalList>
                    {anchorListItemProps && (
                      <AnchorListItem onClick={anchorListItemProps.onClick}>
                        <AnchorListItemSpan>
                          {anchorListItemProps.icon} {anchorListItemProps.text}
                        </AnchorListItemSpan>
                      </AnchorListItem>
                    )}
                  </>
                )}
              </ExternalList>
            </Menu>
          );
        }}
      </BaseDropdown.Menu>
    </BaseDropdown>
  );
}

SearchComboInput.displayName = 'SearchComboInput';
SearchComboInput.propTypes = propTypes;
SearchComboInput.defaultProps = defaultProps;

export { SearchComboInput };
