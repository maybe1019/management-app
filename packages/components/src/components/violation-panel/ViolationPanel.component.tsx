import React from 'react';
import {
  CopyLink,
  TimesLight,
  ChevronLeftLight,
  ChevronRightLight,
  ExceptionLight,
  Violation,
} from '@secberus/icons';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { capitalize, createEnvAwareLogger } from '@secberus/utils';
import { Text } from '../text';
import { Button } from '../button';
import { theme } from '../../styles/theme';
import { getPriorityStatusString } from '../../utils/getPriorityStatusString';
import { CodeBlock } from '../code-block';
import { StyledPre } from '../index';
import { BaseBadge } from '../badges';
import { TableGW } from '../table2';
import {
  SlidePanelBlockSection,
  SlidePanelGridRow,
} from '../slide-panel/SlidePanel.component';
import {
  SlidePanelBody,
  SlidePanelButtonContainer,
  SlidePanelContent,
  SlidePanelHeader,
  SlidePanelHeaderControls,
  SlidePanelMetaTextContainer,
  SlidePanelScrollbox,
  SlidePanelTitle,
  SlidePanelToggleBoxTrigger,
  SlidePanelToggleBox,
} from '../slide-panel/SlidePanel.styled';
import { ViolationPanelProps } from './ViolationPanel.types';

import {
  SeverityBar,
  FlexContainer,
  TableWrapper,
} from './ViolationPanel.styled';

interface TableTagData {
  property: string;
  value?: string | number | boolean | null;
}

const Compare = (prev: any, next: any) => {
  return isEqual(prev, next);
};

const EmptyText = () => (
  <Flex paddingBottom="68px">
    <Text type="xsmall-regular" color="extra-dark">
      No tags detected
    </Text>
  </Flex>
);

