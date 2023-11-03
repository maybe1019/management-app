import React from 'react';
import ReactDatepicker, { ReactDatePickerProps } from 'react-datepicker';
import { DatepickerContainer } from '.';

export function DatePicker({
  onChange,
  selected,
  ...rest
}: ReactDatePickerProps) {
  return (
    <DatepickerContainer className="datepicker-container">
      <ReactDatepicker
        selected={selected}
        onChange={onChange}
        showTimeInput
        formatWeekDay={d => d.substring(0, 3)}
        timeInputLabel="Time"
        dateFormat="yyyy-MM-dd HH:mm"
        {...rest}
      />
    </DatepickerContainer>
  );
}
