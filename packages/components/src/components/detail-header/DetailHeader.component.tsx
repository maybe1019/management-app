import React from 'react';
import { Text } from '../text';
import { DetailHeaderContainer } from './DetailHeader.styled';
import { DetailHeaderProps } from './DetailHeader.types';

export const DetailHeader: React.FC<DetailHeaderProps> = ({
  title,
  marginBottom = '32px',
  children,
}) => {
  return (
    <DetailHeaderContainer marginBottom={marginBottom}>
      <Text type="small" color="dark">
        {title}
      </Text>
      <div>{children}</div>
    </DetailHeaderContainer>
  );
};
