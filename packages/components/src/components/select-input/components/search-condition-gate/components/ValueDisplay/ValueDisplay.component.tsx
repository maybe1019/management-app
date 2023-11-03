import React from 'react';
import { Text } from '../../../../../index';
import { ValueDisplayProps } from './ValueDisplay.types';
import { ValueDisplayContainer } from './ValueDisplay.styled';

export const ValueDisplay: React.FC<ValueDisplayProps> = ({
  displayOnlyText,
  displayOnlyColor = 'white',
  displayOnlyBackgroundColor = 'dark-gray',
  className,
}) => {
  return (
    <ValueDisplayContainer
      className={className}
      backgroundColor={displayOnlyBackgroundColor}
    >
      <Text type="small-bold" color={displayOnlyColor}>
        {displayOnlyText}
      </Text>
    </ValueDisplayContainer>
  );
};
