import React from 'react';
import { DataTableColLink } from '@secberus/components';
import { useRelativeLink } from '../../hooks/useRelativeLink';

export const TableCellLink: React.FC<{ to: string }> = ({ to, children }) => {
  const link = useRelativeLink(to);

  return <DataTableColLink to={link}>{children}</DataTableColLink>;
};
