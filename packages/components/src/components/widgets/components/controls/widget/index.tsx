import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import { ControlsMain } from '../Controls.types';
import { ControlsSubwidget } from '../subwidget';
import { WidgetContainer } from '../../../containers';

interface ControlsComponentMain extends ControlsMain {
  title?: string;
}

export const ControlsWidget: React.FC<ControlsComponentMain> = ({
  pass,
  fail,
  title = 'Controls',
  isLoading = false,
}) => (
  <WidgetContainer title={title}>
    {isLoading ? (
      <Flex height="80px" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    ) : (
      <ControlsSubwidget pass={pass} fail={fail} />
    )}
  </WidgetContainer>
);
