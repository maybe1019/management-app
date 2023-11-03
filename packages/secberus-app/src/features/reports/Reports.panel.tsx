import React from 'react';
import { SlidePanel } from '@secberus/components';
import { useHistory, useParams } from 'react-router-dom';
import { reportSchedulesApi, userApi } from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { useSelf } from '../../app/core/wrappers/WithFindSelf';
import { REPORT_TYPE_LABELS } from './Reports.constants';
import { reportsPaths } from './routes';
import {
  ReportsPanelComponent,
  ReportsPanelProps,
} from './components/reports-panel';

export const ReportsPanel: React.FC<ReportsPanelProps> = props => {
  const history = useHistory();
  const self = useSelf();
  const { reportId } = useParams<{ reportId: string }>();
  const [showSources, setShowSources] = React.useState(false);

  const { data: report, isLoading: reportIsLoading } =
    reportSchedulesApi.useGetReportScheduleQuery(
      { reportId },
      { skip: !reportId }
    );

  const isReportOwner = report?.owner === self.id;

  const { data: user, isLoading: userIsLoading } = userApi.useGetUserQuery(
    { userid: report?.owner as string },
    { skip: !report?.owner || isReportOwner }
  );

  const isLoading = useIsLoading([reportIsLoading, userIsLoading]);

  const { onClose, ...panelProps } = props;

  const handleEditReport = React.useCallback(() => {
    history.push(`${reportsPaths}/edit/${reportId}`);
  }, [history, reportId]);

  const data = React.useMemo(() => {
    const owner = isReportOwner ? self : user;
    return {
      ...props.data,
      report,
      reportType: !report ? '' : REPORT_TYPE_LABELS[report.type],
      reportOwner: `${owner?.name} ${owner?.family_name}`,
      canEdit: isReportOwner,
      showSources,
      callbacks: {
        setShowSources,
        handleEditReport,
      },
    };
  }, [
    isReportOwner,
    self,
    user,
    props.data,
    report,
    showSources,
    handleEditReport,
  ]);

  return (
    <SlidePanel
      unmount
      key="reports-panel"
      isVisible={props.isVisible}
      onClose={onClose}
    >
      <ReportsPanelComponent
        {...panelProps}
        isLoading={isLoading}
        data={data}
        key={reportId}
      />
    </SlidePanel>
  );
};
