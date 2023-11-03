import React from 'react';
import { Button, Validation, Text } from '@secberus/components';
import { differenceWith, isEqual, omit, sortBy } from 'lodash';
import {} from 'styled-components/macro';
import { DeleteLight, PlusLight } from '@secberus/icons';
import { integrationsApi } from '@secberus/services';
import { Controller } from 'react-hook-form';
import { v4 } from 'uuid';
import { WORKFLOW_BLOCKLIST } from '../Workflows.constants';
import {
  ActionList,
  IntegrationContainer,
  IntegrationSelectionBox,
  StyledDropdown,
} from '../Workflows.styled';
import { isEmptyObject } from '@secberus/utils';

export const Integrations = ({ watch, control, errors }) => {
  const { data: { results: integrations } = { results: [] } } =
    integrationsApi.useListIntegrationsQuery(
      {
        limit: '500',
      },
      {
        selectFromResult: ({ data = [], ...remainder }) => {
          // cheapest without requiring a second memo
          // we're required to filter here because the
          // select component is unopinionated.
          // we need the ability to exclude from backend
          // to prevent this.
          // also since this is a JS file I refuse to deconstruct anything.
          const filteredData = data?.results?.filter(
            ({ type }) => !WORKFLOW_BLOCKLIST.includes(type)
          );
          return {
            data: {
              ...data,
              results: filteredData,
            },
            ...remainder,
          };
        },
      }
    );
  const { actions: formIntegrations } = watch();

  const [integrationBuckets, setIntegrationBuckets] = React.useState(
    formIntegrations && !isEmptyObject(formIntegrations)
      ? formIntegrations
      : { [v4()]: true }
  );

  const availableIntegrations = React.useMemo(() => {
    const orderByName = integration => integration.name.toLowerCase();

    const available = differenceWith(
      integrations,
      Object.values(formIntegrations ?? {}),
      isEqual
    );
    return sortBy(available, orderByName);
  }, [integrations, formIntegrations]);

  const integrationsList = React.useMemo(() => {
    const handleActionDelete = id => {
      const copy = { ...integrationBuckets };
      const omitted = omit(copy, id);
      setIntegrationBuckets(omitted);
    };

    return Object.keys(integrationBuckets).map(pseudoId => {
      return (
        <div
          css={`
            display: grid;
            align-items: center;
            grid-template-columns: min-content auto;
          `}
          key={pseudoId}
        >
          <IntegrationContainer>
            <Controller
              control={control}
              name={`actions[${pseudoId}]`}
              as={StyledDropdown}
              options={availableIntegrations}
              displayKey="name"
              placeholder={'Select integration'}
              maxRows={3}
              hasIcon
            />
          </IntegrationContainer>
          <Button
            icon
            key="deleteAction"
            variant="secondary"
            onClick={() => handleActionDelete(pseudoId)}
          >
            <DeleteLight />
          </Button>
        </div>
      );
    });
  }, [availableIntegrations, control, integrationBuckets]);

  return (
    <Validation
      error={errors}
      customError="Please select an action"
      css={`
        max-height: unset;
      `}
    >
      <IntegrationSelectionBox>
        <Text type="bold">Send to...</Text>
        {!integrations.length ? (
          <Button variant="secondary" to="/settings/integrations">
            <PlusLight />
            Create your first integration(s)
          </Button>
        ) : (
          <>
            <ActionList>{integrationsList}</ActionList>
            <Button
              icon
              variant="secondary"
              onClick={() =>
                setIntegrationBuckets({ ...integrationBuckets, [v4()]: true })
              }
            >
              <PlusLight />
            </Button>
          </>
        )}
      </IntegrationSelectionBox>
    </Validation>
  );
};
