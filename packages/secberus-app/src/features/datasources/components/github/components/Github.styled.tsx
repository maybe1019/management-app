import styled from 'styled-components';
import { BaseModal, Text } from '@secberus/components';

export const StyledModal = styled(BaseModal)`
  width: 490px;
  min-height: 309px;
`;
export const StyledLoadingModal = styled(StyledModal)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InitTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
export const ConfirmTextContainer = styled(InitTextContainer)`
  align-items: center;
  margin-top: 24px;
  margin-bottom: 53px;
`;

export const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
export const SecondRow = styled.div`
  margin-bottom: 14px;
`;

export const CenteredText = styled(Text)`
  text-align: center;
`;
export const ConfirmSecondText = styled(Text)`
  text-align: center;
  margin-top: 20px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
  width: 90px;
  padding: 10px;
  border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  margin-right: 20px;

  svg {
    height: 70px;
    width: 70px;
  }
`;
export const LoadingImageContainer = styled(ImageContainer)`
  margin-right: 0px;
`;

export const HorizontalIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 64px;
  margin-bottom: 20px;
`;

export const PlusText = styled(Text)`
  margin: auto 30px;
`;

export const ConfirmImageContainer = styled.div`
  margin-top: 16px;
  svg {
    height: 70px;
    width: 70px;

    path {
      stroke-width: 1;
    }
  }
`;
export const InitButtonContainer = styled.div`
  display: flex;
`;
export const CenteredContentContainer = styled(InitButtonContainer)`
  justify-content: center;
`;
export const WavyLoaderContainer = styled(CenteredContentContainer)`
  margin-top: 32px;
  margin-bottom: 64px;
`;
