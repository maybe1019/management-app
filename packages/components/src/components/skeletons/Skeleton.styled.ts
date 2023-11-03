import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

interface SkeletonComponentMain {
  height: number;
  rounded?: boolean;
}
// Skeleton wrapper adds a pixel in height to the component which results in a noticeable shift when
// transitioning from skeleton to component
export const SkeletonComponentStyled = styled(Skeleton)<SkeletonComponentMain>`
  border-radius: ${({ rounded, height }) =>
    rounded ? height || 0 / 2 : 0}px !important;
  height: ${({ height }) => `${height - 1}px !important`};
`;
