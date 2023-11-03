import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { SecberusSymbolDark, Times } from '@secberus/icons';
import { Box, Flex } from '@chakra-ui/react';
import { useMediaQuery } from '@secberus/utils';
import { Text } from '../text';
import { CloseButton, StyledAppBar, Tag } from './AppBar.styled';
import { AppBarProps } from './AppBar.types';

export const AppBar = ({ title, onClose, tag }: AppBarProps) => {
  const theme = useContext(ThemeContext);
  const mobileMQuery = useMediaQuery(theme.breakpoints.mobileM);
  return (
    <StyledAppBar>
      <Flex alignItems="center" gridGap="16px">
        <SecberusSymbolDark width="32px" height="32px" />
        <Box display="flex" gridGap="8px">
          <Text type={mobileMQuery ? 'small' : 'xsmall'} color="white">
            {title}
          </Text>
          {tag && (
            <Tag>
              <Text type="xsmall-bold" color="white">
                {tag}
              </Text>
            </Tag>
          )}
        </Box>
      </Flex>
      <CloseButton variant="icon" icon onClick={onClose}>
        <Times color={theme.colors.white} width="24px" height="24px" />
      </CloseButton>
    </StyledAppBar>
  );
};
