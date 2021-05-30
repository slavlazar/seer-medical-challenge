import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import { useMultifileReader } from '../hooks/useMultifileReader';
import {
  Wrapper,
  Container,
  DropboxInputContainer,
  DropboxLabel,
  DropboxSpan,
} from './ui/Dropzone';

const Dropzone = ({ onUploadedFiles, ...params }) => {
  const [{ loading, errors }, readFiles] = useMultifileReader({ onloadCallback: onUploadedFiles });

  const onDrop = (files) => {
    readFiles(files);
  };
  const { getRootProps, getInputProps } = useDropzone({ ...params, onDrop });

  return (
    <Wrapper>
      <Container {...getRootProps()}>
        <DropboxInputContainer>
          <input id="dropbox" {...getInputProps()} />
          <DropboxSpan>Drag files here to upload, or</DropboxSpan>
          <DropboxLabel htmlFor="dropbox">browse for files</DropboxLabel>
          {errors.length > 0 && <p>Error!</p>}
          {loading && <p>Loading...</p>}
        </DropboxInputContainer>
      </Container>
    </Wrapper>
  );
};

Dropzone.propTypes = {
  onUploadedFiles: PropTypes.func.isRequired,
};

export default Dropzone;
