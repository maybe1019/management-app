import React from 'react';
import classNames from 'classnames';
import { CheckMarkDark } from '@secberus/icons';
import { Text, ClickAwayListener } from '../index';
import { Validation } from '../validation/Validation.component';
import {
  StyledSelectContainer,
  SelectValue,
  ListItem,
  SelectList,
  TextContainer,
  ActionListItem,
  ActionOption,
  ActionContainer,
  ListItemWithIcon,
  StyledChevronDown,
} from './Select.styled';
import { SelectProps, SelectOption } from './Select.types';
import { IconOptions, DEFAULT_ICON } from './Select.constants';
import { MenuPortal } from './Portal.component';

// TODO: icons in this file are opinionative. We should just
// pass icons on their own from here on out. Need to update this components
// hasIcon boolean to just require you pass an icon.
export const Select = React.forwardRef<HTMLInputElement, SelectProps>(
  ({
    label,
    disabled,
    onChange,
    className,
    options,
    displayKey = 'name',
    direction = 'DOWN',
    reverseDirection = false,
    valueKey = 'id',
    value: propsValue,
    placeholder,
    error,
    rowHeight = 48,
    maxRows = 6.5,
    maxTriggerWidth,
    dark,
    loading,
    transformName,
    returnType = 'id',
    actionItem,
    id,
    hasIcon = false,
    onToggle,
    menuPortalTarget,
    closeMenuOnScroll,
    onMenuClose,
  }) => {
    const getInitialSelectedValue = React.useCallback(():
      | SelectOption
      | undefined => {
      if (typeof propsValue === 'string') {
        return options.find(o => o[valueKey] === propsValue);
      }
      return propsValue as SelectOption;
    }, [options, propsValue, valueKey]);

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [selectedVal, setSelectedVal] = React.useState<
      SelectOption | undefined
    >(getInitialSelectedValue);
    const iconDirection =
      isMenuOpen && reverseDirection
        ? direction === 'UP'
          ? 'DOWN'
          : 'UP'
        : direction;
    const listRef = React.useRef<HTMLLIElement | null>(null);
    const controlRef = React.useRef<HTMLDivElement | null>(null);

    const handleSelect = (option: SelectOption) => {
      setSelectedVal(option);
      setIsMenuOpen(false);
      const selectedId = valueKey ? option[valueKey] : option;
      const returnValue = returnType === 'id' ? selectedId : option;
      if (onChange) onChange(returnValue);
    };

    const toggleDropdownList = () => {
      setIsMenuOpen(!isMenuOpen);
      setTimeout(() => {
        if (listRef.current) {
          listRef.current?.scrollIntoView({
            behavior: 'auto',
            block: 'nearest',
          });
        }
      }, 150);
    };

    React.useEffect(() => {
      setSelectedVal(getInitialSelectedValue());
    }, [getInitialSelectedValue]);

    React.useEffect(() => {
      // When toggle status changes, execute the onToggle cb function (if applicable)
      if (typeof onToggle === 'function') {
        onToggle(isMenuOpen);
      }
    }, [onToggle, isMenuOpen]);

    React.useEffect(() => {
      const onScroll = (event: Event) => {
        if (listRef.current && listRef.current.contains(event.target as Node)) {
          return;
        }

        setIsMenuOpen(false);
        onMenuClose && onMenuClose();
      };

      if (closeMenuOnScroll && document && document.addEventListener) {
        // Listen to all scroll events, and filter them out inside of 'onScroll'
        document.addEventListener('scroll', onScroll, true);
      }
      return () => {
        document.removeEventListener('scroll', onScroll, true);
      };
    }, [closeMenuOnScroll, onMenuClose]);

    const Menu = menuPortalTarget ? MenuPortal : React.Fragment;
    const menuProps = menuPortalTarget
      ? { appendTo: menuPortalTarget, controlElement: controlRef?.current }
      : {};

    return (
      <ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
        <StyledSelectContainer
          className={classNames(className, { disabled })}
          role="button"
          onClick={toggleDropdownList}
          id={id}
        >
          <Validation
            className="Select__validation"
            error={error}
            label={label}
          >
            {label && (
              <Text
                className="Select__label"
                type="xsmall-bold"
                color={dark ? 'medium-gray' : 'dark'}
              >
                {label}
              </Text>
            )}
            <SelectValue
              maxTriggerWidth={maxTriggerWidth}
              className={classNames(
                { dark, active: isMenuOpen, disabled },
                'select-value'
              )}
              buttonShadow={reverseDirection}
              arrowColor={reverseDirection ? 'white' : 'gray'}
              ref={controlRef}
            >
              {selectedVal && !loading ? (
                <Text
                  type="small-regular"
                  color="dark"
                  className="selected-val"
                >
                  {transformName
                    ? transformName(selectedVal[displayKey ?? 'name'])
                    : selectedVal[displayKey ?? 'name']}
                </Text>
              ) : (
                <TextContainer>
                  <Text
                    type="small-regular"
                    color="gray"
                    className="placeholder"
                  >
                    {loading ? 'Loading...' : placeholder}
                  </Text>
                </TextContainer>
              )}
              {!disabled && (
                <StyledChevronDown
                  direction={iconDirection}
                  height="24px"
                  width="24px"
                />
              )}
            </SelectValue>
          </Validation>
          {isMenuOpen && (
            <Menu {...menuProps}>
              <SelectList
                reverseDirection={reverseDirection}
                direction={iconDirection}
                maxRows={maxRows}
                rowHeight={rowHeight}
              >
                {options?.map(option => {
                  const isSelected = selectedVal
                    ? selectedVal[valueKey ?? 'id'] === option[valueKey ?? 'id']
                    : false;

                  if (hasIcon) {
                    const OptionMeta =
                      IconOptions.find(
                        iconOption => option.type === iconOption.type
                      ) || DEFAULT_ICON;
                    const { Icon } = OptionMeta;

                    return (
                      <ListItemWithIcon
                        id={option[valueKey ?? 'id']}
                        rowHeight={rowHeight}
                        className={isSelected ? 'selected' : undefined}
                        onClick={() => handleSelect(option)}
                        ref={isSelected ? listRef : undefined}
                        key={option[valueKey ?? 'id']}
                      >
                        <Icon height="24px" width="24px" />
                        <Text type="small-bold" color="dark">
                          {transformName
                            ? transformName(option[displayKey ?? 'name'])
                            : option[displayKey ?? 'name']}
                        </Text>
                        {isSelected && (
                          <CheckMarkDark height="22px" width="22px" />
                        )}
                      </ListItemWithIcon>
                    );
                  }

                  return (
                    <ListItem
                      id={option[valueKey ?? 'id']}
                      rowHeight={rowHeight}
                      className={isSelected ? 'selected' : undefined}
                      onClick={() => handleSelect(option)}
                      ref={isSelected ? listRef : undefined}
                      key={option[valueKey ?? 'id']}
                    >
                      <Text type="small-bold" color="dark">
                        {transformName
                          ? transformName(option[displayKey ?? 'name'])
                          : option[displayKey ?? 'name']}
                      </Text>
                      {isSelected && (
                        <CheckMarkDark height="22px" width="22px" />
                      )}
                    </ListItem>
                  );
                })}
                {actionItem &&
                  (actionItem?.render ? (
                    <ListItem id="selectActionItem">
                      {actionItem?.render}
                    </ListItem>
                  ) : actionItem.as ? (
                    <actionItem.as />
                  ) : (
                    <ActionListItem
                      onClick={actionItem?.onClick}
                      id="selectActionItem"
                    >
                      <ActionContainer>
                        {actionItem?.icon}
                        <ActionOption>{actionItem?.label}</ActionOption>
                      </ActionContainer>
                    </ActionListItem>
                  ))}
              </SelectList>
            </Menu>
          )}
        </StyledSelectContainer>
      </ClickAwayListener>
    );
  }
);
