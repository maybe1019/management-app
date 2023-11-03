import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  Indicator,
  ViolationsChange,
  ViolationsContainer,
} from '../Violations.styled';
import { PRIORITY } from '../../../../../types';
import { ViolationWidgetFilterComponentProps } from '../Violations.types';

const priorities: PRIORITY[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

export const ViolationsIndicator: React.FC<any> = ({
  score,
  priority,
  type,
  onClick,
}) => {
  const getLevel: (val: PRIORITY | number) => PRIORITY = val => {
    if (typeof val === 'string') return val;
    if (val >= 9) return 'CRITICAL';
    if (val < 9 && val >= 7) return 'HIGH';
    if (val < 7 && val >= 4) return 'MEDIUM';
    return 'LOW';
  };
  const paddedScore = React.useMemo(() => {
    return score?.toString().padStart(2, '0') || '';
  }, [score]);
  return (
    <Box
      className="violationItem"
      onClick={() => onClick?.('violations', { priority, score })}
      {...(onClick && {
        _hover: { backgroundColor: '#DFE7EF', cursor: 'pointer' },
      })}
    >
      <Indicator type={type} priority={getLevel(priority)} />
      <ViolationsChange>
        <span className="count">{paddedScore}</span>
        {type === 'STICK' && (
          <span className="type">{priority.toString().toLowerCase()}</span>
        )}
      </ViolationsChange>
    </Box>
  );
};

export const ViolationsSubwidget = ({
  summary,
  onClick,
}: ViolationWidgetFilterComponentProps) => {
  return (
    <ViolationsContainer>
      {priorities.map(priority => {
        return (
          <ViolationsIndicator
            type="STICK"
            priority={priority}
            score={summary?.[priority] ?? 0}
            onClick={onClick}
          />
        );
      })}
    </ViolationsContainer>
  );
};
