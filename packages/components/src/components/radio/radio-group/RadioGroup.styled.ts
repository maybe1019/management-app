import styled from 'styled-components';

export const StyledRadioGroup = styled.div<{ direction?: string }>`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  & .validation {
    display: flex;
    flex-direction: ${({ direction }) => direction};
    grid-gap: ${({ direction }) => (direction === 'row' ? '16px' : '0px')};
    & .radio-item {
      margin-bottom: 8px;
      & [type='radio'] {
        margin-left: 0px;
      }
    }
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  align-items: center;
  gap: 8px;
`;
