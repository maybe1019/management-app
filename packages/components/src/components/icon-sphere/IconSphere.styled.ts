import styled from 'styled-components';
import { IconSphereProps } from './IconSphere.types';

export const StyledIconSphere = styled.div<IconSphereProps>`
  min-width: 32px;
  min-height: 32px;
  width: 32px;
  height: 32px;
  background: ${({ theme, background }) =>
    theme.colors[background || 'medium-gray']};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;
