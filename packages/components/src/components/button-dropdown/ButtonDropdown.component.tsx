import React from 'react';
import { Text, Button, ClickAwayListener } from '../index';
import {
  ButtonDropdownContainer,
  ListItem,
  DropdownList,
} from './ButtonDropdown.styled';
import { ButtonDropdownProps } from './ButtonDropdown.types';

export const ButtonDropdown: React.FC<ButtonDropdownProps> = ({
  variant = 'primary',
  label,
  icon,
  size = 'default',
  alignRight,
  options,
  disabled,
  className,
  displayKey = '',
  onSelect,
  optionDisplay,
  maxRows = 7,
  rowHeight = 48,
  listWidth = 'fit-content',
  listTop = '45px',
}) => {
  const [list, setList] = React.useState(false);
  const [listNode, setListNode] = React.useState<any>();
  const listRef = React.useCallback(node => {
    if (node !== null) {
      setListNode(node);
    }
  }, []);
  const onClickAway = () => setList(false);

  React.useEffect(() => {
    if (!listNode) return;
    listNode.scrollTo(0, 0);
  }, [listNode]);

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <ButtonDropdownContainer className={className}>
        <Button
          variant={variant}
          icon={icon}
          onClick={() => setList(true)}
          disabled={disabled}
          data-test-id="buttonDropdown"
          size={size}
        >
          {label}
        </Button>
        {list && (
          <DropdownList
            maxRows={maxRows}
            rowHeight={rowHeight}
            ref={listRef}
            alignRight={alignRight}
            listWidth={listWidth}
            listTop={listTop}
          >
            {options
              ?.filter(
                option =>
                  !Object.prototype.hasOwnProperty.call(option, 'show') ||
                  option?.show
              )
              ?.map(option => {
                const handleOptionSelect = () => {
                  setList(false);
                  if (option.onClick) return option.onClick();
                  return onSelect && onSelect(option);
                };
                return (
                  <ListItem
                    key={option.id}
                    id={option.id}
                    rowHeight={rowHeight}
                    onClick={handleOptionSelect}
                  >
                    {optionDisplay ? (
                      optionDisplay(option)
                    ) : (
                      <Text
                        type="small-bold"
                        color={option?.destructive ? 'red' : undefined}
                      >
                        {option[
                          displayKey as keyof ButtonDropdownProps['options'][0]
                        ] || option.name}
                      </Text>
                    )}
                  </ListItem>
                );
              })}
          </DropdownList>
        )}
      </ButtonDropdownContainer>
    </ClickAwayListener>
  );
};
