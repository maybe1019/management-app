import styled from 'styled-components';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

export const StyledSplitPane = styled(Allotment)`
  * {
    .sash {
      z-index: 10000;
    }
  }
`;
