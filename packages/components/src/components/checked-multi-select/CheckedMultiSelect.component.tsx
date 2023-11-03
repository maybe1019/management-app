import React from 'react';
import { ChevronDownLight } from '@secberus/icons';
import { Box } from '@chakra-ui/react';
import { ClickAwayListener } from '../click-away-listener/ClickAwayListener.component';
import { BaseInput } from '../text-input/base';
import { Checkbox } from '../checkbox/Checkbox.component';
import { Validation } from '../validation/Validation.component';
import { MenuPortal } from '../select/Portal.component';
import { Text } from '../text';
import {
  DropdownButton,
  StyledDropdownList,
  StyledListItem,
  MultiSelectContainer,
  Label,
} from './CheckedMultiSelect.styled';
import { CheckedMultiSelectProps, DataItem } from './CheckedMultiSelect.types';

export const CheckedMultiSelect: React.FC<CheckedMultiSelectProps> = ({
  data,
  displayKey = 'name',
  placeholder,
  className,
  onChange,
  label,
  error,
  selectAllLabel,
  valueKey,
  value = [],
  minItemsShown = 0,
  selectLimit,
  allowSelectAll = true,
  menuPortalTarget,
  disableClickAwayListener,
}) => {
  const [selected, setSelected] = React.useState<(string | number)[]>(value);
  const [maxSelected, setMaxSelected] = React.useState(false);
  const [showList, setShowList] = React.useState(false);
  const [dropdownHeight, setDropdownHeight] = React.useState(0);
  const controlRef = React.useRef<HTMLDivElement | null>(null);
  const listItemRefs = React.useRef<{
    [key: string]: HTMLLIElement | null;
  }>({});

  const showSelectAllOption = React.useMemo(
    () => Boolean(!selectLimit && allowSelectAll),
    [selectLimit, allowSelectAll]
  );

  const inputText = React.useMemo(
    () =>
      selected
        .map(id => data.find(item => item[valueKey] === id)?.[displayKey])
        .filter(val => val !== undefined)
        .join(', '),
    [data, selected, valueKey, displayKey]
  );

  /**
   * Calculates the height of the dropdown based on the number of items to be shown.
   * Accounts for if the select option should show or not.
   */
  React.useEffect(() => {
    const itemHeight = Object.values(listItemRefs?.current)?.[0]?.offsetHeight;

    if (typeof itemHeight === 'number') {
      const height = itemHeight * minItemsShown;
      setDropdownHeight(
        showSelectAllOption ? height + itemHeight : height || 0
      );
    }
  }, [listItemRefs, showList, minItemsShown, showSelectAllOption]);

  const onSelect = (itemId: string | number) => () => {
    if (
      selectLimit &&
      selectLimit > 0 &&
      selected.length + 1 >= selectLimit &&
      !selected.includes(itemId)
    ) {
      setMaxSelected(true);
    } else {
      setMaxSelected(false);
    }

    const next =
      selected.includes(itemId) || maxSelected
        ? selected.filter(id => id !== itemId)
        : [...selected, itemId];

    setSelected(next);
    onChange?.(next);
  };

  const onSelectAll = () => {
    const selectedItems =
      data.length && data.length === selected.length
        ? []
        : data.map((item: DataItem) => item[valueKey]);
    setSelected(selectedItems);
    onChange?.(selectedItems);
  };

  const Menu = menuPortalTarget ? MenuPortal : React.Fragment;
  const menuProps = menuPortalTarget
    ? { appendTo: menuPortalTarget, controlElement: controlRef?.current }
    : {};

  return (
    <ClickAwayListener
      onClickAway={() =>
        !disableClickAwayListener ? setShowList(false) : undefined
      }
    >
      <Box
        className={className}
        display="flex"
        flexDirection="column"
        position="relative"
      >
        <Validation error={error} label={label} noMargin>
          {label && (
            <Label className="multi-select-label" type="small-bold">
              {label}
            </Label>
          )}
          <MultiSelectContainer
            className={showList ? 'active' : ''}
            role="button"
            onClick={() => setShowList(prevState => !prevState)}
            ref={controlRef}
          >
            <BaseInput readOnly value={inputText} placeholder={placeholder} />
            <DropdownButton>
              <ChevronDownLight width="24" height="24" />
            </DropdownButton>
          </MultiSelectContainer>
        </Validation>
        {showList && (
          <Menu {...menuProps}>
            <StyledDropdownList
              maxHeight={
                minItemsShown && dropdownHeight > 0 ? dropdownHeight : undefined
              }
            >
              {showSelectAllOption && (
                <StyledListItem onClick={onSelectAll}>
                  <Checkbox
                    name="selectAll"
                    className="select-all-checkbox"
                    checked={!!(data.length && selected.length === data.length)}
                    onChange={onSelectAll}
                    indeterminate={
                      !!(selected.length && selected.length !== data.length)
                    }
                    label={selectAllLabel}
                  />
                </StyledListItem>
              )}
              {data?.map((item: DataItem) => {
                const Icon = item.icon;
                return (
                  <StyledListItem
                    ref={ref => (listItemRefs.current[item[valueKey]] = ref)}
                    onClick={onSelect(item[valueKey])}
                    key={item[valueKey]}
                  >
                    <Checkbox
                      name={item[displayKey]}
                      className="multi-select-checkbox"
                      onChange={onSelect(item[valueKey])}
                      checked={selected.includes(item[valueKey])}
                      disabled={
                        maxSelected && !selected.includes(item[valueKey])
                      }
                    >
                      {Icon && (
                        <Icon
                          className="multi-select-checkbox-icon"
                          height="20px"
                          width="20px"
                        />
                      )}
                      <Text type="small-regular">{item[displayKey]}</Text>
                    </Checkbox>
                  </StyledListItem>
                );
              })}
            </StyledDropdownList>
          </Menu>
        )}
      </Box>
    </ClickAwayListener>
  );
};
