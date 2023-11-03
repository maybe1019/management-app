import styled from 'styled-components';
import { Text } from '../';

type ContentProps = {
  align: 'space-between' | 'flex-start' | 'flex-end';
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const HeaderContentContainer = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  align-content: center;
  padding: 16px 32px;
  min-height: 72px;
  gap: 16px;

  > * {
    min-width: 0;
  }

  &.fullWidth {
    display: flex;
    align-content: center;
    padding: 16px 32px;
    width: 100%;
  }
`;

export const Title = styled(Text)`
  align-self: center;
`;

export const Content = styled.div<ContentProps>`
  display: inline-flex;
  justify-content: ${({ align }) => align};
  align-items: center;

  &.fullWidth {
    width: 100%;
  }
`;

export const Divider = styled.hr`
  border-top: ${({ theme }) => `1px solid ${theme.colors['light-gray']}`};
  width: 100%;
  margin: 0px;
`;
