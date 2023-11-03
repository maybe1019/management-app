import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import { Text, TileSelect, PageHeader } from '@secberus/components';
import { integrationsApi } from '@secberus/services';
import { SpinnerContainer } from '../settings/Settings.styled';
import { useHasPermissions } from '../../app/abac/hooks/useHasPermissions';
import { useSelf } from '../../app/core/wrappers/WithFindSelf';
import { TextContainer, TileSelectContainer } from './Integrations.styled';
import { IntegrationsForm } from './Integrations.form';
import { Option } from './Integrations.types';
import { integrationOptions } from './integrations.constants';
import { ListRow } from './list/Row.component';
import { useGetIntegrationsPage } from './hooks';

export const Integrations: React.FC = () => {
  const {
    isIntegrationLoading,
    getIntegrationsByPage,
    page,
    integrations,
    PaginationComponent,
    limit,
  } = useGetIntegrationsPage();

  const allowCreateEdit = useHasPermissions(
    'api:integrations:create',
    'api:integrations:read',
    'api:integrations:update'
  );

  const { data: hasSplunkIntegration, ...getSplunkQuery } =
    integrationsApi.useGetSplunkQuery();
  const { data: hasSumoLogicIntegration, ...getSumoLogicQuery } =
    integrationsApi.useGetSumoLogicQuery();

  const { account_owner } = useSelf();

  React.useEffect(() => {
    getIntegrationsByPage({
      page: page || '1',
      limit,
    });
  }, [page, limit, getIntegrationsByPage]);

  const isLoading =
    getSplunkQuery.isLoading ||
    getSumoLogicQuery.isLoading ||
    isIntegrationLoading;
  const hasSplunk = getSplunkQuery.isSuccess;
  const hasSumoLogic = getSumoLogicQuery.isSuccess;

  const shouldHideTile = React.useCallback(
    (type: string, ownerRequired?: boolean) => {
      const ownerCheck = ownerRequired && !account_owner;
      switch (type) {
        case 'SPLUNK':
          return ownerCheck || hasSplunk;
        case 'SUMOLOGIC':
          return ownerCheck || hasSumoLogic;
        default:
          return false;
      }
    },
    [account_owner, hasSplunk, hasSumoLogic]
  );

  const [form, setForm] = React.useState<Option | null>(null);
  return (
    <>
      <Flex h="100%" w="100%" paddingBottom="8px" direction="column">
        <Flex paddingBottom="32px">
          <PageHeader title="Integrations" />
        </Flex>
        <Flex direction="column" paddingLeft="32px" paddingRight="40px">
          {allowCreateEdit && (
            <>
              <TextContainer>
                <Text type="bold">Create new integrations</Text>
              </TextContainer>
              <Flex paddingBottom="8px">
                <TileSelectContainer>
                  {integrationOptions.map(
                    (
                      { label, Component, ownerPermissionRequired, type },
                      idx
                    ) => {
                      return shouldHideTile(
                        type,
                        ownerPermissionRequired
                      ) ? null : (
                        <TileSelect
                          label={label}
                          onClick={() => {
                            setForm(integrationOptions[idx]);
                          }}
                        >
                          <Component />
                        </TileSelect>
                      );
                    }
                  )}
                </TileSelectContainer>
              </Flex>
            </>
          )}
          <Flex paddingTop="32px" paddingBottom="32px" flexDirection="column">
            <TextContainer>
              <Text type="bold">Active integrations</Text>
            </TextContainer>
            {isLoading ? (
              <SpinnerContainer>
                <Spinner />
              </SpinnerContainer>
            ) : integrations?.results?.length > 0 ? ( // if integrations exist
              <>
                {integrations.results.map(props => (
                  <ListRow allowEdit={allowCreateEdit} integration={props} />
                ))}
                {PaginationComponent}
              </>
            ) : (
              // if no integrations exist
              <Text type="small-regular">
                There are currently no active integrations. Add one above to get
                started.
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
      {form && (
        <IntegrationsForm
          integrationType={form?.type}
          modalTitle={form?.label}
          closeCallback={() => {
            setForm(null);
          }}
          submitCallback={async () => {
            setForm(null);
          }}
          visible={!!form}
        />
      )}
    </>
  );
};
