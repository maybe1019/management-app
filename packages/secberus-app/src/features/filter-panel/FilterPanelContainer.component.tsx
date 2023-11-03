import React from 'react';
import { TimesLight } from '@secberus/icons';
import { Button } from '@secberus/components';
import { Box, Spinner } from '@chakra-ui/react';
import { ColorProperties } from '@secberus/components';
import {
  FilterHeader,
  Title,
  TopContentContainer,
  FilterScrollbox,
  ButtonContainer,
  FilterViewButton,
  FilterClearAllButon,
} from './FilterPanel.styled';

export interface PanelProps {
  activeCount?: number;
  onClose?: () => void;
  onClearAll?: () => void;
  isLoading?: boolean;
  title?: string;
  filterHeaderBackgroundColor?: ColorProperties;
}
export const FilterPanelContainer: React.FC<PanelProps> = ({
  onClose,
  onClearAll,
  activeCount = 0,
  isLoading,
  children,
  title = 'Filters',
  filterHeaderBackgroundColor,
}) => {
  return (
    <TopContentContainer>
      <FilterHeader backgroundColor={filterHeaderBackgroundColor}>
        <Title>{title}</Title>
        <Button
          icon
          variant="tertiary"
          onClick={onClose}
          data-test-id="closeModalButton"
        >
          <TimesLight />
        </Button>
      </FilterHeader>
      {isLoading && (
        <>
          <Spinner size="xl" position="absolute" top="25%" left="50%" />
          <Box
            position="absolute"
            width="100%"
            height="100%"
            background="#d7d7d73b"
          />
        </>
      )}
      <FilterScrollbox>{children}</FilterScrollbox>
      <ButtonContainer>
        <FilterViewButton onClick={onClose}>
          View {activeCount > 0 && `(${activeCount})`}
        </FilterViewButton>
        {onClearAll && (
          <FilterClearAllButon onClick={onClearAll}>
            Clear All
          </FilterClearAllButon>
        )}
      </ButtonContainer>
    </TopContentContainer>
  );
};
