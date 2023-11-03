import styled, { keyframes } from 'styled-components';
import { AutoCompleteSelect } from '../../autocomplete-select/AutoCompleteSelect.component';

// gamers
const riseUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const StyledAutoComplete = styled(AutoCompleteSelect)`
  padding: 8px 16px;
  button {
    max-width: 100%;
    animation: ${riseUp} 0.2s ease-in;
    &:last-of-type {
      margin-bottom: 8px;
    }
  }
  ul {
    position: relative;
  }
`;
