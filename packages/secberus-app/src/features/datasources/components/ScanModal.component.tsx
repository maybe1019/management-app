import React from 'react';
import styled from 'styled-components';
import { Flex } from '@chakra-ui/react';
import { BaseModal, Button, Text } from '@secberus/components';
import { dataSourceApi } from '@secberus/services';

interface DataSourceProps {
  datasourceId: string;
  name: string;
  open: boolean;
  onRequestClose: () => void;
}

export const StyledModal = styled(BaseModal)`
  min-width: 490px;
  max-width: 490px;
`;

export const ScanDataSourceModal = ({
  datasourceId,
  name,
  open,
  onRequestClose,
}: DataSourceProps) => {
  const [scanDatasources, { isLoading }] =
    dataSourceApi.useScanDatasourcesMutation();

  React.useEffect(() => {
    (async () => {
      if (open) {
        await scanDatasources({ idList: [datasourceId] });
      }
    })();
  }, [datasourceId, open, scanDatasources]);

  return (
    <>
      {open ? (
        <StyledModal
          //@ts-expect-error badly typed
          fixedOverScreen
          variant="light"
          title="Data source scan scheduled"
          handleClose={onRequestClose}
          isVisible={open}
          isLoading={isLoading}
        >
          <Text type="small-regular">
            The scan of data source <strong>{name}</strong> you requested has
            been scheduled. The scan could take up to 15 minutes. The Last
            attempt timestamp will update when the scan has finished. Please
            check back or refresh the screen to see the updates.
          </Text>
          <Flex pt="48px">
            <Button onClick={onRequestClose}>Close</Button>
          </Flex>
        </StyledModal>
      ) : null}
    </>
  );
};
