import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { withFirebase } from './firebase/context';
import { withCurrentUser } from './auth/context';

function Dropzone({ currentUser, firebase }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const onDrop = useCallback(([file]) => {
    if (file) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child('file.csv');
      const uploadTask = fileRef.put(file)
      uploadTask.then(function(snapshot) {
        console.log('snapshot', snapshot);
      });
      uploadTask.on('state_changed', function(snapshot) {
        console.log('snapshot in progress', snapshot);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{backgroundColor: 'red', width: '300px', height: '300px'}}>
      <div>Progress: {Math.round(uploadProgress)}</div>
      <input {...getInputProps()} />
      { isDragActive ?
        <p>Drop files here</p> :
        <p>Drag and drop files here to upload</p>
      }
    </div>
  );
}

export default withFirebase(withCurrentUser(Dropzone));
