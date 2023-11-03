import React from 'react';
import { Controller } from 'react-hook-form';
import { get } from 'lodash';
import { ToggleButton } from '../toggle-button/ToggleButton.component';
import { SkeletonComponent } from '../skeletons/Skeleton';
import FilterGroup from './filter-group/FilterGroup.component';
import {
  ViewSection,
  MultiSelectionBoxContainer,
  FilterSection,
  ScrollBox,
} from './MultiSelectionBox.styled';
import { MultiSelectionBoxProps } from './MultiSelectionBox.types';

export const MultiSelectionBox: React.FC<MultiSelectionBoxProps> = ({
  data,
  className,
  isLoading = false,
  register,
  control,
  setValue,
  watch = () => {},
}) => {
  const formData = watch();
  return (
    <MultiSelectionBoxContainer className={className}>
      <ScrollBox>
        {data.views && (
          <ViewSection>
            Views
            <Controller
              as={ToggleButton}
              name="views"
              control={control}
              buttons={data.views}
            />
          </ViewSection>
        )}
        {data.filters?.map(group => {
          if (group.hide) return null;
          if (isLoading) return <SkeletonComponent count={5} />;
          return (
            <FilterSection>
              <FilterGroup
                key={group.field}
                groupId={group.id || group.field}
                group={group}
                formData={get(formData, group.field)}
                register={register}
                control={control}
                setValue={setValue}
                {...group.componentProps}
              />
            </FilterSection>
          );
        })}
      </ScrollBox>
    </MultiSelectionBoxContainer>
  );
};
