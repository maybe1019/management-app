import React from 'react';
import { Text } from '@secberus/components';
import { Spinner } from '@chakra-ui/react';
import {
  TabBarContainer,
  TagContainer,
  TextContainer,
  ResetButton,
} from './TagBar.styled';
import { TagList } from './TagList.component';

interface TagBarProps
  extends Omit<React.ComponentProps<typeof TagList>, 'tagContent'> {
  reset: () => void;
  onRemove: (kv: [string, string]) => void;
  unit: string;
  resultCount?: number;
  data: any;
  isLoading?: boolean;
}
export const TagBar: React.FC<TagBarProps> = ({
  reset,
  unit,
  resultCount,
  data,
  onRemove,
  charLimit = 100,
  isLoading,
}) => {
  return (
    <TabBarContainer>
      <TagContainer>
        {isLoading ? (
          <Spinner />
        ) : (
          <TagList data={data} charLimit={charLimit} onRemove={onRemove} />
        )}
      </TagContainer>
      <TextContainer>
        {typeof resultCount === 'number' && (
          <Text type="xsmall-regular">
            {resultCount} {unit}
          </Text>
        )}
        <Text color="light-gray">|</Text>
        <ResetButton onClick={() => reset()}>Reset filters</ResetButton>
      </TextContainer>
    </TabBarContainer>
  );
};
