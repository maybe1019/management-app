import React from 'react';
import { BaseBadge } from '../base-badge/BaseBadge.component';
import { BaseBadgeProps } from '../base-badge/BaseBadge.types';
import { Text } from '../../text';
import { ColorProperties, TypographyProperties } from '../../..';
import { getPriorityStatusString } from '../../../utils/getPriorityStatusString';
import {
  StyledSeverityBadge,
  SeverityDot,
  ReflectiveSeverityBadge,
} from './SeverityBadge.styled';

export interface SeverityBadgeProps extends BaseBadgeProps {
  priorityNum?: number;
  priorityVal?: string;
  className?: string;
  isLoading?: boolean;
  dark?: boolean;
  full?: boolean;
  name?: string;
  value?: boolean;
  onChange?: (val: boolean) => void;
  type?: TypographyProperties;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  priorityNum,
  priorityVal,
  isLoading,
  dark,
  name,
  value: propsVal,
  full,
  background,
  color,
  onChange,
  type = 'small-bold',
  padding = '4px',
}) => {
  const darkBadge = propsVal || dark;
  const priority = getPriorityStatusString(priorityNum, priorityVal);

  return (
    <>
      {!full ? (
        <BaseBadge
          skeletonWidth={90}
          isLoading={isLoading}
          dark={darkBadge}
          background={background}
          padding={padding}
        >
          {priority ? (
            <StyledSeverityBadge
              name={name}
              priority={priority}
              onClick={onChange ? () => onChange(!propsVal) : undefined}
            >
              <SeverityDot priority={priority} />
              <Text
                type={type}
                color={
                  color
                    ? (color as ColorProperties)
                    : darkBadge
                    ? 'white'
                    : 'dark'
                }
              >
                {priority.toLowerCase()}
              </Text>
            </StyledSeverityBadge>
          ) : (
            'N/A'
          )}
        </BaseBadge>
      ) : (
        <ReflectiveSeverityBadge priority={priority}>
          <Text type={type} color="white">
            {priority?.toLowerCase()}
          </Text>
        </ReflectiveSeverityBadge>
      )}
    </>
  );
};
