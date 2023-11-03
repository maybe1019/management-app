import styled from 'styled-components';

export const SelectedChip = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors['light-blue']};
  border-radius: 4px;
  align-items: center;
  margin-top: 6px;
  padding: 8px 12px 8px 12px;
  & p {
    margin-right: 4px;
    word-break: break-word;
  }
  & rect {
    fill: ${props => props.theme.colors['light-gray']};
  }
`;

export const RemoveChip = styled.div`
  display: flex;
  cursor: pointer;
  margin-left: auto;
`;
