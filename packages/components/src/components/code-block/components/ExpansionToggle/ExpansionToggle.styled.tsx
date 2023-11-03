import styled from 'styled-components';
import { changeAlphaValue } from '../../../../utils';
import { Button } from '../../../index';

export const ExpandWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 15px;
  z-index: 100;
  display: flex;
  left: 0;
  justify-content: center;
`;

export const Expand = styled(Button)`
  &&& {
    background: ${({ theme }) => theme.colors['medium-gray']};
    ${({ theme }) => theme.typography['small-bold']};
    height: 32px;
    color: ${({ theme }) => theme.colors.dark};
    &:hover {
      color: ${({ theme }) => theme.colors.dark};
      background: ${({ theme }) => theme.colors['light-gray']};
    }
  }
`;

export const FadeBottom = styled.div`
  position: absolute;
  bottom: 0px;
  display: block;
  width: 100%;
  height: 40%;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${changeAlphaValue(
      theme.rgbaColors['light-gray'],
      '0'
    )},  ${changeAlphaValue(theme.rgbaColors['light-gray'], '0.8')})`};
  left: 0;
  border-radius: 16px;
`;
