import styled from 'styled-components/macro';
import { Select } from '@secberus/components';
import { Flex } from '@chakra-ui/react';

export const StyledSelect = styled(Select)`
  .select-value {
    background: ${props => props.theme.colors['medium-gray']};
  }
`;

export const HeaderWidgetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const PageHeader = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr auto;
  padding: 40px;
  background: #dfe7ef;
  width: 100%;
  gap: 24px;
  grid-area: 1 / 1 / 2 / 3;
`;

export const ControlTextContainer = styled(Flex)`
  display: flex;
  gap: 24px;
  padding-left: 32px;
  width: 100%;
`;

export const PageDivider = styled.hr`
  border-top: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  width: 100%;
  margin-bottom: 24px;
`;

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 4px 12px;
  border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  border-radius: 4px;

  &.violations {
    padding: 0px;
  }
`;
