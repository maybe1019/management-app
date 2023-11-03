import React from 'react';
import classNames from 'classnames';
import { Text } from '../index';
import { SkeletonComponent } from '../skeletons/Skeleton';
import { SeverityGroupOptions } from './SeverityRange.types';
import {
  SeverityContainer,
  SeverityBoxContainer,
  SeverityRadio,
  SeverityInput,
} from './SeverityRange.styled';

export const SeverityRange: React.FC<SeverityGroupOptions> = ({
  length = 10,
  onChange,
  label,
  value = 5,
  isLoading = false,
  skeletonHeight = 90,
  skeletonWidth = 250,
  name,
  dark,
}) => {
  return isLoading ? (
    <SkeletonComponent width={skeletonWidth} height={skeletonHeight} />
  ) : (
    <SeverityContainer>
      {label && (
        <Text
          className="SeverityRange__label"
          type="small-bold"
          color={dark ? 'gray' : 'dark'}
        >
          {label}
        </Text>
      )}
      <SeverityBoxContainer>
        {Array.from(Array(length), (_dud, i) => i + 1).map((val: number) => {
          const selected = value === val;
          return (
            <>
              <SeverityInput className={classNames({ selected, dark })}>
                <SeverityRadio
                  key={name}
                  className="SeverityRange__Radio"
                  name={name}
                  index={val}
                  onClick={() => onChange(val)}
                />
                <Text type="small-bold" color={dark ? 'medium-gray' : 'gray'}>
                  {val}
                </Text>
              </SeverityInput>
            </>
          );
        })}
      </SeverityBoxContainer>
    </SeverityContainer>
  );
};
