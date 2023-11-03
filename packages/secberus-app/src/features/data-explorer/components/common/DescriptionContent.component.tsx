import { Flex } from '@chakra-ui/react';
import { Text } from '@secberus/components';
import { TextOverflow } from '.';

export type DescriptionContentProps = {
  description: string;
};

export function DescriptionContent({ description }: DescriptionContentProps) {
  return (
    <Flex margin="8px" ml="24px" justifyContent="space-between">
      <Text type="small-regular">{description}</Text>
    </Flex>
  );
}
