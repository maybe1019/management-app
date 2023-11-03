import styled from 'styled-components';

export const ControlContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  .mainTextContainer {
    ${({ theme }) => theme.typography.bold}
  }
`;

export const ControlsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 8px;
  width: 136px;

  span {
    ${({ theme }) => theme.typography['small-bold']}
    margin-left: 8px;
  }

  svg {
    height: 20px;
    width: 20px;
  }
`;

export const ControlRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ControlTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ControlDivider = styled.hr`
  border-top: 0px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  width: 100%;
`;
