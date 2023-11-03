import React from 'react';
import { ProgressBar, Text, Link } from '@secberus/components';
import { Box, Flex } from '@chakra-ui/react';
import { getStringPercent } from '@secberus/utils';
import { ComplianceFrameworkSummary } from '@secberus/services';
import { useDispatch } from 'react-redux';
import { setFiltersAttribute } from '../../../../store';
import { getComplianceSummary } from './utils/getComplianceSummary';

export const ComplianceIndicator: React.FC<ComplianceFrameworkSummary> = ({
  compliance_summary,
  id,
  name,
}) => {
  const dispatch = useDispatch();
  const toViewFramework = () => {
    dispatch(setFiltersAttribute(`active.framework_id`, [id]));
  };

  const progressBackground = getComplianceSummary(compliance_summary);
  const percent = getStringPercent(compliance_summary || 0, 100, 0);

  return (
    <Flex key={id} alignItems="center" justifyContent="space-between">
      <Link
        to={`/compliances/details/${id}`}
        onClick={toViewFramework}
        className="ellipsis-text"
      >
        <Text type="small-regular" color="dark-gray" className="ellipsis-text">
          {name}
        </Text>
      </Link>
      <Box>
        <Flex alignItems="center" sx={{ gap: '24px' }}>
          <Box width="140px">
            <ProgressBar
              progressBackground={progressBackground}
              percent={percent}
              barBackground="light-gray"
            />
          </Box>
          <Box textAlign="right" width="42px">
            <Text type="small-bold">{percent}</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
