import React from 'react';
import { PolicyLight } from '@secberus/icons';
import { getStringPercent } from '@secberus/utils';
import { Flex } from '@chakra-ui/react';
import { PoliciesWidgetMain } from '../Policies.types';
import { ProgressBar } from '../../../../progress-bar';
import {
  PoliciesCircle,
  PoliciesContainer,
  PoliciesScoreContainer,
  ProgressMargin,
} from '../Policies.styled';
import { Text } from '../../../../text';

const Label = ({ count, label }: Record<string, string | number>) => (
  <Flex>
    <Text type="xsmall-bold" color="dark">
      {count}
    </Text>
    &nbsp;
    <Text type="xsmall-bold" color="gray">
      {label}
    </Text>
  </Flex>
);
export const PoliciesSubwidget: React.FC<PoliciesWidgetMain> = ({
  numPoliciesPassed,
  numPoliciesTotal,
  className,
}) => {
  // Overkill memo but figure we should state update instead
  // of worry about recalculating a minor component on every frame
  const numPoliciesFailed = React.useMemo(() => {
    return numPoliciesTotal - numPoliciesPassed;
  }, [numPoliciesPassed, numPoliciesTotal]);

  const percent = React.useMemo(
    () => getStringPercent(numPoliciesPassed, numPoliciesTotal, 0, 100),
    [numPoliciesPassed, numPoliciesTotal]
  );

  return (
    <PoliciesContainer className={className}>
      <PoliciesCircle numPoliciesPassed={numPoliciesPassed}>
        <PolicyLight height={24} width={24} />
      </PoliciesCircle>
      <br />
      <br />
      <PoliciesScoreContainer>
        <span className="policiesScore">{numPoliciesTotal}</span>
        <span className="scoreChange">Enabled</span>
      </PoliciesScoreContainer>
      <ProgressMargin>
        <ProgressBar
          leftLabel={<Label count={numPoliciesPassed} label="Passed" />}
          rightLabel={<Label count={numPoliciesFailed} label="Failed" />}
          total={numPoliciesTotal}
          barBackground="medium-gray"
          percent={percent}
        />
      </ProgressMargin>
    </PoliciesContainer>
  );
};
