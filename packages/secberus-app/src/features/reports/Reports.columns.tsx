import { RCTableExtendedColumnType, Text } from '@secberus/components';
import { capitalize } from '@secberus/utils';
import { ReportSchedule } from '@secberus/services';
import { OverlayExpanderCell } from '../../components';
import { useSelf } from '../../app/core/wrappers/WithFindSelf';
import { REPORT_TYPE_LABELS } from './Reports.constants';

export const useReportsColumns = () => {
  const { email: user_email } = useSelf();
  const columns: RCTableExtendedColumnType<ReportSchedule>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      resize: true,
      ellipsis: true,
      sort: true,
      render: (_val, { name }, _idx) => {
        return (
          <OverlayExpanderCell buttonIcon="expand">
            <Text type="xsmall-regular" color="extra-dark">
              {name}
            </Text>
          </OverlayExpanderCell>
        );
      },
    },
    {
      key: 'type',
      title: 'Type',
      width: 224,
      resize: true,
      ellipsis: true,
      sort: true,
      render: (_val, { type }, _idx) => (
        <Text type="xsmall-regular" color="extra-dark">
          {REPORT_TYPE_LABELS[type]}
        </Text>
      ),
    },
    {
      key: 'frequency',
      title: 'Frequency',
      width: 124,
      resize: true,
      ellipsis: true,
      render: (_val, { interval }, _idx) => (
        <Text type="xsmall-regular" color="extra-dark">
          {capitalize(interval?.toLowerCase())}
        </Text>
      ),
    },
    {
      key: 'recipients',
      title: 'Recipients',
      width: 292,
      resize: true,
      ellipsis: true,
      render: (_val, { emails }, _idx) => (
        <Text type="small-regular">
          {emails && emails?.length > 0
            ? emails?.map(e => e.email).join(', ')
            : user_email}
        </Text>
      ),
    },
    {
      key: 'visibility',
      title: 'Visibility',
      width: 100,
      resize: true,
      ellipsis: true,
      render: () => (
        <Text type="xsmall-regular" color="extra-dark">
          Private
        </Text>
      ),
    },
  ];
  return columns;
};
