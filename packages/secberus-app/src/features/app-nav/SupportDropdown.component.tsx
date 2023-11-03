import React from 'react';
import { Question } from '@secberus/icons';
import { ListOption } from '@secberus/components';
import { getEmailLink } from '../support-email/getEmailLink';
import { SideNavDropdown } from './components/side-nav-dropdown/SideNavDropdown.component';
import { SideNavDropdownProps } from './components/side-nav-dropdown/SideNavDropdown.types';

export const SupportDropdown = ({
  variant,
}: {
  variant?: SideNavDropdownProps['variant'];
}) => {
  const emailLink = getEmailLink();

  const openExternalLink = (link: string) => {
    window.open(link, '_blank', 'popup=noopener,noreferrer');
  };

  const options: ListOption[] = [
    {
      id: 'documentation',
      label: 'Documentation',
      onClick: () => openExternalLink('https://secberus-docs.readme.io'),
    },
    {
      id: 'release-notes',
      label: 'Release notes',
      onClick: () =>
        openExternalLink('https://secberus-docs.readme.io/changelog'),
    },
    {
      id: 'contact-support',
      label: 'Contact support',
      onClick: () => openExternalLink(emailLink),
    },
  ];

  return (
    <SideNavDropdown
      variant={variant}
      listOptions={options}
      icon={<Question width="24px" height="24px" />}
      text="Support"
      arrowDirection="UP"
      menuPortalTarget={document.body}
      DropdownListProps={{
        offset: { left: 20, bottom: 115 },
      }}
      ListProps={{
        elevation: true,
        borderRadius: 24,
      }}
    />
  );
};
