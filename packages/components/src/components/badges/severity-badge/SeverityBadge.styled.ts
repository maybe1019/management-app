import styled from 'styled-components';
import { getSeverityColorObject } from '../../../utils/getSeverityColorObject';

interface StyledSeverityProps {
  name?: string;
  priority: string | null;
  onClick?: () => void;
}

export const StyledSeverityBadge = styled.div<StyledSeverityProps>`
  text-transform: capitalize;
  display: flex;
  align-items: center;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  & input {
    display: none;
  }
`;

export const SeverityDot = styled.span<StyledSeverityProps>`
  border-radius: 50%;
  height: 10px;
  width: 10px;
  margin-right: 6px;
  text-transform: capitalize;
  background-size: cover;
  background-image: ${({ priority }) =>
    getSeverityColorObject(priority).gradient};
`;

export const ReflectiveSeverityBadge = styled.div<StyledSeverityProps>`
  display: flex;
  position: relative;
  width: fit-content;
  height: fit-content;
  border-radius: 16px;
  overflow: hidden;
  text-transform: capitalize;
  padding: 4px 12px;
  background-size: 100% auto;
  background-image: ${({ priority }) =>
    getSeverityColorObject(priority).gradient};
`;
