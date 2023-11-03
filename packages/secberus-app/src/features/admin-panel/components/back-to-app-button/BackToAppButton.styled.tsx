import styled from 'styled-components';

export const StyledNavLink = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  width: 100%;
  min-height: 58px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ theme: { colors } }) => colors['medium-gray']};

  &:hover {
    .text {
      color: ${({ theme: { colors } }) => colors.blue};
    }
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme: { colors } }) => colors.dark};
`;
