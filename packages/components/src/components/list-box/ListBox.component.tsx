import React from 'react';
import { ListBoxComponentProps } from './ListBox.types';
import {
  ListBox,
  InfoContainer,
  TextContainer,
  TitleText,
  ActionContainer,
  Description,
} from './ListBox.styles';

export const ListBoxComponent: React.FC<ListBoxComponentProps> = ({
  title,
  description = '',
  startIcon,
  children,
}) => {
  const StartIconComponent = startIcon;
  return (
    <ListBox>
      <InfoContainer className={description?.length > 0 ? '' : 'centered'}>
        <StartIconComponent />
        <TextContainer className={description?.length > 0 ? '' : 'centered'}>
          <TitleText type="small-regular">{title}</TitleText>
          {description?.length > 0 ? (
            <Description>{description}</Description>
          ) : (
            <></>
          )}
        </TextContainer>
      </InfoContainer>
      <ActionContainer>{children}</ActionContainer>
    </ListBox>
  );
};
