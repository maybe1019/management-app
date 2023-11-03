import { Text } from '@secberus/components';
import { ErrorBall } from '@secberus/icons';
import React from 'react';
import styled from 'styled-components';

export const ACCESS_DENIED_MESSAGE =
  'You do not have access to the account, property, or view. Contact your account administrator for assistance.';

export const NO_ORGS_DENIED_MESSAGE =
  'Your account does not have organization permissions configured. Contact your account administrator for assistance.';

const AccessDeniedStyles = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3, 200px [col-start]);
`;

const GridItem = styled.div`
  grid-row-start: col-start 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function AccessDenied({ subtext = ACCESS_DENIED_MESSAGE }) {
  return (
    <AccessDeniedStyles>
      <GridItem>
        <WarningMessage
          icon={ErrorBall}
          message="Access denied"
          subtext={subtext}
        />
      </GridItem>
    </AccessDeniedStyles>
  );
}

interface WarningMessageProps {
  icon: React.ComponentType;
  message: string;
  subtext?: string;
}

const WarningMessageStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const SubText = styled.span`
  text-align: center;
  width: 65%;
`;

const Icon = styled.span`
  svg {
    width: 50px;
    height: 50px;
  }
`;

function WarningMessage(props: WarningMessageProps) {
  return (
    <WarningMessageStyles>
      <Icon>
        <props.icon />
      </Icon>
      <Text type="medium" bold>
        {props.message}
      </Text>
      <SubText>
        <Text type="regular">{props.subtext}</Text>
      </SubText>
    </WarningMessageStyles>
  );
}
