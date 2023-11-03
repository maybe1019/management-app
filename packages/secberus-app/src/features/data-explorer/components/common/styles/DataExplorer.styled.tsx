import styled from 'styled-components';
import { Box } from '@chakra-ui/react';

export const ScrollContainer = styled.div`
  * .Pane1 {
    overflow-y: auto;
  }
`;

export const TextOverflow = styled(Box)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  .column-type {
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .column-name {
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const DataExplorerWrapper = styled.div``;
