import styled from 'styled-components';

export const EnablePointerEvents = styled.div`
  label {
    text-transform: capitalize;
  }
  textarea:disabled {
    pointer-events: auto !important;
  }
  input:disabled {
    pointer-events: auto !important; // doesnt work without it, i think its a portal problem.
  }
`;

// TODO: Move this into components
export const OrderedList = styled.ol`
  display: table;
  margin-left: 0;
  padding-left: 0;
  list-style: none;
  li {
    display: table-row;
    counter-increment: table-ol;
    &:before {
      content: counter(table-ol) '.';
      display: table-cell;
      padding-right: 0.4em;
      text-align: right;
    }
  }
`;

export const InlineText = styled.div`
  & p {
    display: flex;
  }
`;
