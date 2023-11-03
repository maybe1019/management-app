import { Wavyloader } from '@secberus/components';
import { SecberusSymbolLight, GithubLight } from '@secberus/icons';
import {
  StyledLoadingModal,
  LoadingImageContainer,
  PlusText,
  HorizontalIconContainer,
  CenteredText,
  WavyLoaderContainer,
} from './Github.styled';

export const LoadingModal: React.FC = () => {
  return (
    <StyledLoadingModal
      isVisible
      variant="light"
      options={{
        useBackground: true,
        fixedOverScreen: true,
        useAnimation: true,
      }}
    >
      <HorizontalIconContainer>
        <LoadingImageContainer>
          <SecberusSymbolLight />
        </LoadingImageContainer>
        <PlusText type="bold">+</PlusText>
        <LoadingImageContainer>
          <GithubLight />
        </LoadingImageContainer>
      </HorizontalIconContainer>
      <CenteredText type="small-regular">Connecting...</CenteredText>
      <WavyLoaderContainer>
        <Wavyloader size="large" />
      </WavyLoaderContainer>
    </StyledLoadingModal>
  );
};
