import { DropzoneRootProps, DropzoneInputProps, Accept } from 'react-dropzone';

export type FileType = ArrayBuffer | File;

export interface CustomDropzone {
  subtitle?: string | JSX.Element | React.ReactNode;
  dropzoneRootArgs?: DropzoneRootProps;
  dropzoneInputArgs?: DropzoneInputProps;
  onChange: (file: any, blob?: Blob) => void;
  accept?: Accept;
  fileReaderReadAs?: 'ARRAY_BUFFER' | 'BINARY_STRING' | 'DATA_URL' | 'TEXT';
}
