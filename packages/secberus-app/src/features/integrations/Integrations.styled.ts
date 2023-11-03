import styled from 'styled-components';
import { PenLight } from '@secberus/icons';
import { BaseModal, ConfirmModal } from '@secberus/components';

interface ModalProps extends React.HTMLAttributes<HTMLElement> {
  width: string;
}

export const TileSelectContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const TextContainer = styled.div`
  margin-bottom: 24px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 24px;
`;

export const StyledSettingsLight = styled(PenLight)`
  svg {
    path: ${({ theme }) => theme.colors.dark};
  }
`;

export const StyledModal = styled(BaseModal)<ModalProps>`
  min-width: 450px;
  min-height: 375px;
  width: ${({ width }) => width};
`;

export const StyledConfirmModal = styled(ConfirmModal)`
  min-width: 450px;
  max-width: 490px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CenterText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & > .bottomSpace {
    margin-bottom: 24px;
  }
  .svg_container {
    background: ${({ theme }) => theme.gradients.blue};
    background-size: cover;
    width: 58px;
    max-width: 58px;
    height: 58px;
    border-radius: 100%;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 30px;
      height: 30px;
    }
  }
  div {
    max-width: 450px;
  }
  margin-bottom: 32px;
  .bold {
    font-weight: bold;
  }
`;

export const StyledForm = styled.form`
  min-height: 250px;
`;
