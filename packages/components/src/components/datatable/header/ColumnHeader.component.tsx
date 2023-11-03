import React from 'react';
import {
  CaretDownLight as Descending,
  CaretUpLight as Ascending,
} from '@secberus/icons';
import { Text } from '../..';
import { HeaderSort, TableColumnHeader } from './ColumnHeader.styled';
import { ColumnHeaderProps } from './ColumnHeader.types';

export const DataTableColumnHeader: React.FC<ColumnHeaderProps> = ({
  id,
  activeSort,
  setActiveSort,
  sort,
  className,
  width,
  minWidth,
  children,
  disableSort,
}) => {
  const active = activeSort && id && activeSort[id]?.active;
  const ascending = activeSort && id && activeSort[id]?.ascending;

  const handleClick = () => {
    if (
      typeof setActiveSort !== 'function' ||
      typeof sort !== 'function' ||
      typeof id === 'undefined'
    )
      return;
    if (!ascending) {
      setActiveSort({ [id]: { active: true, ascending: true } });
      return sort(true, id);
    }
    setActiveSort({ [id]: { active: true, ascending: false } });
    return sort(false, id);
  };

  if (disableSort)
    return (
      <TableColumnHeader
        width={width}
        minWidth={minWidth}
        className={className}
      >
        <Text type="caption" color="gray">
          {children}
        </Text>
      </TableColumnHeader>
    );
  return (
    <HeaderSort
      width={width}
      type="button"
      onClick={handleClick}
      className={className}
      minWidth={minWidth}
    >
      <Text type="caption" color="gray">
        {children}
      </Text>
      {active &&
        (ascending ? (
          <Ascending height={24} width={24} />
        ) : (
          <Descending height={24} width={24} />
        ))}
    </HeaderSort>
  );
};
