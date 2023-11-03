import styled from 'styled-components';
import { getSeverityColorObject } from '../../../../utils/getSeverityColorObject';
import { ViolationContainerProps } from './Violations.types';

export const ViolationsContainer = styled.div<ViolationContainerProps>`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(4, 1fr);
  align-items: end;
  height: 100%;
  margin-right: 24px;
  .violationItem {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    border-radius: 4px;
    cursor: default;
  }
`;

export const Indicator = styled.div<any>`
  ${({ type }) =>
    type === 'STICK'
      ? {
          minWidth: '4px',
          width: '4px',
          height: '40px',
          marginRight: '4px',
        }
      : {
          minWidth: '8px',
          width: '10px',
          height: '10px',
          marginRight: '8px',
        }}
  background-size: cover;
  background: ${({ priority, theme }) =>
    getSeverityColorObject(priority).gradient || theme.gradient.green};
  border-radius: ${({ type }) => (type === 'STICK' ? '24px' : '100%')};
`;

export const ViolationsChange = styled.div`
  display: flex;
  flex-direction: column;
  .count {
    ${({ theme }) => ({
      ...theme.typography.bold,
      color: theme.colors.dark,
    })}
    line-height: 24px;
    margin-bottom: 0px;
  }
  .change {
    ${({ theme }) => ({
      ...theme.typography.caption,
      color: theme.colors.gray,
    })}
    line-height: 12px;
  }
  .type {
    text-transform: capitalize;
    ${({ theme }) => ({
      ...theme.typography['xsmall-bold'],
      color: theme.colors['gray'],
    })}
  }
`;
