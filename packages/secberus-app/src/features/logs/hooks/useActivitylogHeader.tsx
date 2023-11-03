import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Button, PageHeader } from '@secberus/components';
import { Filter } from '@secberus/icons';
import day from 'dayjs';
import { maybeDateToEpochSeconds, useModalToggle } from '@secberus/utils';
import { RightButtonContainer } from '../../page-header';
import { ExpandInput } from '../../filter-panel/expand-input/ExpandInput.component';
import { StyledSelect } from '../';
import { LogDatePickerModal } from '../';
import { useActivityLogFilters } from '.';

type Option = {
  id: string;
  name: string;
};

const DATE_OPTIONS: Array<Option> = [
  {
    id: 'one-hour',
    name: 'Last 1 hour',
  },
  {
    id: 'twelve-hours',
    name: 'Last 12 hours',
  },
  {
    id: 'seven-days',
    name: 'Last 7 days',
  },
  {
    id: 'thirty-days',
    name: 'Last 30 days',
  },
  {
    id: 'custom',
    name: 'Custom',
  },
];

export function useActivityLogHeader() {
  const { FilterPanel, TagBar, toggleOpen, addFilter, queryParams } =
    useActivityLogFilters();
  const [isOpen, toggleDateSelector] = useModalToggle();

  const [currentlySelected, setCurrentlySelected] = React.useState<Option>(
    DATE_OPTIONS[1]
  );

  const onSelect = React.useCallback(
    (selected: Option) => {
      const setDates = (earliest: Date) => {
        const toStringDate = (date: Date) =>
          maybeDateToEpochSeconds(date, { stringify: true }) as string;
        addFilter(['earliest', [toStringDate(earliest)]]);
        addFilter(['latest', [toStringDate(new Date())]]);
      };

      if (selected) {
        setCurrentlySelected(selected);
        switch (selected.id) {
          case 'one-hour':
            setDates(day().subtract(1, 'hour').toDate());
            break;
          case 'twelve-hours':
            setDates(day().subtract(12, 'hour').toDate());
            break;
          case 'seven-days':
            setDates(day().subtract(7, 'days').toDate());
            break;
          case 'thirty-days':
            setDates(day().subtract(30, 'days').toDate());
            break;
          default:
            toggleDateSelector();
        }
      }
    },
    [toggleDateSelector, addFilter]
  );

  return {
    Header: (
      <>
        <Flex w="inherit" padding="0px">
          <PageHeader align="flex-end" title="Activity log">
            <RightButtonContainer>
              <ExpandInput
                placeholder="Filter by keyword"
                onChange={val => addFilter(['textSearch', val ? [val] : []])}
                //@ts-expect-error invalid type
                value={queryParams?.textSearch}
                id="text_search"
              />
              <Button
                icon
                variant="secondary"
                desc="Filters"
                onClick={toggleOpen}
              >
                <Filter />
              </Button>
              <StyledSelect
                className="select-value"
                options={DATE_OPTIONS}
                onChange={onSelect}
                value={currentlySelected}
                direction="DOWN"
                reverseDirection={true}
              />
            </RightButtonContainer>
          </PageHeader>
        </Flex>
        {TagBar}
        {FilterPanel}
        <LogDatePickerModal
          isOpen={isOpen}
          toggleOpen={toggleDateSelector}
          addFilter={addFilter}
        />
      </>
    ),
    queryParams,
    addFilter,
  };
}
