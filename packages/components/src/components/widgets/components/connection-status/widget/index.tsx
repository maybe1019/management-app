import React from 'react';
import { Flex } from '@chakra-ui/react';
import { WidgetContainer } from '../../../containers';
import { ConnectionStatusBadge } from '../../../../badges';

export const ConnectionStatusWidget = ({
  title = 'Collection status',
  success = 0,
  fail = 0,
  ...props
}) => (
  <WidgetContainer title={title}>
    <Flex
      justifyContent="space-between"
      alignItems="center"
      sx={{ mt: 8, gap: 55 }}
    >
      <ConnectionStatusBadge
        type="success"
        iconSize="medium"
        iconTextSpacing={8}
        status={{ message: String(success), reason: 'Successful' }}
        statusMessageTextProps={{ type: 'bold', color: 'dark' }}
        statusReasonTextProps={{ type: 'xsmall-bold', color: 'gray' }}
      />
      <ConnectionStatusBadge
        type="failure"
        iconSize="medium"
        iconTextSpacing={8}
        status={{ message: String(fail), reason: 'Unable to collect' }}
        statusMessageTextProps={{ type: 'bold', color: 'dark' }}
        statusReasonTextProps={{ type: 'xsmall-bold', color: 'gray' }}
      />
    </Flex>
  </WidgetContainer>
);
