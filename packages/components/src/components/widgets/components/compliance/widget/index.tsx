import React from 'react';
import { Spinner, Flex } from '@chakra-ui/react';
import { ComplianceWidgetMain } from '../Compliance.types';
import { ComplianceSubwidget } from '../subwidget';
import { WidgetContainer } from '../../../containers';
import { Text } from '../../../../text';

export interface ComplianceMain extends ComplianceWidgetMain {
  title?: string;
  dataDurationText?: string;
}

export const ComplianceWidget: React.FC<ComplianceMain> = ({
  compliance = 0,
  title = 'Compliance',
  trendData,
  showTrendChart = true,
  dataDurationText,
  isLoading = false,
}) => (
  <WidgetContainer
    title={title}
    componentRight={
      <Text className="trend-text" type="xsmall-bold" color="gray">
        {dataDurationText}
      </Text>
    }
  >
    {isLoading ? (
      <Flex height="80px" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    ) : (
      <ComplianceSubwidget
        compliance={compliance}
        trendData={trendData}
        showTrendChart={showTrendChart}
      />
    )}
  </WidgetContainer>
);
