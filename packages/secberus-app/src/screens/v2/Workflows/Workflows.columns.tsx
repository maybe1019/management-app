import React from 'react';
import {
  BaseBadge,
  Switch,
  Text,
  RCTableExtendedColumnType,
} from '@secberus/components';
import {
  DatasourceList,
  Workflow,
  PolicyCategoryList,
} from '@secberus/services';
import { Flex } from '@chakra-ui/react';
import { AnyFn, isEmptyObject } from '@secberus/utils';
import { OverlayExpanderCell } from '../../../components';
import ConditionHelper from './ConditionHelper';
import { ColContainer, ConditionSpacer } from './Workflows.styled';

interface UseWorkflowsColumnsProps {
  isAnyKeyLoading: boolean;
  statusProps: {
    handleChange: AnyFn;
  };
  omitColumns?: string[];
}

type ContextualWorkflow = Workflow & {
  isLoading: boolean;
  context: {
    dataSources: DatasourceList['results'];
    categories: PolicyCategoryList['results'];
  };
};

export const useColumns: ({
  isAnyKeyLoading,
  statusProps,
  omitColumns,
}: UseWorkflowsColumnsProps) => RCTableExtendedColumnType<ContextualWorkflow>[] =
  ({ isAnyKeyLoading, statusProps: { handleChange }, omitColumns = [] }) =>
    React.useMemo<RCTableExtendedColumnType<ContextualWorkflow>[]>(() => {
      const columns: RCTableExtendedColumnType<ContextualWorkflow>[] = [
        {
          key: 'name',
          title: 'Name',
          width: 300,
          resize: true,
          ellipsis: true,
          sort: true,
          fixed: true,
          render: (_data, row, _idx) => {
            const { name } = row;
            return (
              <OverlayExpanderCell buttonIcon="pen">
                <Text type="xsmall-regular" color="extra-dark">
                  {name}
                </Text>
              </OverlayExpanderCell>
            );
          },
        },
        {
          key: 'Trigger',
          title: 'Triggers',
          width: 600,
          resize: true,
          ellipsis: true,
          render: (_data, row, _idx) => {
            const { conditions, context } = row;
            const lastItemIdx = conditions.length - 1;
            return (
              <ColContainer fadeLeft dataFor="overflowCol">
                <Flex alignItems="center" flexWrap="wrap">
                  {conditions.length ? (
                    conditions.map((condition, i: number) => {
                      return (
                        <ConditionHelper
                          conditions={condition}
                          dataSources={context.dataSources}
                          categories={context.categories}
                          hasNext={lastItemIdx !== i} // @ts-expect-error row possibly undefined / never type
                          key={`${row.id + conditions.length}`}
                        />
                      );
                    })
                  ) : (
                    <Text type="xsmall-regular" color="extra-dark">
                      All violations
                    </Text>
                  )}
                </Flex>
              </ColContainer>
            );
          },
        },
        {
          key: 'Action',
          title: 'Action',
          width: 250,
          resize: true,
          ellipsis: true,
          render: (_data, row, _idx) => {
            const { actions } = row;
            const filteredActions = actions.filter(v => !isEmptyObject(v)); // If no actions are present, contains an empty obj
            return (
              <ColContainer fadeLeft>
                <BaseBadge
                  className="blue-rounded"
                  background="transparent"
                  padding="0px"
                >
                  <Text type="xsmall-regular" color="extra-dark">
                    Send to:&nbsp;
                  </Text>
                </BaseBadge>
                {filteredActions.map(({ alert }, i) => {
                  if (alert && 'integration_type' in alert && 'name' in alert) {
                    return (
                      <>
                        {i > 0 && i < filteredActions.length && (
                          <ConditionSpacer>,</ConditionSpacer>
                        )}
                        <BaseBadge
                          className="blue-rounded"
                          iconMap="integration"
                          icon={
                            alert.integration_type.toLowerCase() || 'webhook'
                          }
                          background="transparent"
                          padding="0px"
                          key={`${row.id + 'Action'}`}
                          iconColor={
                            alert.integration_type === 'EMAIL'
                              ? 'gray'
                              : undefined
                          }
                        >
                          <Text type="xsmall-regular" color="extra-dark">
                            {alert.name}
                          </Text>
                        </BaseBadge>
                      </>
                    );
                  }
                })}
              </ColContainer>
            );
          },
        },
        {
          key: 'status',
          title: 'Status',
          width: 78,
          render: (_data, row, _idx) => (
            <Flex align="center">
              <Switch
                initialChecked={row?.enabled}
                updateCheckboxState={() => handleChange(row)}
                // @ts-expect-error row won't be undefined
                key={`${row?.id + row?.enabled}`}
              />
            </Flex>
          ),
        },
      ];
      return columns.filter(o => !omitColumns.includes(o.key as string));
    }, [handleChange, omitColumns]);
