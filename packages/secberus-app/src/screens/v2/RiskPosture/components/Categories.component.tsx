import React from 'react';
import { useHistory } from 'react-router-dom';
import { GridItem, Flex } from '@chakra-ui/react';
import { TableGW } from '@secberus/components';
import {
  camelToSnakeObjectKeys,
  useDeepEffect,
  useIsLoading,
} from '@secberus/utils';
import {
  CategoryType,
  GetRiskPostureApiResponse,
  secberusApiGW,
} from '@secberus/services';
import { MissingResourcesGuard } from '../../../../components/Placeholder/MissingResourcesGuard';
import { categoryColumns } from '../RiskPosture.columns';
import { HoveredExpanderCell } from '../../../../components';
import { useWidgets } from '../../../../features/widgets';
import { Filter } from '../../../../features/filter-panel/FilterPanel.component';

type CategoriesProps = {
  filters: Partial<Record<Filter, string[]>>;
  onChange?: (result: GetRiskPostureApiResponse) => void;
  onWidgetClick?: (type: string, data: any) => void;
};
export const Categories = ({
  filters,
  onChange,
  onWidgetClick,
}: CategoriesProps) => {
  const history = useHistory();

  const [
    getRiskPosture,
    { data: postureData = { categories: [] }, isUninitialized, isLoading },
  ] = secberusApiGW.useGetRiskPostureMutation();

  const widgets = useWidgets({
    widgets: ['risk', 'violations', 'policy'],
    posture: postureData,
    onClick: onWidgetClick,
  });

  //@ts-expect-error not typed
  const handleRowClick = (record, index, event) => {
    history.push(`category/details/${record.id}`);
  };

  const isTableLoading = useIsLoading([isUninitialized, isLoading]);

  useDeepEffect(() => {
    getRiskPosture({
      riskPostureParams: {
        ...camelToSnakeObjectKeys(filters),
        category_type: ['SECURITY'] as CategoryType[],
      },
    });
  }, [filters]);

  useDeepEffect(() => {
    onChange?.(postureData);
  }, [postureData]);

  return (
    <>
      <MissingResourcesGuard resources={['dataSources', 'policies']}>
        <GridItem height="100%" colSpan={5} padding="32px 32px 24px 32px">
          <Flex justify="left" gap="20px" wrap="wrap" sx={{ gap: '20px' }}>
            {widgets}
          </Flex>
        </GridItem>
        <GridItem paddingBottom="72px" paddingLeft="32px" paddingRight="32px">
          <TableGW
            isLoading={isTableLoading}
            columns={categoryColumns}
            // @ts-expect-error not typed :(
            data={postureData.categories}
            key="categories-table"
            onRow={(record, index) => ({
              onClick: handleRowClick.bind(null, record, index),
            })}
            rowHoverBehavior={{
              cursor: 'pointer',
              injectedStyles: HoveredExpanderCell,
            }}
          />
        </GridItem>
      </MissingResourcesGuard>
    </>
  );
};
