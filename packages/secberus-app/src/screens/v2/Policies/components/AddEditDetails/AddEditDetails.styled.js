import styled from 'styled-components';
import { Text, Button } from '@secberus/components';

export const StyledFormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 40px;
  padding: 40px;
  overflow: auto;
  & .AddEditPolicy__SelectCategory {
    grid-column: 1/3;
  }
  & .AddEditPolicy__Compliance {
    grid-column: 1/7;
  }
  & .AddEditPolicy__Remediation {
    grid-column: 1/5;
    max-width: 800px;
    min-width: 500px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ComplianceContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > button {
    margin-top: 8px;
    margin-right: auto;
  }
`;

export const ComplianceFrameworkLabelContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  background: #323246;
  border-radius: 16px;
  padding: 8px 16px;
  width: fit-content;
  max-width: 100%;
  flex-wrap: nowrap;
`;

export const CategoryContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding-top: 10px;
  gap: 8px;
`;

export const CategoryText = styled(Text)`
  text-decoration: underline;
  margin-left: 3px;
`;

export const CategoryButton = styled(Button)`
  width: fit-content;
  padding: 0px;

  svg {
    height: 24px;
    width: 24px;
    margin-right: 0px;
    path {
      transition: all 0.1s;
    }
  }

  p {
    transition: ease-in 0.1s;
  }

  &:hover {
    p {
      color: ${({ theme }) => theme.colors.gray};
    }
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.gray};
      }
    }
  }

  &:active {
    p {
      color: ${({ theme }) => theme.colors.gray};
    }
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.gray};
      }
    }
  }
`;
