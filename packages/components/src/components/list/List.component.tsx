import React from 'react';
import classNames from 'classnames';
import { Box, Flex } from '@chakra-ui/react';
import { CheckMarkDark } from '@secberus/icons';
import { Text } from '../text';
import {
  ListContainer,
  ListBody,
  ListFooter,
  ListItem,
  StyledActionItem,
} from './List.styled';
import { ListActionItemProps, ListOption, ListProps } from './List.types';

const ActionItem: React.FC<ListActionItemProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <StyledActionItem onClick={onClick}>
      {icon}
      <Text type="small-bold">{label}</Text>
    </StyledActionItem>
  );
};

/**
 *
 * @param elevation
 * @param borderRadius
 * @param width
 * @param rowHeight
 * @param options
 * @param selected
 * @param onSelected
 * @param actionItem
 * @param transformLabel
 * @param selectedReturnType
 * @param {boolean} [disableAnimation=true] - [DEPRECATED] Indicates whether animation is disabled. (@drew) Temporarily added until MenuPortal is replaced with SplitButton's useMenuPortal
 * @constructor
 */
export const List: React.FC<ListProps> = ({
  elevation,
  borderRadius,
  width,
  rowHeight,
  options,
  selected,
  onSelected,
  actionItem,
  transformLabel,
  selectedReturnType = 'object',
  disableAnimation,
}) => {
  const handleSelect = (
    e: React.MouseEvent<HTMLElement>,
    option: ListOption
  ): void => {
    switch (selectedReturnType) {
      case 'id':
        if (typeof option?.onClick === 'function') option.onClick(e, option.id);
        if (typeof onSelected === 'function') onSelected(e, option.id);
        break;
      case 'object':
      default:
        if (typeof option?.onClick === 'function') option.onClick(e, option);
        if (typeof onSelected === 'function') onSelected(e, option);
        break;
    }
  };

  return (
    <ListContainer
      elevation={elevation}
      borderRadius={borderRadius}
      width={width}
      disableAnimation={disableAnimation}
    >
      <ListBody rowHeight={rowHeight}>
        {options.map(option => {
          const isSelected =
            typeof selected === 'object'
              ? selected?.id
              : selected === option.id;

          if (option?.show === false) return null;

          return (
            <ListItem
              key={option.id}
              className={classNames({
                selected: isSelected,
                destructive: option.destructive,
              })}
              onClick={e => handleSelect(e, option)}
              rowHeight={rowHeight}
            >
              <Flex alignItems="center" sx={{ gap: 8 }}>
                {option?.icon &&
                  React.cloneElement(option?.icon, {
                    width: '24px',
                    height: '24px',
                    className: 'list-item-icon',
                  })}
                <Box>
                  <Text type="small-bold" color="dark">
                    {transformLabel
                      ? transformLabel(option.label)
                      : option.label}
                  </Text>
                </Box>
              </Flex>
              {isSelected && <CheckMarkDark width="24px" height="24px" />}
            </ListItem>
          );
        })}
      </ListBody>
      {actionItem && actionItem.show && (
        <ListFooter>
          <ActionItem
            {...actionItem}
            label={
              transformLabel
                ? transformLabel(actionItem.label)
                : actionItem.label
            }
          />
        </ListFooter>
      )}
    </ListContainer>
  );
};
