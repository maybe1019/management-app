import React from 'react';
import {
  loadingCircleTransition,
  loadingCircleVariants,
  loadingContainerVariants,
} from './WavyLoader.constants';
import { LoadingCircle, LoadingContainer } from './WavyLoader.styled';

export interface LoaderProps {
  className?: string;
  size?: 'small' | 'large';
}

export const Wavyloader: React.FC<LoaderProps> = ({
  className,
  size = 'small',
}) => {
  return (
    <LoadingContainer
      size={size}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
      className={className}
      id="wavy-loader"
    >
      <LoadingCircle
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
        className="wavy-circle"
      />
      <LoadingCircle
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
        className="wavy-circle"
      />
      <LoadingCircle
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
        className="wavy-circle"
      />
    </LoadingContainer>
  );
};
