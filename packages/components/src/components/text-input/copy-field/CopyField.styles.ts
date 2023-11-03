import styled from 'styled-components';
import { Button } from '../../button';

export const StyledCopyField = styled.div`
  position: relative;
  display: flex;
  & input,
  textarea {
    padding: 12px 48px 12px 24px;
  }
`;

export const CopyButton = styled(Button)`
  border-radius: 0px 24px 24px 0px;
  box-shadow: unset;
  background: transparent;
  position: absolute;
  right: 0;
  top: 25px;
  &.area {
    margin-bottom: 30px;
  }
  & .copy-input-icon {
    height: 24px;
    width: 24px;
  }
`;
