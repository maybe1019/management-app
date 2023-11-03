import { Flex, Box } from '@chakra-ui/react';
import { Text } from '@secberus/components';
import { TextOverflow } from './';
export type ValueWithTypeProps = {
  value: string;
  type: string;
};

export function ValueWithType({ value, type }: ValueWithTypeProps) {
  return (
    <Flex margin="8px" ml="32px" justifyContent="space-between">
      <TextOverflow textAlign="left" w="50%">
        <Text type="small-regular" className="column-name">
          {value}
        </Text>
      </TextOverflow>
      <TextOverflow textAlign="right" w="50%">
        <Text className="column-type" type="small-regular" color="gray">
          {type}
        </Text>
      </TextOverflow>
    </Flex>
  );
}
