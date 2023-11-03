import React from 'react';
import { Box } from '@chakra-ui/react';
import { AppLogo as DefaultAppLogo } from '../logo';
import { NavItem } from './nav-item';
import { NavigationMain, NavItemsProps } from './Navigation.types';
import {
  NavigationWrapper,
  NavigationScrollbox,
  NavigationBody,
  NavigationFooter,
  NavItemsWrapper,
} from './Navigation.styled';

const NavItems = ({ variant, items, active, onChange }: NavItemsProps) => {
  return (
    <NavItemsWrapper>
      {items &&
        items.map(
          ({
            id,
            to,
            title,
            horizontalSpacing,
            verticalSpacing,
            alignRight,
            alignLeft,
            render,
            visibleAfter,
            onClick,
            icon,
            children,
            external,
          }) => (
            <NavItem
              variant={variant}
              onClick={onClick}
              to={to}
              key={id}
              id={id}
              horizontalSpacing={horizontalSpacing}
              verticalSpacing={verticalSpacing}
              alignRight={alignRight}
              alignLeft={alignLeft}
              onActiveChange={onChange}
              activeItem={active}
              render={render}
              visibleAfter={visibleAfter}
              icon={icon}
              nested={children}
              external={external}
            >
              {title}
            </NavItem>
          )
        )}
    </NavItemsWrapper>
  );
};

export const Navigation: React.FC<NavigationMain> = ({
  variant = 'dark',
  appLogoUrl,
  items,
  active,
  onChange,
  preventScroll,
  AppLogo,
}) => {
  return (
    <NavigationWrapper variant={variant}>
      <NavigationScrollbox variant={variant} preventScroll={preventScroll}>
        <NavigationBody>
          <Box margin="24px 0 24px 20px">
            {AppLogo !== null && (
              <>
                {AppLogo ? (
                  <AppLogo to={appLogoUrl} />
                ) : (
                  <DefaultAppLogo to={appLogoUrl} />
                )}
              </>
            )}
          </Box>
          <NavItems
            variant={variant}
            items={items.filter(
              item => !item.placement || item.placement === 'primary'
            )}
            active={active}
            onChange={onChange}
          />
          <NavItems
            variant={variant}
            items={items.filter(item => item.placement === 'secondary')}
            active={active}
            onChange={onChange}
          />
        </NavigationBody>
        <NavigationFooter>
          <NavItems
            variant={variant}
            items={items.filter(item => item.placement === 'footer')}
            active={active}
            onChange={onChange}
          />
        </NavigationFooter>
      </NavigationScrollbox>
    </NavigationWrapper>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { title: 'Navigation Bar' };
