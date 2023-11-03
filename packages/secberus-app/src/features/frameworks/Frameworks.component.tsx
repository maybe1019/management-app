import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text, TableGW, PageHeader } from '@secberus/components';
import { complianceFrameworksApi } from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { useFrameworkColumns } from './Frameworks.columns';
import { TableWrapper } from './Frameworks.styled';

export const Frameworks = () => {
  const [toggle] = complianceFrameworksApi.useToggleFrameworkMutation();

  const {
    data: frameworks = [],
    isUninitialized,
    isLoading,
    isFetching,
  } = complianceFrameworksApi.useGetComplianceFrameworksQuery(
    {},
    {
      selectFromResult: ({ data, ...remainder }) => ({
        /**
         * Workaround: filter out `children` to avoid rc-table automatically treating as
         * expandable column.
         * @see https://github.com/secberus/secberus-app/pull/2486#discussion_r1120813607
         */
        data: data?.length ? data.map(({ children, ...rest }) => rest) : [],
        ...remainder,
      }),
    }
  );

  const handleToggle = React.useCallback(
    async (frameworkId: string, enabled: boolean) => {
      /*
       The backend handles the toggling, so we send the existing "enabled" value
       instead of the intended state.
      */
      await toggle({
        frameworkId,
        complianceFrameworkPatch: { enabled: !enabled },
      });
    },
    [toggle]
  );

  const isTableLoading = useIsLoading([isUninitialized, isLoading, isFetching]);

  const columns = useFrameworkColumns({ handleToggle });

  return (
    <Box w="100%">
      <Flex w="100%" direction="column">
        <Flex w="100%" padding="0px">
          <PageHeader title="Manage frameworks" />
        </Flex>
        <Box
          paddingTop="16px"
          maxWidth="750px"
          paddingLeft="32px"
          paddingRight="32px"
        >
          <Text type="small-regular">
            Select which frameworks are active for this organization by toggling
            the status. This will also change the status of all policies mapped
            to the framework.
          </Text>
        </Box>
      </Flex>
      <Box h="100%" w="100%" padding="24px 32px 32px 32px">
        <TableWrapper>
          <TableGW
            columns={columns}
            data={frameworks}
            isLoading={isTableLoading}
            scroll={{ x: 1128 }}
            rowHoverBehavior={{
              background: 'white',
            }}
          />
        </TableWrapper>
      </Box>
    </Box>
  );
};
