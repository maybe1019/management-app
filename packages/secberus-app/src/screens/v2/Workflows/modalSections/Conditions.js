import React from 'react';
import { Validation, MultiSelectionBox } from '@secberus/components';
import {} from 'styled-components/macro';
import { workflowFilters } from '../Workflows.constants';

export const Conditions = ({
  errors,
  watch,
  register,
  control,
  setValue,
  dataSources,
  categories,
}) => {
  const filterOptions = workflowFilters({ categories, dataSources });
  return (
    <Validation
      error={errors}
      customError="Please select a filter"
      css={`
        max-height: unset;
      `}
    >
      <div
        css={`
          .msb-container {
            background: none;
            padding: 0;
          }
          && {
            width: 100%;
            min-height: 170px;
          }
        `}
      >
        <MultiSelectionBox
          watch={watch}
          register={register}
          control={control}
          setValue={setValue}
          data={filterOptions}
          className="msb-container"
          css={`
            && {
              width: 100%;
              min-height: 170px;
            }
          `}
        />
      </div>
    </Validation>
  );
};
