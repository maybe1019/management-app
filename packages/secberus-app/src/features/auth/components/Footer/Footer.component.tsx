import React from 'react';
import { FooterContainer, FooterLink } from './Footer.styled';

const options = [
  {
    name: '© Secberus',
    pathname: 'https://www.secberus.com/',
  },
  {
    name: 'Support',
    pathname: 'mailto:support@secberus.com',
    target: '_blank',
  },
  {
    name: 'Privacy',
    pathname: 'https://www.secberus.com/privacy-policy',
  },
  {
    name: 'Status',
    pathname: 'https://secberus.statuspage.io/',
  },
];

export const Footer = () => {
  return (
    <FooterContainer>
      {options.map(({ name, pathname, target }) => (
        <FooterLink key={pathname} href={pathname} target={target}>
          {name}
        </FooterLink>
      ))}
    </FooterContainer>
  );
};
