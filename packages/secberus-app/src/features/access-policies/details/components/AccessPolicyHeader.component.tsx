import { Spinner, Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Text } from '@secberus/components';
import { AccessPolicy } from '@secberus/services';

export function AccessPolicyHeader({
  name,
  description,
  secberus_managed,
  isLoading = false,
}: Partial<AccessPolicy> & { isLoading?: boolean }) {
  return (
    <GridItem height="100%" bg="#F1F6FA" padding="32px">
      <Flex direction="column" sx={{ gap: '8px' }}>
        <Grid
          flex="1"
          w="100%"
          h="100%"
          alignItems="center"
          templateColumns="repeat(1, 1fr) 320px"
        >
          {!isLoading ? (
            <>
              <Flex wrap="wrap" direction="column">
                <Box marginBottom="8px">
                  <Text type="medium">{name}</Text>
                </Box>
                <Text type="small-regular" color="dark">
                  {description}
                </Text>
              </Flex>
              <Flex justifyContent="right">
                <Box
                  width="264px"
                  background="white"
                  padding="16px"
                  borderRadius="8px"
                >
                  <Flex direction="row">
                    <Text type="small-regular">Policy author:&nbsp;</Text>
                    <Text type="small-bold">
                      {secberus_managed ? 'Secberus' : 'Custom'}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </>
          ) : (
            <Flex alignItems="center">
              <Spinner />
            </Flex>
          )}
        </Grid>
      </Flex>
    </GridItem>
  );
}
