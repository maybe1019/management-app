import React from 'react';
import { Icons } from './components';
export type DataValue = Record<string, string | boolean>;

export type Data = {
  provider: keyof typeof Icons;
  name: string;
  data: DataValue;
};

interface BaseProps {
  invertTheme?: boolean;
}

export interface BlockProps extends BaseProps {
  data: DataValue;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}
export interface CodeBlockTypes extends BaseProps {
  data: Data[] | DataValue;
}
