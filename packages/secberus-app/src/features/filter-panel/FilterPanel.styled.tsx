import styled from 'styled-components';
import {
  Button,
  ColorProperties,
  styledOnHoverScrollbar,
} from '@secberus/components';

// prevent furling from eslint
// eslint-disable-next-line
export const FilterHeader = styled.div<{backgroundColor?: ColorProperties}>`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  padding: 24px 40px;
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor || 'light-gray']};
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.xsmall}
`;

export const TopContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 496px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const FilterScrollbox = styled.div`
  ${styledOnHoverScrollbar()};

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: scroll;

  padding: 40px 40px 16px 40px;
  margin-bottom: 96px;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 96px;
  border-top: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px 40px;
  bottom: 0;
  z-index: 1002;
  position: fixed;
  width: 100%;
`;

export const FilterViewButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 40px;
  background-color: #1e1e32 !important;
  border-radius: 100px !important;
  box-shadow: 0 2px 2px 1px #1e1e3288 !important;
`;

export const FilterClearAllButon = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 40px;
  background-color: white !important;
  color: #1e1e32 !important;
  border-radius: 100px !important;
  box-shadow: 0 2px 2px 1px #1e1e3288 !important;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 24px 0px;
  ${({ theme }) => theme.typography['small-bold']}
  background: ${({ theme }) => theme.colors.white};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
`;

export const ViewSection = styled(FilterSection)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
