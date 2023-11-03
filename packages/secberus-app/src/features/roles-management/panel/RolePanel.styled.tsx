import styled from 'styled-components';
import { Button, Text, styledOnHoverScrollbar } from '@secberus/components';

export const SpinnerContainer = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
`;

export const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 784px;
  height: 100vh;
  overflow-y: hidden;
  background-color: #fff;
`;

export const PanelHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors['light-gray']};
`;

export const TextButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.xsmall}
`;

export const CloseButton = styled(Button)`
  margin-left: auto;
  margin-top: -15px;
  margin-bottom: -20px;
`;

export const EditButton = styled(Button)`
  padding: 5px 16px;
`;

export const Divider = styled.hr`
  border-top: ${({ theme }) => `1px solid ${theme.colors['light-gray']}`};
  width: 100%;
  margin: 16px 0px;
`;

export const StyledGridRow = styled.div`
  display: grid;
  grid-template-columns: 156px 1fr;
  margin-bottom: 8px;
`;

export const StyledBlockSection = styled.div`
  margin-bottom: 8px;
`;

export const SubtitleGroup = styled.h3`
  ${({ theme }) => theme.typography.xsmall};
  position: relative;
  margin-bottom: 16px;
  padding: 24px 0 16px;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors['light-gray']};
  }
`;

export const TableWrapper = styled.div`
  margin-top: 24px;
`;

export const PanelScrollbox = styled.div`
  ${styledOnHoverScrollbar()};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: scroll;

  padding: 24px 40px 16px 40px;
  margin-bottom: 50px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;
