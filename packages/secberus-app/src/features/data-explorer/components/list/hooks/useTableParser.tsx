import React from 'react';
import { Text, RCTableExtendedColumnType } from '@secberus/components';
import { Box } from '@chakra-ui/react';
import { useDeepMemo } from '@secberus/utils';

function stringValue(value: any) {
  return typeof value === 'object'
    ? JSON.stringify(value, null)
    : typeof value === 'boolean'
    ? value
      ? 'true'
      : 'false'
    : value;
}

export const useTableParser = (nons: Record<string, any>[]) => {
  const columns: RCTableExtendedColumnType<Record<string, unknown>>[] =
    useDeepMemo(() => {
      if (!nons || !nons?.[0]) return [];
      const colKeys = Object.keys(nons[0]);
      let colData: RCTableExtendedColumnType<Record<string, unknown>> = {};
      const columns = colKeys.map((key: string, index) => {
        colData = {
          key,
          dataIndex: key,
          title: key,
          sort: false,
          resize: false,
          render: (_val: any, row: Record<string, any>) => (
            <Box
              minWidth="140px"
              whiteSpace="nowrap"
              maxWidth="540px"
              overflowX="auto"
            >
              <Text type="xsmall-regular" color="extra-dark">
                {stringValue(row?.[key])}
              </Text>
            </Box>
          ),
        };
        if (index !== colKeys?.length - 1) colData['width'] = 240;
        return colData;
      });
      return columns;
    }, [nons]);
  return {
    columns,
  };
};
