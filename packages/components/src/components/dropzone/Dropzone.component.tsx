import React from 'react';
import { createEnvAwareLogger } from '@secberus/utils';
import { SignOutLight, ReportLight } from '@secberus/icons';
import { Box } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { Text } from '../';
import { StyledDropzone, CustomDropzone, DropzoneLabel, FileType } from '.';

export function Dropzone({
  dropzoneInputArgs,
  dropzoneRootArgs,
  onChange,
  subtitle,
  fileReaderReadAs,
  accept,
}: CustomDropzone) {
  const logger = createEnvAwareLogger();

  const onDrop = React.useCallback(
    acceptedFiles => {
      acceptedFiles.forEach((file: Blob) => {
        const reader = new window.FileReader();
        reader.onerror = e => () => logger.error(e);
        reader.onload = e => {
          try {
            const comp = e.target?.result as FileType;
            if (!comp) logger.error('File was unreadable or invalid');
          } catch (ex) {
            logger.error(ex);
          }
        };
        switch (fileReaderReadAs) {
          case 'ARRAY_BUFFER':
            reader.readAsArrayBuffer(file);
            break;
          case 'BINARY_STRING':
            reader.readAsBinaryString(file);
            break;
          case 'DATA_URL':
            reader.readAsDataURL(file);
            break;
          default:
            reader.readAsText(file);
        }
      });
    },
    [fileReaderReadAs, logger]
  );
  const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
    useDropzone({
      accept,
      onDrop,
      maxSize: 5242880,
    });

  React.useEffect(() => {
    onChange(acceptedFiles);
  }, [acceptedFiles, onChange]);

  const fileAccepted = !!acceptedFiles?.[0]?.name;

  return (
    <StyledDropzone className="container">
      <div
        className="dropzone-root"
        {...getRootProps({
          ...dropzoneRootArgs,
        })}
      >
        <input
          className="dropzone-input"
          {...getInputProps({
            type: 'file',
            ...dropzoneInputArgs,
          })}
        />
        <DropzoneLabel className="dropzone-label">
          <SignOutLight className="upload" height={50} width={50} />
          <Box
            className="dropzone-message-container"
            display="flex"
            marginBottom="8px"
          >
            <Text type="bold" color="gray">
              Drag and drop or
            </Text>
            <Text type="bold" color="blue">
              &nbsp;select a file
            </Text>
          </Box>
          {subtitle}
          {fileRejections?.[0] &&
            fileRejections[0].errors.map(e => (
              <Text
                className="dropzone-file-preview-text"
                type="xsmall-regular"
                color="red"
              >
                {e.code === 'file-invalid-type'
                  ? 'Incorrect format'
                  : 'File is too big (5MB maximum)'}
              </Text>
            ))}
          {fileAccepted && (
            <Text
              className="dropzone-file-preview-text"
              type="xsmall-regular"
              color="gray"
            >
              <Box display="flex" alignItems="center">
                <ReportLight className="file-icon" /> {acceptedFiles[0].name}{' '}
              </Box>
            </Text>
          )}
        </DropzoneLabel>
      </div>
    </StyledDropzone>
  );
}
