import React from 'react';
import { Link, RiskBadge } from '@secberus/components';
import { Flex } from '@chakra-ui/react';
import styled from 'styled-components';
interface TEMPORARY_COMPLIANCE_SUMMARY {
  id: string;
  name: string;
  score: number;
}

const StyledLink = styled(Link)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const PolicyRiskIndicator: React.FC<TEMPORARY_COMPLIANCE_SUMMARY> = ({
  id,
  name,
  score,
}) => {
  return (
    <Flex
      key={id}
      justifyContent="space-between"
      alignItems="center"
      css={{ gap: '8px' }}
    >
      <StyledLink
        to={location => ({
          ...location,
          pathname: `${location.pathname}/policy/details/${id}/violations`,
        })}
        type="small-regular"
        color="dark-gray"
      >
        {name}
      </StyledLink>
      <RiskBadge riskScore={score} pill />
    </Flex>
  );
};
