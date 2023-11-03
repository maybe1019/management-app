import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { TextProps } from '../text/Text.types';
import {
  SecberusSpecialSurpriseLinkProps,
  CustomLinkProps,
} from './Link.types';

export const StyledLink = styled(Link)<
  SecberusSpecialSurpriseLinkProps & TextProps
>`
  ${({ theme, type }) => theme.typography[type!]};
  color: ${({ theme, color }) => theme.colors[color!]};
  &:visited: {
    color: ${({ theme, color }) => theme.colors[color!]};
  }
  &:hover {
    text-decoration: underline;
  }
  ${({ underline }) => {
    return underline
      ? css`
          text-decoration: underline;
        `
      : css`
          text-decoration: none;
        `;
  }}
`;

export const StyledExternalLink = styled.a<CustomLinkProps>`
  &:hover {
    text-decoration: underline;
  }
  ${({ underline }) => {
    return underline
      ? css`
          text-decoration: underline;
        `
      : css`
          text-decoration: none;
        `;
  }}
`;
