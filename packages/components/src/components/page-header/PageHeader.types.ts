import React from 'react';

export interface PageHeaderProps {
  sticky?: boolean;
  title?: string;
  children?: React.ReactNode;
  align?: 'space-between' | 'flex-end' | 'flex-start';
}
