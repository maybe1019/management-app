import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@chakra-ui/react';
import { Text } from '@secberus/components';
import { PolicyEditorBlockProps } from './PolicyEditor.types';

export const PageContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  .radio-group {
    margin-left: 0;
  }
  .policy-attributes-container {
    width: calc(100% - 30%);
    border-right: 1px solid ${({ theme }) => theme.colors['light-gray']};
  }
  .policy-logic-container {
    width: 30%;
    padding: 40px;
  }
  ${({ theme }) => `@media ${theme.breakpoints.laptopLMax}`} {
    flex-direction: column;
    .policy-attributes-container {
      width: 100%;
      border-right: 0px;
    }
    .policy-logic-container {
      width: 100%;
    }
  }
`;

const StyledBlock = styled.div`
  display: grid;
  grid-gap: 24px;
  padding: 40px;
  border-bottom: 1px solid ${props => props.theme.colors['light-gray']};

  ${props => `@media ${props.theme.breakpoints.tablet}`} {
    grid-gap: 60px;
    grid-template-columns: 285px 1fr;
    justify-content: space-between;
  }

  ${props => `@media ${props.theme.breakpoints.laptop}`} {
    grid-template-columns: 320px 1fr;
  }

  ${props => `@media ${props.theme.breakpoints.laptopL}`} {
    &:last-of-type {
      border-bottom: transparent;
    }
  }
`;

export const PageWrapper = styled.div`
  ${props => `@media ${props.theme.breakpoints.laptopL}`} {
    display: grid;
    grid-template-columns: 1fr auto;
    justify-content: space-between;
  }
`;

export const FormWrapper = styled(Box)`
  flex: 1;
`;

export const PolicyEditorBlock = ({
  title,
  text,
  children,
}: PolicyEditorBlockProps) => {
  return (
    <StyledBlock>
      <Flex flexDirection="column" gridGap="16px" maxWidth="480px">
        <Text type="small-regular">{title}</Text>
        {text}
      </Flex>
      <FormWrapper>{children}</FormWrapper>
    </StyledBlock>
  );
};

export const CodeEditorContainer: React.FC = ({ children }) => (
  <Box backgroundColor="#F1F6FA" borderRadius="16px" margin="0px">
    <Box h="250px" marginBottom="16px" padding="0 8px" borderRadius="16px">
      {children}
    </Box>
  </Box>
);
