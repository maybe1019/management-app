import React from 'react';
import { Text } from '@secberus/components';
import { Box, Flex } from '@chakra-ui/react';

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

const upperCaseFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const SSODetails: React.FC<any> = ({ accountDetails }: SSOInfoProps) => {
  return (
    <Box>
      <Text type="bold">Configuration details</Text>
      <br />
      <Flex direction="column">
        <Box pl="4" pr="4">
          <ol>
            {accountDetails?.details &&
              Object.values(accountDetails.details).map(text => (
                <li key={text}>
                  <Text type="small-regular">{upperCaseFirstLetter(text)}</Text>
                </li>
              ))}
          </ol>
        </Box>
      </Flex>
    </Box>
  );
};
