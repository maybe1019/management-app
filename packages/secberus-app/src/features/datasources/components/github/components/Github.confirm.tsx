import React from 'react';
import { Redirect } from 'react-router-dom';
import { CheckBall } from '@secberus/icons';
import { Button } from '@secberus/components';
import { useQuery } from '../../../../../hooks/useQuery';
import { useGithubInstallation } from '../hooks';
import { LoadingModal } from './Github.loading';
import {
  StyledModal,
  CenteredContentContainer,
  ConfirmTextContainer,
  CenteredText,
  ConfirmSecondText,
  ConfirmImageContainer,
  ConfirmContainer,
} from './Github.styled';
import { CONFIRM_FIRST_TEXT, CONFIRM_SECOND_TEXT } from './Github.constants';

type QueryParams = 'installation_id' | 'state';

interface GithubConfirmProps {
  redirectTo: string;
}

export const GithubConfirm: React.FC<GithubConfirmProps> = ({ redirectTo }) => {
  const { installation_id, state } = useQuery<QueryParams>();

  const { handleGithubInstallation, isLoading, isUninitialized, isError } =
    useGithubInstallation();

  React.useEffect(() => {
    if (!installation_id || !state) return;
    handleGithubInstallation(installation_id, state);
  }, [handleGithubInstallation, installation_id, state]);

  if (isLoading || isUninitialized) {
    return <LoadingModal />;
  }

  if (isError) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <StyledModal
      isVisible
      variant="light"
      options={{
        useBackground: true,
        fixedOverScreen: true,
        useAnimation: true,
      }}
    >
      <ConfirmContainer>
        <ConfirmImageContainer>
          <CheckBall />
        </ConfirmImageContainer>
        <ConfirmTextContainer>
          <CenteredText type="small-regular">{CONFIRM_FIRST_TEXT}</CenteredText>
          <ConfirmSecondText type="small-regular">
            {CONFIRM_SECOND_TEXT}
          </ConfirmSecondText>
        </ConfirmTextContainer>
        <CenteredContentContainer>
          <Button variant="primary" to={redirectTo}>
            Close
          </Button>
        </CenteredContentContainer>
      </ConfirmContainer>
    </StyledModal>
  );
};
