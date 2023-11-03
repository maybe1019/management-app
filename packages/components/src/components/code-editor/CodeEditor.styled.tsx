import styled from 'styled-components';
import { Select } from '../select/Select.component';

export const EditorDropdown = styled(Select)`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 999;
`;

export const Container = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
`;
