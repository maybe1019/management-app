import React from 'react';
import { Box } from '@chakra-ui/react';
import { Text, Select, Input } from '@secberus/components';
import { Controller } from 'react-hook-form';
import { EditLink, Section } from '../ReportForm.styled';
import { Interval, ReportFormProps } from './StepsForm.types';

const editFrequencyOptions: Array<{ id: Interval; label: string }> = [
  {
    id: 'DAILY',
    label: 'Daily',
  },
  {
    id: 'WEEKLY',
    label: 'Weekly',
  },
  {
    id: 'MONTHLY',
    label: 'Monthly',
  },
];

const newFrequencyOptions = [
  { id: 'ONCE', label: 'Once' },
  ...editFrequencyOptions,
];

export const ConfigureReportForm: React.FC<ReportFormProps> = ({
  report,
  errors,
  control,
  register,
  handleEdit,
  isEdit = false,
  isCompleted,
  isCurrent,
  setStepComponentRef,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const interval = report?.interval;
  const emails = report?.emails;
  const frequencyOptions = isEdit ? editFrequencyOptions : newFrequencyOptions;

  React.useEffect(() => {
    if (ref.current && isCompleted) {
      setStepComponentRef(prev => {
        return {
          ...prev,
          configure: ref.current?.offsetHeight || 0,
        };
      });
    }
  }, [isCompleted, setStepComponentRef]);

  const reportValueHelper = React.useCallback(
    (type: 'INTERVAL', key: string) => {
      if (type === 'INTERVAL')
        return frequencyOptions.find(({ id }) => id === key);
    },
    [frequencyOptions]
  );
  return (
    <>
      <Box>
        <Box display={isCompleted ? 'none' : isCurrent ? 'block' : 'none'}>
          <>
            <Section>
              <Text type="small-bold">Configure</Text>
            </Section>
            <Controller
              name="interval"
              control={control}
              render={({ onChange, value }) => {
                // TODO 3/4/2023: Clean up.
                // Not the best solution but it bridges the gap between select "values" and
                // our expected values. Works for now, will meet deadline, LGTM.
                let builtValue = value || interval;
                if (typeof builtValue === 'string') {
                  builtValue = reportValueHelper('INTERVAL', value);
                }
                return (
                  <Select
                    valueKey="id"
                    displayKey="label"
                    value={builtValue}
                    label="Send frequency"
                    options={frequencyOptions}
                    className="select-interval"
                    onChange={value =>
                      onChange(reportValueHelper('INTERVAL', value))
                    }
                  />
                );
              }}
            />
            {interval?.id !== 'ONCE' && (
              <Input
                name="emails"
                value={emails}
                ref={register}
                className="input"
                label="Email to"
                error={errors.emails}
                placeholder="email, comma separated"
              />
            )}
          </>
        </Box>
        {isCompleted && (
          <>
            <Section ref={ref}>
              <Text type="small-bold">Configure</Text>
              <Text type="small-regular">
                Send{' '}
                {(
                  (interval?.label ? interval.label : interval) as string
                ).toLowerCase()}
              </Text>
              <Text type="small-regular">{emails.toString()}</Text>
              <EditLink onClick={handleEdit}>Edit</EditLink>
            </Section>
          </>
        )}
      </Box>
    </>
  );
};
