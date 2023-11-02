import { useState, useCallback } from 'react';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from '../../../gql/user';
import AuthContext from '../../../context/AuthContext';
import { storage } from '../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import './AvatarForm.css';

const AvatarForm = ({ setShowModal, auth }) => {
  const [loading, setLoading] = useState(false);

  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });
      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: { ...getUser, avatar: updateAvatar.url },
        },
      });
    },
  });

  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache, { data: { deleteAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });
      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: { ...getUser, avatar: '' },
        },
      });
    },
  });

  const onDrop = useCallback(
    async acceptedFile => {
      const file = acceptedFile[0];
      try {
        setLoading(true);
        const imageName = `${file.name}_${v4()}`;
        const imageRef = ref(storage, `avatar/${imageName}`);
        const snapshot = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(snapshot.ref);

        const result = await updateAvatar({ variables: { url } });
        const { data } = result;
        if (!data.updateAvatar.status) {
          toast.warning('Error al actualizar el avatar');
          setLoading(false);
        } else {
          setLoading(false);
          setShowModal(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [updateAvatar, setShowModal]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onDeleteAvatar = async () => {
    try {
      const result = await deleteAvatar();
      const { data } = result;
      if (!data.deleteAvatar) {
        toast.warning('Error al eliminar el avatar');
      } else {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='avatar-form'>
      <Button {...getRootProps()} loading={loading}>
        Cargar una foto
      </Button>
      <Button onClick={onDeleteAvatar}>Eliminar foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  );
};

export default AvatarForm;
