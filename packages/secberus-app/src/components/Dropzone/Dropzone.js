import PropTypes from 'prop-types';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import { DropBox } from './styled';

export const Dropzone = ({
  acceptedMimeTypes,
  className,
  children,
  onDrop,
}) => {
  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({ onDrop, accept: acceptedMimeTypes });
  const message = isDragReject ? 'Not an accepted file type' : children;
  return (
    <DropBox
      isDragReject={isDragReject}
      isDragAccept={isDragAccept}
      {...getRootProps()}
      className={className}
    >
      <input {...getInputProps()} />
      {message}
    </DropBox>
  );
};

Dropzone.defaultProps = {
  className: '',
};

Dropzone.propTypes = {
  acceptedMimeTypes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  onDrop: PropTypes.func.isRequired,
};
