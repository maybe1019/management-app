import React from 'react';
import { TablePlaceholderComponent, Text } from '@secberus/components';
import { Box, Flex } from '@chakra-ui/react';
import { ThemeContext } from 'styled-components';

const NO_RESULTS = 'No results';

export function DefaultRender() {
  const theme = React.useContext(ThemeContext);
  return (
    <Flex
      textAlign="center"
      alignItems="center"
      w="100%"
      h="100%"
      background={theme.colors['light-gray']}
      className="default-container"
    >
      <TablePlaceholderComponent
        iconProps={{
          height: 24,
          width: 24,
          margin: '0 auto',
        }}
        message={
          <Flex justifyContent="center">
            <Text type="small-bold" color="gray">
              {NO_RESULTS}
            </Text>
          </Flex>
        }
      >
        <Box mt="8px" p="0 40px">
          <Text type="small-regular" color="gray" align="center">
            Run a query to view results or select from the data browser
          </Text>
        </Box>
      </TablePlaceholderComponent>
    </Flex>
  );
}
