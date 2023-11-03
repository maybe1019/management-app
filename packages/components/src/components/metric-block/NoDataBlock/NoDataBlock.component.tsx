import React from 'react';
import { InfoLight } from '@secberus/icons';
import { Text } from '../../text';
import { StyledNoDataBlock } from './NoDataBlock.styled';
import { NoDataBlockProps } from './NoDataBlock.types';

export const NoDataBlock: React.FC<NoDataBlockProps> = props => (
  <StyledNoDataBlock {...props}>
    <InfoLight width={24} height={24} />
    <Text color="gray" type="small-bold">
      No results available
    </Text>
  </StyledNoDataBlock>
);
