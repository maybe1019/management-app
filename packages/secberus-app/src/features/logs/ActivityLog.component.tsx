import { Box } from '@chakra-ui/react';
import { ActivityLogTable } from './list';
import { useActivityLogHeader } from './hooks/useActivitylogHeader';
export const ActivityLog = () => {
  const { Header, queryParams } = useActivityLogHeader();
  return (
    <Box w="100%">
      {Header}
      <ActivityLogTable params={queryParams as Record<string, any>} />
    </Box>
  );
};
