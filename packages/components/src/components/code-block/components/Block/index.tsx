import React from 'react';
import { isEqual } from 'lodash';
import JSONTree from 'react-json-tree';
import { BlockProps } from '../../CodeBlock.types';
import { THEME, removeQuotes } from './Block.utils';

const Block: React.FC<BlockProps> = ({
  data,
  invertTheme = false,
  setExpanded,
}) => {
  const labelRenderer = (
    raw: (string | number)[],
    _: string,
    expanded: boolean
  ) => {
    setExpanded((prev: Record<string, boolean>) => {
      const newVal = { ...prev };
      newVal.persistButton = false;

      if (prev[raw[0]] || expanded) {
        newVal[raw[0]] = expanded;
        return newVal;
      }

      return newVal;
    });

    return <span>{raw[0]}:</span>;
  };

  const valueRenderer = (raw: string | number) => {
    if (typeof raw === 'string') return <span>{removeQuotes(raw)}</span>;
    return <span>{raw}</span>;
  };

  return (
    <JSONTree
      hideRoot
      data={data}
      labelRenderer={(
        keyPath: (string | number)[],
        nodeType: string,
        expanded: boolean
      ) => labelRenderer(keyPath, nodeType, expanded)}
      valueRenderer={valueRenderer}
      invertTheme={invertTheme}
      theme={{
        // @ts-ignore
        extend: THEME,
        tree: { marginTop: 0, marginBottom: 0, marginLeft: 0 },
        nestedNode: {
          paddingTop: 0,
        },
        value: {
          fontStyle: 'bold',
          fontFamily: '"Eina 01-Bold", sans-serif',
          fontSize: '15px',
          marginLeft: 0,
          paddingTop: 2,
        },
        valueLabel: {
          fontWeight: 'bold',
        },
      }}
    />
  );
};

export default React.memo(Block, isEqual);
