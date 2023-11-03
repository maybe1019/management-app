import {
  BaseModal,
  Button,
  DatePicker,
  Text,
  Input,
  InputProps,
} from '@secberus/components';
import React from 'react';
import day from 'dayjs';
import { maybeDateToEpochSeconds } from '@secberus/utils';
import { Calendar } from '@secberus/icons';
import { Box, Flex, Grid } from '@chakra-ui/react';
import {
  DatepickerInputContainer,
  IconContainer,
} from './LogDatePickerModal.styled';
type LogDate = Date | null;
type StringDate = string | undefined;

type DatePickerModalProps = {
  addFilter: (arg: [string, string[]]) => void;
  isOpen: boolean;
  toggleOpen: () => void;
};

function LogDatePickerInput({ ...inputProps }: InputProps) {
  return (
    <DatepickerInputContainer indented="24px">
      <Input
        icon={
          <IconContainer>
            <Calendar />
          </IconContainer>
        }
        placeholder="ex: 2022-05-01 12:34"
        formNoValidate
        {...inputProps}
      />
    </DatepickerInputContainer>
  );
}
export function LogDatePickerModal({
  addFilter,
  isOpen,
  toggleOpen,
}: DatePickerModalProps) {
  const [startDate, setStartDate] = React.useState<LogDate>(null);
  const [endDate, setEndDate] = React.useState<LogDate>(null);

  const today = new Date();
  const minimumDate = day().subtract(30, 'day').toDate();

  const handleConfirm = React.useCallback(() => {
    const start = maybeDateToEpochSeconds(startDate, {
      stringify: true,
    }) as StringDate;
    const finish = maybeDateToEpochSeconds(endDate, {
      stringify: true,
    }) as StringDate;
    addFilter(['earliest', start ? [start] : []]);
    addFilter(['latest', finish ? [finish] : []]);
    toggleOpen();
  }, [addFilter, toggleOpen, startDate, endDate]);
  return (
    <BaseModal
      handleClose={toggleOpen}
      isVisible={isOpen}
      title="Custom date range"
      variant="light"
    >
      <Grid gridTemplateColumns="repeat(2, 280px)" gap="16px">
        <label htmlFor="Start Date">
          <Box marginLeft="16px" marginBottom="4px">
            <Text type="small-bold" color="dark">
              Start date
            </Text>
          </Box>
          <DatePicker
            name="Start Date"
            onChange={setStartDate}
            selected={startDate}
            minDate={minimumDate}
            maxDate={today}
            customInput={<LogDatePickerInput formNoValidate noMargin />}
            placeholderText="ex: 2023-01-01 12:34"
            timeFormat="HH:mm"
          />
        </label>
        <label htmlFor="End Date">
          <Box marginLeft="16px" marginBottom="4px">
            <Text type="small-bold" color="dark">
              End date
            </Text>
          </Box>
          <DatePicker
            name="End Date"
            onChange={setEndDate}
            selected={endDate}
            minDate={startDate ?? minimumDate}
            maxDate={today}
            customInput={<LogDatePickerInput formNoValidate noMargin />}
            placeholderText="ex: 2023-01-01 12:34"
          />
        </label>
      </Grid>
      <Flex mt="48px" gridGap="16px">
        <Button
          variant="primary"
          disabled={!startDate || !endDate}
          onClick={handleConfirm}
        >
          Apply
        </Button>
        <Button variant="secondary" onClick={toggleOpen}>
          Cancel
        </Button>
      </Flex>
    </BaseModal>
  );
}
