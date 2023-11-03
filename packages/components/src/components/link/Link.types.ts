import { LinkProps } from 'react-router-dom';

export interface CustomLinkProps {
  underline?: boolean;
  external?: boolean;
}
export interface SecberusSpecialSurpriseLinkProps
  extends LinkProps,
    CustomLinkProps {}