export const ViolationPanelComponent = React.memo(
  (props: ViolationPanelProps) => {
    const {
      isLoading,
      onClose,
      data: {
        showRemediation,
        showResourceData,
        showMarkException,
        resourceType,
        violation,
        policy,
        pagination,
        callbacks,
      },
    } = props;
    const logger = createEnvAwareLogger();
    const [isSuppressed, setIsSuppressed] = React.useState<boolean>(
      violation?.suppressed || false
    );
    const [clipboardAvailable] = React.useState(!!navigator.clipboard);
    const [tableData, setTableData] = React.useState<TableTagData[]>([]);

    React.useEffect(() => {
      setIsSuppressed(violation?.suppressed ?? false);

      setTableData(() => {
        const tags = violation?.tags || {};
        return Object.keys(tags).map(property => {
          // @ts-expect-error poorly typed object from generated types
          const value = tags[property];
          return {
            property,
            value: typeof value === 'boolean' ? String(value) : value,
          };
        });
      });
    }, [violation]);

    const getSeverity = React.useCallback(() => {
      if (!policy?.severity) return undefined;
      const str = String(
        getPriorityStatusString(policy?.severity)
      ).toLowerCase();
      return capitalize(str);
    }, [policy?.severity]);

    const handleToggleResourceData = () => {
      callbacks.setShowResourceData(prevState => !prevState);
    };

    const handleToggleRemediation = () => {
      callbacks.setShowRemediation(prevState => !prevState);
    };

    const handlePaginate = (operation: 'increment' | 'decrement') => {
      if (typeof callbacks.handlePaginate === 'function') {
        callbacks.handlePaginate(operation, violation!.id);
      }
    };

    /**
     * Copies the current violation link to the clipboard using the
     * browser's Clipboard API. If it is not available
     */
    const handleCopyLink = () => {
      if (clipboardAvailable) {
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => {
            if (typeof callbacks.notifyLinkCopySuccess === 'function') {
              callbacks.notifyLinkCopySuccess();
            }
          })
          .catch(error => {
            logger.log('Error copying violation link', error);
          });
      }
    };

    const handleToggleMarkException = () => {
      if (!violation) return;
      if (typeof callbacks?.toggleMarkException === 'function') {
        callbacks.toggleMarkException(violation.id, isSuppressed);
      }
      setIsSuppressed(prevState => !prevState);
    };

    const handleClose = () => onClose?.();

    return (
      <SlidePanelContent>
        <SlidePanelHeader>
          <SeverityBar priority={String(getSeverity()).toUpperCase()} />
          <FlexContainer>
            <span>
              {isSuppressed ? (
                <BaseBadge>
                  <ExceptionLight /> Exception
                </BaseBadge>
              ) : (
                <BaseBadge background="light-red" color="red">
                  <Violation color={theme.colors.red} /> Active
                </BaseBadge>
              )}
            </span>
            <SlidePanelHeaderControls>
              {/* don't support pagination in certain cases - e.g. if we link directly to the violation. Should possible be split into two different components for cleanliness */}
              {pagination.showControls && (
                <Flex alignItems="center">
                  <div className="position">
                    {`${pagination.currentIndex + 1} of ${pagination.total}`}
                  </div>
                  <Button
                    icon
                    variant="tertiary"
                    onClick={() => handlePaginate('decrement')}
                    disabled={pagination.loading || pagination.currentIndex < 1}
                  >
                    <ChevronLeftLight />
                  </Button>
                  <Button
                    icon
                    variant="tertiary"
                    onClick={() => handlePaginate('increment')}
                    disabled={
                      pagination.loading ||
                      pagination.currentIndex + 1 === pagination.total
                    }
                  >
                    <ChevronRightLight />
                  </Button>
                  {pagination.loading && <Spinner />}
                </Flex>
              )}
              <Button
                className="close-icon"
                icon
                variant="tertiary"
                onClick={handleClose}
              >
                <TimesLight />
              </Button>
            </SlidePanelHeaderControls>
          </FlexContainer>
          <SlidePanelTitle>Violation details</SlidePanelTitle>
          <SlidePanelMetaTextContainer>
            <Text type="small-regular">
              Last detected: {props.data?.time?.lastDetected}
            </Text>
            <Text type="small-regular">
              Exposure: {props.data?.time?.exposure}
            </Text>
          </SlidePanelMetaTextContainer>
          <SlidePanelButtonContainer>
            {clipboardAvailable && (
              <Button
                icon
                size="small"
                desc="Copy link to violation"
                onClick={handleCopyLink}
              >
                <CopyLink width={24} height={24} color="white" />
              </Button>
            )}
            {showMarkException && (
              <Button size="small" onClick={handleToggleMarkException}>
                {isSuppressed ? 'Un-mark' : 'Mark'} as exception
              </Button>
            )}
          </SlidePanelButtonContainer>
        </SlidePanelHeader>
        <SlidePanelBody>
          <SlidePanelScrollbox>
            <SlidePanelBlockSection title="Policy details">
              <SlidePanelGridRow label="Severity">
                <Text type="small-regular">{getSeverity()}</Text>
              </SlidePanelGridRow>
              <SlidePanelGridRow label="Policy name">
                <Text type="small-regular">{policy?.name}</Text>
              </SlidePanelGridRow>
              <SlidePanelGridRow label="Category">
                <Text type="small-regular">{violation?.category_name}</Text>
              </SlidePanelGridRow>
              <SlidePanelGridRow label="Remediation">
                <SlidePanelToggleBoxTrigger onClick={handleToggleRemediation}>
                  {showRemediation ? 'Hide' : 'Show'} suggested steps
                </SlidePanelToggleBoxTrigger>
                <SlidePanelToggleBox show={showRemediation}>
                  <StyledPre wrapText>
                    <Text type="small-regular">
                      {policy?.remediation_steps || 'None'}
                    </Text>
                  </StyledPre>
                </SlidePanelToggleBox>
              </SlidePanelGridRow>
            </SlidePanelBlockSection>
            <SlidePanelBlockSection title="Resource affected">
              <SlidePanelGridRow label="Type">
                <>
                  {policy && (
                    <BaseBadge
                      transparent
                      iconMap="resource"
                      icon={
                        policy?.datasource_types
                          ? policy.datasource_types[0]
                          : (undefined as any)
                      }
                    >
                      <Text type="small-regular">{resourceType}</Text>
                    </BaseBadge>
                  )}
                </>
              </SlidePanelGridRow>
              <SlidePanelGridRow label="Data source">
                <>
                  {policy && (
                    <BaseBadge
                      transparent
                      iconMap="datasource"
                      icon={
                        policy?.datasource_types
                          ? policy.datasource_types[0]
                          : (undefined as any)
                      }
                    >
                      <Text type="small-regular">
                        {violation?.datasources[0].name}
                      </Text>
                    </BaseBadge>
                  )}
                </>
              </SlidePanelGridRow>
              <SlidePanelGridRow label="Resource data">
                <SlidePanelToggleBoxTrigger onClick={handleToggleResourceData}>
                  {showResourceData ? 'Hide' : 'Show'} resource data
                </SlidePanelToggleBoxTrigger>
                <SlidePanelToggleBox show={showResourceData}>
                  {violation?.resource?.data && (
                    <CodeBlock data={violation.resource.data as any} />
                  )}
                </SlidePanelToggleBox>
              </SlidePanelGridRow>
            </SlidePanelBlockSection>

            <TableWrapper>
              <TableGW
                columns={[
                  {
                    key: 'tag_property',
                    dataIndex: 'tag_property',
                    title: 'Resource tags',
                    width: 224,
                    render: (_val, row) => (
                      <Text type="xsmall-regular" color="extra-dark">
                        {row.property}
                      </Text>
                    ),
                  },
                  {
                    key: 'tag_value',
                    dataIndex: 'tag_value',
                    title: '',
                    width: 480,
                    render: (_val, row) => (
                      <Text type="xsmall-regular" color="extra-dark">
                        {row.value}
                      </Text>
                    ),
                  },
                ]}
                data={tableData}
                emptyText={EmptyText}
              />
            </TableWrapper>
          </SlidePanelScrollbox>
        </SlidePanelBody>
        {isLoading && (
          <Box position="absolute" top="50%" left="50%">
            <Spinner size="xl" />
          </Box>
        )}
      </SlidePanelContent>
    );
  },
  Compare
);
