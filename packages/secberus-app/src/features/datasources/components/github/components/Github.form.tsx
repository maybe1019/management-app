import React from 'react';
import {
  RESOURCE_LOGO_BY_DATASOURCE,
  Button,
  Text,
} from '@secberus/components';
import { useParams } from 'react-router';
import { useGenerateGithubState } from '../hooks';
import { GITHUB_APP_URL } from '../constants';
import {
  StyledModal,
  InitButtonContainer,
  InitTextContainer,
  FirstRow,
  SecondRow,
  ImageContainer,
} from './Github.styled';
import {
  EDIT_INSTRUCTIONS_TEXT,
  INIT_FIRST_TEXT,
  INIT_SECOND_TEXT,
} from './Github.constants';
import { LoadingModal } from './Github.loading';

interface GithubFormProps {
  onRequestClose: any;
  visible: boolean;
}

const getRedirectUrl = (state: string) => {
  const rdUrl = new URL(GITHUB_APP_URL + '/installations/new');
  rdUrl.searchParams.set('state', state);

  return rdUrl;
};

export const GithubForm: React.FC<GithubFormProps> = ({
  onRequestClose,
  visible,
}) => {
  const Icon = RESOURCE_LOGO_BY_DATASOURCE.github;
  const { id }: { id: string } = useParams();
  const { handleGenerateState, isLoading, isUninitialized } =
    useGenerateGithubState();

  const isEdit = !!id;

  const initIntegration = async () => {
    const {
      //@ts-expect-error
      data: { state },
    } = await handleGenerateState();

    window.location.replace(getRedirectUrl(state).toString());
  };

  if (isLoading || !isUninitialized) {
    return <LoadingModal />;
  }

  return (
    <StyledModal
      handleClose={onRequestClose}
      title={`${isEdit ? 'Edit' : 'Add'} GitHub data source`}
      isVisible={visible}
      variant="light"
      options={{
        useBackground: true,
        fixedOverScreen: true,
        useAnimation: true,
        closeIcon: true,
      }}
    >
      <InitTextContainer>
        <FirstRow>
          <ImageContainer>
            <Icon />
          </ImageContainer>
          <Text type="small-regular">
            {isEdit ? EDIT_INSTRUCTIONS_TEXT : INIT_FIRST_TEXT}
          </Text>
        </FirstRow>
        {!isEdit && (
          <SecondRow>
            <Text type="small-regular">{INIT_SECOND_TEXT}</Text>
          </SecondRow>
        )}
      </InitTextContainer>
      <InitButtonContainer>
        <Button
          variant="primary"
          onClick={isEdit ? onRequestClose : initIntegration}
        >
          {isEdit ? 'Close' : 'Connect'}
        </Button>
      </InitButtonContainer>
    </StyledModal>
  );
};
