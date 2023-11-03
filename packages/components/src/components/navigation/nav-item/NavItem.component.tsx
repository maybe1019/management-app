import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Text } from '../../text';
import { NavItemProps, NavItemExpandableProps } from './NavItem.types';
import {
  StyledNavLink,
  StyledNavButton,
  StyledNavItem,
  StyledNavItemIcon,
  StyledNavItemExpandableBody,
  StyledChevronDown,
  StyledChevronRight,
  NavItemWrapper,
} from './NavItem.styled';

const NavItemIcon = ({ icon, paddingRight }: any) => {
  return (
    <StyledNavItemIcon paddingRight={paddingRight}>{icon}</StyledNavItemIcon>
  );
};

const NavItemExpandable = ({
  to,
  open,
  title,
  children,
}: NavItemExpandableProps) => {
  return (
    <div>
      <StyledNavLink id={title} to={String(to)} parentNavLink>
        <Text type="small-bold" color="white">
          {title}
        </Text>
        <NavItemIcon
          icon={open ? <StyledChevronDown /> : <StyledChevronRight />}
        />
      </StyledNavLink>
      <StyledNavItemExpandableBody open={open}>
        {children}
      </StyledNavItemExpandableBody>
    </div>
  );
};

export const NavItem: React.FC<NavItemProps> = ({
  variant,
  horizontalSpacing = 'normal',
  verticalSpacing = { top: 8, bottom: 8 },
  children,
  to,
  activeItem,
  onActiveChange,
  id,
  onClick,
  alignRight,
  alignLeft,
  render: Render,
  visibleAfter,
  icon,
  nested,
  external,
}) => {
  const baseProps = {
    onClick,
    id,
    alignRight,
    alignLeft,
    visibleAfter,
  };
  const colorVariant = variant === 'light' ? 'dark' : 'white';
  const linkProps = {
    ...baseProps,
    onClick: () => onActiveChange && onActiveChange(to!),
    isActive: () => activeItem!.startsWith(id as string),
    activeClassName: 'active',
    to: to!,
  };
  const spacingProps = {
    horizontalSpacing,
    verticalSpacing,
  };
  if (external) {
    return (
      <NavItemWrapper {...spacingProps}>
        <a href={to} rel="noopener noreferrer" target="_blank">
          <Flex>
            {icon && <NavItemIcon icon={icon} paddingRight />}
            <Text type="small-bold" color={colorVariant}>
              {children}
            </Text>
          </Flex>
        </a>
      </NavItemWrapper>
    );
  }
  if (Render)
    return (
      <NavItemWrapper {...spacingProps}>
        <StyledNavItem {...baseProps}>
          <Render />
        </StyledNavItem>
      </NavItemWrapper>
    );
  if (onClick)
    return (
      <NavItemWrapper {...spacingProps}>
        <StyledNavButton {...baseProps}>
          {icon && <NavItemIcon icon={icon} paddingRight />}
          <Text type="small-bold" color={colorVariant}>
            {children}
          </Text>
        </StyledNavButton>
      </NavItemWrapper>
    );
  if (nested) {
    const isParentOpen = () => {
      let isOpen = false;
      if (activeItem === id) {
        isOpen = true;
      }

      nested
        .map(item => item.id)
        .forEach(id => {
          if (activeItem?.startsWith(String(id))) {
            isOpen = true;
          }
        });

      return isOpen;
    };

    return (
      <NavItemWrapper {...spacingProps}>
        <NavItemExpandable
          to={nested[0].to}
          title={children}
          open={isParentOpen()}
        >
          {nested.map(link => {
            const nestedLinkProps = {
              ...baseProps,
              onClick: () => onActiveChange && onActiveChange(link.to!),
              isActive: () => activeItem!.startsWith(link.id!),
              activeClassName: 'active',
              to: link.to!,
            };

            return (
              <StyledNavLink {...nestedLinkProps}>
                <Text type="small-regular" color={colorVariant}>
                  {link.title}
                </Text>
              </StyledNavLink>
            );
          })}
        </NavItemExpandable>
      </NavItemWrapper>
    );
  }
  if (to)
    return (
      <NavItemWrapper {...spacingProps}>
        <StyledNavLink {...linkProps}>
          {icon && <NavItemIcon icon={icon} paddingRight />}
          <Text type="small-bold" color={colorVariant}>
            {children}
          </Text>
        </StyledNavLink>
      </NavItemWrapper>
    );
  return (
    <NavItemWrapper {...spacingProps}>
      <StyledNavItem {...baseProps} onClick={onClick}>
        {icon && <NavItemIcon icon={icon} paddingRight />}
        <Text type="small-bold" color={colorVariant}>
          {children}
        </Text>
      </StyledNavItem>
    </NavItemWrapper>
  );
};
