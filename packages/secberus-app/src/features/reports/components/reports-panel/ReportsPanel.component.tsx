import React from 'react';
import day from 'dayjs';
import { Flex, Spinner } from '@chakra-ui/react';
import { PenDark, TimesLight } from '@secberus/icons';
import { capitalize } from '@secberus/utils';
import { useHistory } from 'react-router-dom';
import { reportSchedulesApi } from '@secberus/services';
import {
  Text,
  Button,
  BaseBadge,
  BadgeIcon,
  TableGW,
  ConnectionStatusBadge,
} from '@secberus/components';
import {
  SlidePanelBody,
  SlidePanelButtonContainer,
  SlidePanelContent,
  SlidePanelHeader,
  SlidePanelHeaderControls,
  SlidePanelMetaTextContainer,
  SlidePanelScrollbox,
  SlidePanelTitle,
  SlidePanelToggleBox,
  SlidePanelToggleBoxTrigger,
  SlidePanelBlockSection,
  SlidePanelGridRow,
} from '@secberus/components';
import { useNotify } from '../../../../store';
import { ReportsPanelProps } from './ReportsPanel.types';
import { ResendEmailLink } from './ReportsPanel.styled';

export const ReportsPanelComponent: React.FC<ReportsPanelProps> = ({
  onClose,
  isLoading,
  data: {
    report,
    reportType,
    reportOwner,
    canEdit,
    showSources,
    callbacks,
  } = {},
}) => {
  const history = useHistory();
  const { notifySuccess } = useNotify();
  const handleToggleSource = () => {
    callbacks?.setShowSources(prevState => !prevState);
  };
  const [sendVerification, verificationEmail] =
    reportSchedulesApi.useSendVerificationMutation();

  const onResendEmail = async (email: string) => {
    sendVerification({
      sendVerification: { emails: [email] },
    });
  };

  React.useEffect(() => {
    if (verificationEmail.isSuccess)
      notifySuccess('Email verification was sent');
  }, [verificationEmail.isSuccess, notifySuccess]);

  return (
    <SlidePanelContent>
      {!isLoading ? (
        <>
          <SlidePanelHeader noMinHeight>
            <Flex justifyContent="flex-end">
              <SlidePanelHeaderControls>
                <Button
                  className="close-icon"
                  icon
                  variant="tertiary"
                  onClick={() => onClose?.()}
                >
                  <TimesLight />
                </Button>
              </SlidePanelHeaderControls>
            </Flex>
            <SlidePanelTitle>{report?.name}</SlidePanelTitle>
            <SlidePanelMetaTextContainer>
              <Text type="small-regular">{reportType}</Text>
            </SlidePanelMetaTextContainer>
            {report && canEdit && (
              <SlidePanelButtonContainer>
                <Button
                  size="small"
                  onClick={() => {
                    history.push(`/reports/edit/${report?.id}`);
                  }}
                >
                  <PenDark />
                  Edit report
                </Button>
              </SlidePanelButtonContainer>
            )}
          </SlidePanelHeader>
          <SlidePanelBody>
            <SlidePanelScrollbox>
              <SlidePanelBlockSection title="Report details">
                <SlidePanelGridRow label="Created on">
                  <Text type="small-regular">
                    {typeof report?.created_on === 'number' &&
                    report?.created_on !== 0 &&
                    day.unix(report?.created_on).isValid()
                      ? day.unix(report?.created_on).format('YYYY-MM-DD')
                      : '-'}
                  </Text>
                </SlidePanelGridRow>
                <SlidePanelGridRow label="Owner">
                  <Text type="small-regular">{reportOwner}</Text>
                </SlidePanelGridRow>
                <SlidePanelGridRow label="Frequency">
                  <Text type="small-regular">
                    {report?.interval
                      ? capitalize(report?.interval.toLowerCase())
                      : ''}
                  </Text>
                </SlidePanelGridRow>
                <SlidePanelGridRow label="Format">
                  <Text type="small-regular">PDF</Text>
                </SlidePanelGridRow>
                <SlidePanelGridRow label="Visibility">
                  <Text type="small-regular">Private</Text>
                </SlidePanelGridRow>
                {report?.emails && (
                  <Flex pt={40}>
                    <TableGW
                      isLoading={isLoading}
                      columns={[
                        {
                          key: 'recipients',
                          dataIndex: 'recipients',
                          title: 'Recipients',
                          width: 344,
                          render: (_val, row) => (
                            <Text type="xsmall-regular">{row.email}</Text>
                          ),
                        },
                        {
                          key: 'verified',
                          dataIndex: 'verified',
                          title: 'Status',
                          width: 225,
                          render: (_val, row) => {
                            const message = row.verified
                              ? 'Verified'
                              : 'Pending verification';
                            return (
                              <ConnectionStatusBadge
                                iconTextSpacing={8}
                                status={{ message: message }}
                                type={row.verified ? 'success' : 'partial'}
                              />
                            );
                          },
                        },
                        {
                          key: 'resend',
                          dataIndex: 'resend',
                          title: 'Action',
                          width: 135,
                          render: (_val, row) =>
                            !row.verified ? (
                              <ResendEmailLink
                                onClick={() => onResendEmail(row.email)}
                              >
                                Resend email
                              </ResendEmailLink>
                            ) : (
                              <></>
                            ),
                        },
                      ]}
                      data={report?.emails || []}
                    />
                  </Flex>
                )}
                {/* It was suggested to hide this for now so it won’t hold up a release since it needs some design changes */}
                {/* {Array.isArray(report?.datasources) && (
                  <SlidePanelGridRow label="Source">
                    <SlidePanelToggleBoxTrigger onClick={handleToggleSource}>
                      {showSources ? 'Hide' : 'Show'} data sources included in
                      report
                    </SlidePanelToggleBoxTrigger>
                    <SlidePanelToggleBox show={!!showSources} gridColumn="2">
                      <Flex flexDirection="column" sx={{ gap: 8 }}>
                        {report?.datasources?.map(
                          ({ datasource_type_id, name }) => (
                            <BaseBadge
                              key={name}
                              transparent
                              typography="small-regular"
                              iconMap="datasource"
                              icon={datasource_type_id as BadgeIcon}
                              label={name}
                            />
                          )
                        )}
                      </Flex>
                    </SlidePanelToggleBox>
                  </SlidePanelGridRow>
                )} */}
              </SlidePanelBlockSection>
            </SlidePanelScrollbox>
          </SlidePanelBody>
        </>
      ) : (
        <Flex flex={1} justifyContent="center" alignItems="center">
          <Spinner width="48px" height="48px" />
        </Flex>
      )}
    </SlidePanelContent>
  );
};
