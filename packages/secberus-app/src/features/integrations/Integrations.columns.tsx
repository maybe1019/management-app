import React from 'react';
import { BaseBadge, Text, Button } from '@secberus/components';
import { Flex, Spacer, Box } from '@chakra-ui/react';
import { StyledSettingsLight } from './Integrations.styled';
import { RowProps } from './Integrations.types';
import { verifiableIntegrations } from './integrations.constants';
interface UseColumns {
  editProps: Record<string, (...args: any) => any>;
}
export const useColumns = ({ editProps: { handleClick } }: UseColumns) => {
  const columns = React.useMemo(
    () => [
      {
        key: 'name',
        title: 'Name',
        cellContent: ({ row: { name, type } }: RowProps) => {
          type IntegrationType = `${Lowercase<ReturnType<() => typeof type>>}`;
          return (
            <div>
              <BaseBadge
                label={name}
                icon={type.toLowerCase() as IntegrationType}
              />
            </div>
          );
        },
      },
      {
        key: 'url',
        title: 'Destination',
        cellContent: ({ row: { url, email } }: RowProps) => (
          <div>
            <Text type="small-bold">{url || email}</Text>``
          </div>
        ),
      },
      {
        key: 'edit',
        disableSort: true,
        title: '',
        width: 140,
        cellContent: ({ row }: RowProps) => {
          return (
            <Flex>
              <Box w="80px">
                {verifiableIntegrations.includes(row.type) &&
                  !row.verified &&
                  row.handleVerify && (
                    <Button
                      variant="primary"
                      size="small"
                      onClick={row.handleVerify}
                    >
                      Verify
                    </Button>
                  )}
              </Box>
              <Spacer />
              <Box w="60px">
                <Button
                  size="small"
                  onClick={() => handleClick(row)}
                  variant="secondary"
                  icon
                >
                  <StyledSettingsLight />
                </Button>
              </Box>
            </Flex>
          );
        },
      },
    ],
    [handleClick]
  );

  return columns;
};
