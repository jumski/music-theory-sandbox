import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone() {
  const onDrop = useCallback((files) => {
    console.log('files', files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      { isDragActive ?
        <p>Drop files here</p> :
        <p>Drag and drop files here to upload</p>
      }
    </div>
  );
}
