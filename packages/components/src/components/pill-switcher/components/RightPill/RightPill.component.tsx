import React from 'react';
import { ChevronDown } from '@secberus/icons';
import { ClickAwayListener } from '../../..';
import { ListItem } from '../../../button-dropdown/ButtonDropdown.styled';
import {
  PillContainer,
  RightPillButton,
  PillDropdownList,
  PillText,
} from './RightPill.styled';
import { RightPillProps } from './RightPill.types';

export const RightPill: React.FC<RightPillProps> = ({
  label,
  alignRight,
  options,
  displayKey = '',
  onSelect,
  optionDisplay,
  maxRows = 7,
  rowHeight = 48,
  width = 'fit-content',
  initialSelected,
}) => {
  const [selectedItem, setSelectedItem] = React.useState(label);
  const [selectedId, setSelectedId] = React.useState<undefined | string>(
    initialSelected
  );
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

  React.useEffect(() => {
    setSelectedItem(label);
  }, [label]);

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <PillContainer>
        <RightPillButton onClick={() => setList(true)} width={width}>
          <PillText>{selectedItem}</PillText>
          <ChevronDown height="24px" width="24px" />
        </RightPillButton>
        {list && (
          <PillDropdownList
            maxRows={maxRows}
            rowHeight={rowHeight}
            ref={listRef}
            alignRight={alignRight}
            width={width}
          >
            {options?.map(option => {
              const handleOptionSelect = () => {
                setList(false);
                option.id &&
                  option.name &&
                  setSelectedId(option.id) &&
                  setSelectedItem(option.name);
                if (option.onClick) return option.onClick();
                return onSelect && onSelect(option);
              };
              return (
                <ListItem
                  className={selectedId === option.id ? 'selected' : ''}
                  key={option.id}
                  id={option.id}
                  rowHeight={rowHeight}
                  onClick={handleOptionSelect}
                >
                  {optionDisplay ? (
                    optionDisplay(option)
                  ) : (
                    <PillText>
                      {option[
                        displayKey as keyof RightPillProps['options'][0]
                      ] || option.name}
                    </PillText>
                  )}
                </ListItem>
              );
            })}
          </PillDropdownList>
        )}
      </PillContainer>
    </ClickAwayListener>
  );
};
