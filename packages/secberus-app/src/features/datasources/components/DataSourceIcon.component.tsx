import React from 'react';
import { RESOURCE_LOGO_BY_DATASOURCE } from '@secberus/components';

export type DataSourceTypeId = keyof typeof RESOURCE_LOGO_BY_DATASOURCE;

export const DataSourceIcon = ({
  type = 'default',
  ...svg
}: {
  type: DataSourceTypeId;
} & Pick<React.SVGProps<SVGSVGElement>, 'height' | 'width'>) => {
  const Icon =
    RESOURCE_LOGO_BY_DATASOURCE[type] ?? RESOURCE_LOGO_BY_DATASOURCE.default;
  return <Icon {...svg} />;
};
