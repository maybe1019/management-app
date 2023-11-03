import React from 'react';
import { SkeletonComponentStyled } from './Skeleton.styled';

export interface SkeletonComponentMain {
  height?: number;
  rounded?: boolean;
  width?: number;
  count?: number;
}

export const SkeletonComponent: React.FC<SkeletonComponentMain> = ({
  rounded,
  width,
  height,
  count,
}) => {
  return (
    <SkeletonComponentStyled
      height={height || 30}
      width={width}
      rounded={rounded}
      count={count}
    />
  );
};
