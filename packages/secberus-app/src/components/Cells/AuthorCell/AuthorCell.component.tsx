import React from 'react';
import { SecberusSymbolLight, UserLight } from '@secberus/icons';
import { IconSphere, Text } from '@secberus/components';
import { AuthorCellContent } from './AuthorCell.styled';
import { AuthorCellProps } from './AuthorCell.types';

export const AuthorCell = ({
  secberusManaged = true,
  textProps,
}: AuthorCellProps) => {
  const Icon = secberusManaged ? SecberusSymbolLight : UserLight;
  return (
    <AuthorCellContent>
      <IconSphere background={secberusManaged ? 'medium-gray' : 'light-blue'}>
        <Icon width="20px" height="20px" />
      </IconSphere>
      <Text type="small-regular" {...textProps}>
        {secberusManaged ? 'Secberus' : 'Custom'}
      </Text>
    </AuthorCellContent>
  );
};
