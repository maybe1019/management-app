import React from 'react';
import { Flex } from '@chakra-ui/react';
import { MenuPortal, List, ClickAwayListener } from '@secberus/components';
import { SideNavDropdownProps } from './SideNavDropdown.types';
import {
  Container,
  TextContainer,
  MainText,
  SubText,
  StyledChevronDown,
  DropdownList,
} from './SideNavDropdown.styled';

export const SideNavDropdown = ({
  variant,
  listOptions,
  dividerTop,
  dividerBottom,
  icon,
  text,
  subText,
  menuPortalTarget,
  DropdownListProps,
  ListProps,
}: SideNavDropdownProps) => {
  const [showDropdownList, setShowDropdownList] = React.useState(false);
  const controlRef = React.useRef<HTMLDivElement | null>(null);
  const Menu = menuPortalTarget ? MenuPortal : React.Fragment;
  const menuProps = menuPortalTarget
    ? { appendTo: menuPortalTarget, controlElement: controlRef?.current }
    : {};

  const toggleDropdownList = () => {
    setShowDropdownList(prev => !prev);
  };

  return (
    <ClickAwayListener fullWidth onClickAway={() => setShowDropdownList(false)}>
      <Container
        variant={variant}
        dividerTop={dividerTop}
        dividerBottom={dividerBottom}
        ref={controlRef}
        onClick={toggleDropdownList}
      >
        <Flex alignItems="center" sx={{ gap: 8 }}>
          {icon && React.cloneElement(icon, { className: 'main-icon' })}
          <TextContainer>
            <MainText variant={variant}>{text}</MainText>
            {subText && <SubText variant={variant}>{subText}</SubText>}
          </TextContainer>
        </Flex>
        <StyledChevronDown direction={showDropdownList ? 'UP' : 'DOWN'} />
      </Container>

      {showDropdownList && (
        <Menu {...menuProps}>
          <DropdownList elevation direction="UP" {...DropdownListProps}>
            <List disableAnimation options={listOptions} {...ListProps} />
          </DropdownList>
        </Menu>
      )}
    </ClickAwayListener>
  );
};
