import React from 'react';
import { Text } from '../text/Text.component';
import {
  DropdownPanelList,
  DropdownPanelContainer,
} from './DropdownPanel.styled';
import { DropdownPanelProps } from './DropdownPanel.types';

export const DropdownPanel: React.FC<DropdownPanelProps> = ({
  title,
  titleTextProps,
  children,
}) => {
  return (
    <DropdownPanelContainer>
      <Text
        type="xsmall-bold"
        color="gray"
        className="title"
        {...titleTextProps}
      >
        {title}
      </Text>
      <DropdownPanelList>{children}</DropdownPanelList>
    </DropdownPanelContainer>
  );
};
