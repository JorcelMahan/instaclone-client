import { useState, useCallback } from 'react';
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { PUBLISH } from '../../../gql/publication';
import { storage } from '../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import './ModalUpload.css';

const ModalUpload = ({ show, setShow }) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publish, { loading, error: errorPublish }] = useMutation(PUBLISH);

  const onDrop = useCallback(acceptedFile => {
    if (!acceptedFile || acceptedFile.length === 0) {
      console.error('No file was selected for upload.');
      return;
    }

    const file = acceptedFile[0];
    if (!file.type.startsWith('image/')) {
      console.error('The selected file is not an image.');
      return;
    }

    setFileUpload({
      type: 'image',
      file,
      preview: URL.createObjectURL(file),
    });
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onClose = () => {
    setIsLoading(false);
    setFileUpload(null);
    setShow(false);
  };

  // upload file to firebase storage and get url and save to db using graphql
  const onPublish = async () => {
    if (!fileUpload) {
      toast.warning('You must select an image');
      return;
    }
    setIsLoading(true);

    const imageName = `${fileUpload.file.name}_${v4()}`;
    const imageRef = ref(storage, `images/${imageName}`);

    try {
      const snapshot = await uploadBytes(imageRef, fileUpload.file);
      const url = await getDownloadURL(snapshot.ref);

      await publish({
        variables: {
          url,
        },
      });
    } catch (error) {
      toast.error(`Error publishing image: ${error.message}`);
    } finally {
      onClose();
    }
  };

  // if (loading || isLoading) {
  //   return (
  //     <Dimmer active className='publishing'>
  //       <Loader />
  //       <p>Uploading...</p>
  //     </Dimmer>
  //   );
  // }

  return (
    <Modal size='small' open={show} onClose={onClose} className='modal-upload'>
      <div
        {...getRootProps()}
        className='dropzone'
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name='cloud upload' />
            <p>Drag and drop an image here</p>
          </>
        )}
        <input {...getInputProps()} />
      </div>
      {fileUpload?.type === 'image' && (
        <div
          className='image'
          style={{ backgroundImage: `url("${fileUpload.preview}")` }}
        />
      )}
      {fileUpload && (
        <Button className='btn-upload btn-action' onClick={onPublish}>
          Publish
        </Button>
      )}
      {isLoading && (
        <Dimmer active className='publishing'>
          <Loader />
          <p>Uploading...</p>
        </Dimmer>
      )}
    </Modal>
  );
};

export default ModalUpload;
