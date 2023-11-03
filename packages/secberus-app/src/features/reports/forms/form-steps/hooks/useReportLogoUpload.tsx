import React from 'react';
import { Dropzone, Text, Checkbox } from '@secberus/components';
import { Box } from '@chakra-ui/react';
import { AnyFn } from '@secberus/utils';

interface UseReportLogoUploadProps {
  currentFile?: Array<File>;
  onToggleDropzone?: AnyFn;
}
export function useReportLogoUpload({
  currentFile,
  onToggleDropzone,
}: UseReportLogoUploadProps) {
  const [file, setFile] = React.useState<Array<File>>();
  const [blob, setBlob] = React.useState<Blob>();

  const [dropzoneVisible, setDropzoneVisible] = React.useState<boolean>(false);
  const handleOnChange = (file: Array<File>, blob: Blob | undefined) => {
    setFile(file);
    blob && setBlob(blob);
  };

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e?.target?.checked;
    setDropzoneVisible(checked);
    onToggleDropzone?.(checked);
  };
  return {
    file,
    setFile,
    blob,
    setBlob,
    dropzoneVisible,
    setDropzoneVisible,
    render: (
      <Box width="558px">
        <Box mt="24px" mb={dropzoneVisible ? '24px' : '0'}>
          <Checkbox
            name="show_dropzone"
            onChange={toggleCheckbox}
            labelType="small-regular"
            label="Use a custom logo in the report header"
            checked={dropzoneVisible}
          />
        </Box>
        {dropzoneVisible && (
          <Box height="200px">
            <Dropzone
              onChange={handleOnChange}
              accept={{
                'image/png': ['.png'],
                'image/svg': ['.svg'],
                'image/jpeg': ['.jpeg', '.jpg'],
              }}
              fileReaderReadAs="BINARY_STRING"
              subtitle={
                <>
                  <Text type="xsmall-regular" align="center">
                    Only JPEG, PNG, and SVG file
                    <br />
                    formats are accepted
                  </Text>
                </>
              }
            />
          </Box>
        )}
      </Box>
    ),
  };
}
