import { BaseModal } from '@secberus/components';
import styled from 'styled-components';

export const Background = styled.div`
  height: 100%;
  background: ${props => props.theme.colors['light-gray']};
  background-image: ${props => props.theme.svg.loginBg};
  background-position: center center;
  background-size: 97.5%;
  background-repeat: no-repeat;
`;

export const LogoContainer = styled.div`
  svg {
    height: 40px;
    width: 250px;
    left: 50%;
    top: 48px;
    transform: translate(-50%, 0);
    position: absolute;
  }
`;

export const StyledModal = styled(BaseModal)`
  min-width: 520px;
  width: fit-content;
  top: 35%;
`;
