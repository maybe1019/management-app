import React, { useState } from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import {
  Button,
  Text,
  Input,
  Checkbox,
  LoadingOverlay,
  CheckedMultiSelect,
} from '@secberus/components';
import { Controller } from 'react-hook-form';
import {
  reportSchedulesApi,
  complianceFrameworksApi,
  useUploadToPresignedS3UrlMutation,
} from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { EditLink, Section, SelectInfo } from '../ReportForm.styled';
import { useNotify } from '../../../../store';
import { ReportFormProps } from './StepsForm.types';
import { useReportLogoUpload } from './hooks';

export const CustomizeReportForm: React.FC<ReportFormProps> = ({
  errors,
  report,
  register,
  handleEdit,
  control,
  handleSubmit,
  handleStepIncrement,
  isCompleted,
  isCurrent,
  isEdit,
  setStepComponentRef,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const type = report?.type;
  const name = report?.name;
  const headerImage = report?.header_image;
  const frameworks = report?.frameworks;
  const recommendations = report?.include_recommendations;
  const { notifyError } = useNotify();
  const logger = createEnvAwareLogger();
  const [recommendationsState, setRecommendationsState] =
    useState(recommendations);
  const { data: frameworksList = [], isLoading: isLoadingFrameworks } =
    complianceFrameworksApi.useGetComplianceFrameworksQuery({
      enabled: 'true',
    });
  const [
    createSignedUrl,
    { data: signedUrlResponse, ...createSignedUrlQuery },
  ] = reportSchedulesApi.useCreateSignedUrlMutation();
  const [uploadToS3, { data: uploadResponse, ...uploadToS3Query }] =
    useUploadToPresignedS3UrlMutation();
  const isUploading =
    createSignedUrlQuery.isLoading || uploadToS3Query.isLoading;
  const clearOnFalsyCheckbox = (isToggled: boolean) => {
    if (!isToggled) {
      control?.setValue('header_image', undefined);
    }
  };

  const isLoading = isLoadingFrameworks;

  // unable to get currentFile from s3 for now but added anyways
  const {
    file,
    render: UploadRender,
    dropzoneVisible,
  } = useReportLogoUpload({
    currentFile: undefined,
    onToggleDropzone: clearOnFalsyCheckbox,
  });

  const handleUpload = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      (async () => {
        if (!file?.[0]) {
          reject('No file selected to upload');
          logger.error('Cannot find file');
          return;
        }

        const res = await createSignedUrl({
          createSignedUrl: {
            image_name: file?.[0]?.name,
          },
        });
        // Disgusting if statement to satisfy typescript
        if (
          typeof res === 'undefined' ||
          !('data' in res) ||
          !res.data?.signed_url
        ) {
          reject('Error occurred during file upload');
          logger.error('Failed to retrieve signed url');
          return;
        }

        const uploadResult = await uploadToS3({
          file: new Blob([file[0]]),
          url: res.data.signed_url,
        });

        if ('error' in uploadResult || !('data' in uploadResult)) {
          reject('Error occurred during file upload');
          logger.error('Error occurred during file upload', uploadResult.error);
          return;
        }

        resolve(res.data.image_key as string);
      })();
    });
  };

  const onClickContinue = async () => {
    if (!isEdit && dropzoneVisible) {
      try {
        // Assume a file should be uploaded since dropzone visible
        const header_image = await handleUpload();
        control?.setValue('header_image', header_image);
      } catch (error) {
        // Prevent moving to the next step if rejected promise
        notifyError(error);
        return;
      }
    }
    handleStepIncrement?.('NEXT');
  };

  React.useEffect(() => {
    if (ref.current && isCompleted) {
      setStepComponentRef(prev => {
        return {
          ...prev,
          customize: ref.current?.offsetHeight || 0,
        };
      });
    }
  }, [isCompleted, setStepComponentRef]);

  if (isLoading) return <LoadingOverlay />;

  return (
    <>
      <Box
        maxWidth="552px"
        display={isCompleted ? 'none' : isCurrent ? 'block' : 'none'}
      >
        <Section>
          <Text type="small-bold">Customize report</Text>
        </Section>
        <Input
          name="name"
          className="input"
          label="Name report"
          defaultValue={name}
          error={errors.name}
          ref={register}
          placeholder="Enterprise hosting overview"
        />
        {type === 'COMPLIANCE' && (
          <Controller
            name="frameworks"
            control={control}
            render={({ value, onChange }) => {
              return (
                <Box mt="24px">
                  <CheckedMultiSelect
                    data={frameworksList}
                    label="Frameworks"
                    displayKey="name"
                    placeholder="Select frameworks"
                    selectAllLabel="Select all frameworks"
                    valueKey="id"
                    value={value}
                    minItemsShown={5}
                    onChange={onChange}
                    allowSelectAll={true}
                  />
                  <SelectInfo>
                    Choose the frameworks to include in the report
                  </SelectInfo>
                </Box>
              );
            }}
          />
        )}
        {!isEdit && (
          <Controller
            control={control}
            name="header_image"
            render={() => UploadRender}
          />
        )}
        {type === 'COMPLIANCE' && (
          <Box mt="24px">
            <Checkbox
              ref={register}
              name="include_recommendations"
              labelType="small-regular"
              label="Include recommendations"
              checked={recommendationsState}
              onChange={() => setRecommendationsState(!recommendationsState)}
            />
          </Box>
        )}
        <Flex pt="48px" gridGap="8px" justifyContent="right">
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onClickContinue)}
          >
            Continue
          </Button>
        </Flex>
      </Box>
      {!isCompleted && isUploading && (
        <Box
          position="absolute"
          top="0px"
          left="0px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1000"
          w="100%"
          h="100%"
          background="rgba(0,0,0,0.2)"
          borderRadius="16px"
        >
          <Spinner />
        </Box>
      )}
      {isCompleted && !isLoading && (
        <Section ref={ref}>
          <Text type="small-bold">Customize report</Text>
          <Text type="small-regular">{name}</Text>
          <Text type="small-regular">{headerImage && 'Custom logo'}</Text>
          {frameworks && frameworks?.length > 0 && (
            <Text type="small-regular">
              {frameworks.length + ' frameworks'}
            </Text>
          )}
          {recommendations && (
            <Text type="small-regular">Include recommendations</Text>
          )}
          <EditLink onClick={handleEdit}>Edit</EditLink>
        </Section>
      )}
    </>
  );
};
