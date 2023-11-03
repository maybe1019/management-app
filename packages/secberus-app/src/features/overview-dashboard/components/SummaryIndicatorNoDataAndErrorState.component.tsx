import { Box, Flex } from '@chakra-ui/react';
import { NoDataBlock } from '@secberus/components';

export const SummaryIndicatorNoDataAndErrorState = () => (
  <Flex
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    height="100%"
  >
    <Box marginBottom="16px">
      <NoDataBlock />
    </Box>
  </Flex>
);
