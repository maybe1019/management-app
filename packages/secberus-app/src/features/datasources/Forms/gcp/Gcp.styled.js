import styled from 'styled-components';
import { Dropzone } from '../../../../components';

export const DragNDrop = styled.div`
  display: ${props => (props.visible ? 'inline' : 'none')};
  grid-column: 1/3;
`;

export const StyledDropZone = styled(Dropzone)`
  display: flex;
  border-radius: 24px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: ${props => `2px dashed ${props.theme.colors['medium-gray']}`};
  background: ${props => props.theme.colors['light-gray']};
  height: 194px;
  cursor: pointer;
  margin-top: 6px;
`;

export const PasteJSON = styled.div`
  width: 100%;
  grid-column: 1/3;
  display: flex;
  flex-direction: column;
`;

export const ManualInputs = styled.div`
  display: ${props => (props.visible ? 'grid' : 'none')};
  grid-template-columns: repeat(2, 324px);
  gap: 24px;
`;

export const DropzoneLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & path {
    stroke: ${props => props.theme.colors.gray};
  }
  & .upload {
    transform: rotate(-90deg);
    margin-bottom: 16px;
  }
  & .file-icon {
    margin-right: 4px;
  }
`;
