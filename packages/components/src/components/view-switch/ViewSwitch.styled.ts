import styled from 'styled-components';

interface ButtonThemeProp {
  mode: string;
  theme: any;
}

export const ViewSwitchContainer = styled.div<ButtonThemeProp>`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme, mode }) =>
    mode === 'dark' ? theme.colors['dark-gray'] : theme.colors['medium-gray']};
`;

const ButtonBase = styled.button<ButtonThemeProp>`
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: fit-content;
  position: relative;
  transition: all 0.3s;
  font-family: 'Eina 01', sans-serif;
  outline: none;
  width: fit-content;
  white-space: nowrap;
  border-radius: 20px;
  padding: 20px;
  font-weight: 600;
  color: ${({ theme, mode }) =>
    mode === 'dark' ? theme.colors.white : theme.colors.dark};
`;

export const ActiveViewButton = styled(ButtonBase)<ButtonThemeProp>`
  border: unset;
  background-color: ${({ theme, mode }) =>
    mode === 'dark' ? theme.colors.gray : theme.colors['light-gray']};
  height: 40px;
`;

export const InactiveViewButton = styled(ButtonBase)`
  border: none;
  background-color: Transparent;
  outline: none;
`;
