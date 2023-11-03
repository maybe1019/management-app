import React from 'react';
import { More } from '@secberus/icons';
import { Flex, Spinner } from '@chakra-ui/react';
import { ButtonDropdown } from '../..';
import {
  Container,
  ContainerContent,
  ContainerHeader,
  HeaderText,
} from './IndicatorContainer.styled';
import { IndicatorContainerProps } from './IndicatorContainer.types';

export const IndicatorContainer: React.FC<IndicatorContainerProps> = ({
  header,
  className,
  menuOptions,
  minHeight = undefined,
  children,
  isLoading = false,
  size = 'small',
}) => {
  return (
    <Container minHeight={minHeight} className={className}>
      <ContainerContent className="indicator-container-content">
        <ContainerHeader className="indicator-container-header">
          <HeaderText>{header}</HeaderText>
          {menuOptions && (
            <ButtonDropdown
              options={menuOptions}
              icon={true}
              label={<More />}
              size={size}
              variant="tertiary"
              listWidth="188px"
              listTop="30px"
              alignRight
              className="indicator-container-button-dropdown"
            />
          )}
        </ContainerHeader>
        {isLoading ? (
          <Flex
            paddingTop="8px"
            h="100%"
            paddingBottom="8px"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner />
          </Flex>
        ) : (
          children
        )}
      </ContainerContent>
    </Container>
  );
};
