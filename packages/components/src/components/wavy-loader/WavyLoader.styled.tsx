import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const LoadingContainer = styled(motion.div)<{ size: string }>`
  display: flex;
  justify-content: space-around;
  ${props =>
    props.size === 'small' &&
    css`
      width: 80px;
      .wavy-circle {
        width: 16px;
        height: 16px;
      }
    `};
  ${props =>
    props.size === 'large' &&
    css`
      width: 120px;
      .wavy-circle {
        width: 24px;
        height: 24px;
      }
    `}
`;

export const LoadingCircle = styled(motion.span)`
  display: block;
  background-color: black;
  border-radius: 50%;
`;
