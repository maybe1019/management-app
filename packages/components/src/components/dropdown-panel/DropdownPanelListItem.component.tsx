import React from 'react';
import { ChevronDown } from '@secberus/icons';
import classNames from 'classnames';
import { Text } from '../text/Text.component';
import {
  DropdownPanelListItemContainer,
  DropdownPanelController,
} from './DropdownPanel.styled';
import { DropdownChildProps } from './DropdownPanel.types';

export const DropdownPanelListItem: React.FC<DropdownChildProps> = ({
  title,
  titleTextProps,
  displayOnly,
  children,
}) => {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  return (
    <li className={classNames([displayOnly ? 'display' : 'dropdown'])}>
      {!displayOnly && (
        <DropdownPanelController onClick={() => setIsActive(!isActive)}>
          <ChevronDown
            className={classNames([
              'dropdown-icon',
              { 'active-dropdown-icon': isActive },
            ])}
            width={24}
            height={24}
          />
          <Text
            className={classNames([
              'dropdown-title',
              { 'active-dropdown-title': isActive },
            ])}
            type="small-regular"
            color="dark"
            {...titleTextProps}
          >
            {title}
          </Text>
        </DropdownPanelController>
      )}
      <DropdownPanelListItemContainer>
        {displayOnly ? (
          <>{children}</>
        ) : (
          <div className={classNames(['child-content', { active: isActive }])}>
            {children}
          </div>
        )}
      </DropdownPanelListItemContainer>
    </li>
  );
};
