import { IndicatorContainer } from '@secberus/components';
import styled from 'styled-components';

export const RiskyIndicatorContainer = styled(IndicatorContainer)`
  .indicator-container-header {
    padding-bottom: 16px;
  }

  * .ellipsis-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const OverviewPaginationContainer = styled.div`
  height: 48px;
  .pagination-container {
    border: none;
    height: 48px;
  }
  .pagination-navigation-controls {
    margin-right: 0px;
    margin-left: 24px;
  }
`;
