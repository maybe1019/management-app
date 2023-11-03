import React from 'react';

import { CellContentProps } from './cellContent/CellContent.types';
import { linkOptsType } from './DataTable.types';
import { DataTableColLink } from './row/Row.styled';

interface linkOptsProp {
  linkOpts?: linkOptsType;
}
type LinkWrapperProps = CellContentProps & linkOptsProp;

export const LinkWrapper: React.FC<LinkWrapperProps> = ({
  children,
  target,
  row,
  linkOpts,
}) => {
  if (linkOpts) {
    return handleActive({ children, row, target, linkOpts });
  }

  return <>{children}</>;
};

const handleActive = ({
  children,
  row,
  target,
  linkOpts,
}: Required<{ children: React.ReactNode } & LinkWrapperProps>) => {
  const { colKey, get, ignore = ['select', 'action'] } = linkOpts;
  const ignoreCell = ignore?.includes(`${target}`);

  if (ignoreCell) return <>{children}</>;

  const link = get(row[colKey]);
  return <DataTableColLink to={link}>{children}</DataTableColLink>;
};
