import React from 'react';
import { LinkProps } from 'react-router-dom';
import { TableLink, TableSpacer } from '../Table.styled';

interface TableCellProps {
  to?: LinkProps['to'];
  linkProps?: Omit<LinkProps, 'to'>;
}
/**
 * @author Duncan Pierce <duncan@secberus.com>
 * @description Basic Table Cell which applies styling under the
 * rowBehavior props for asLink. If asLink is TRUE, you must use this component
 * to retain basic styles.
 * @example
 * // In table
 * <TableGW
 *     rowHoverBehavior={{
 *         asLink: true
 *     }}
 * />
 * // Non-link in table column file
 * <TableCell>
 *   <NotLinkableContent />
 * </TableCell>
 * // Link in table column file
 * <TableCell to="/your/path">
 *   <ContentWhichCanBeALink />
 * </TableCell>
 */
export const TableCell: React.FC<TableCellProps> = ({
  to,
  linkProps,
  children,
}) => {
  if (!to) {
    return <TableSpacer>{children}</TableSpacer>;
  }
  return (
    <TableLink to={to} {...linkProps}>
      {children}
    </TableLink>
  );
};
