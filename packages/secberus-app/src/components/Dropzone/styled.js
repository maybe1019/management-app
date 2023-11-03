import styled from 'styled-components/macro';

export const DropBox = styled.div`
  &&& {
    ${props => props.isDragAccept && 'background: #389e0d4f'}
    ${props => props.isDragReject && 'background: #d92d0b3d'}
  }
`;
