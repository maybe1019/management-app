import React from 'react';
import { Text } from '@secberus/components';
import { SecberusSymbolDark } from '@secberus/icons';
import { useAppRedirect } from '../../../../utils/useAppRedirect';
import { LogoWrapper, StyledNavLink } from './BackToAppButton.styled';

export const BackToAppButton = () => {
  const { navigateBack } = useAppRedirect();
  return (
    <StyledNavLink onClick={() => navigateBack()}>
      <LogoWrapper>
        <SecberusSymbolDark width={24} height={24} />
      </LogoWrapper>
      <Text className="text" type="small-bold">
        Back to app
      </Text>
    </StyledNavLink>
  );
};
