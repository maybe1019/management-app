import React from 'react';
import { Text } from '@secberus/components';
import { Flex, Box } from '@chakra-ui/react';
import { SSOHorizontalContainer } from './SSO.styled';

type SSOInfoProps = {
  accountDetails: {
    loginURI?: string;
    redirectURI?: string[];
    logoutURI?: string[];
    details?: {
      general: string;
      client: string;
      consent: string;
      scopes: string;
    };
    msg?: string;
  };
};

export const SSOInfo: React.FC<any> = ({ accountDetails }: SSOInfoProps) => {
  return (
    <Flex sx={{ gap: '26px' }} direction="column">
      <Text type="bold">Setup SSO:</Text>
      <Box pl="20px">
        <SSOHorizontalContainer>
          <Flex direction="column">
            <Text type="small-bold">Login Redirect URIs</Text>
            {accountDetails?.redirectURI &&
              accountDetails.redirectURI.map(text => (
                <Text type="small-regular" key={text}>
                  {text}
                </Text>
              ))}
          </Flex>
          <Flex direction="column">
            <Text type="small-bold">Logout URI</Text>
            {accountDetails?.logoutURI &&
              accountDetails.logoutURI.map(text => (
                <Text type="small-regular" key={text}>
                  {text}
                </Text>
              ))}
          </Flex>
        </SSOHorizontalContainer>
      </Box>
    </Flex>
  );
};
