import React from 'react';
import { Text } from '..';
import { TileSelectProps } from './TileSelect.types';
import { TileSelectButton } from './TileSelect.styles';

export const TileSelectComponent: React.FC<TileSelectProps> = ({
  label,
  onClick,
  children,
}) => {
  return (
    <TileSelectButton onClick={onClick}>
      {children}
      <Text type="small-regular">{label}</Text>
    </TileSelectButton>
  );
};
