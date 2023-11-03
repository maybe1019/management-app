import React from 'react';
import { TextProps } from '../text/Text.types';
import { StyledLink, StyledExternalLink } from './Link.styled';
import { SecberusSpecialSurpriseLinkProps } from './Link.types';

export const Link: React.FC<SecberusSpecialSurpriseLinkProps & TextProps> = ({
  className,
  children,
  to,
  color = 'dark',
  type = 'regular',
  external = false,
  ...props
}) => {
  return (
    <>
      {external ? (
        <StyledExternalLink
          as="a"
          href={to as string}
          rel="noopener noreferrer"
          underline={!!props.underline}
          {...props}
        >
          {children}
        </StyledExternalLink>
      ) : (
        <StyledLink
          to={to}
          className={className}
          color={color}
          type={type}
          {...props}
        >
          {children}
        </StyledLink>
      )}
    </>
  );
};
