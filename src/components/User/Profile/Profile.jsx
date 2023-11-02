import { useState } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import UserNotFound from '../../UserNotFound/UserNotFound';
import useAuth from '../../../hooks/useAuth';
import ModalBasic from '../../Modal/ModalBasic/ModalBasic';
import AvatarForm from '../AvatarForm/AvatarForm';
import HeaderProfile from './HeaderProfile/HeaderProfile';
import SettingsForm from '../SettingsForm/SettingsForm';
import Followers from './Followers/Followers';
import ImageNotFound from '../../../assets/avatar.png';
import './Profile.css';

const Profile = ({ username, totalPublications }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [childrenModal, setChildrenModal] = useState(null);
  const { auth } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return <UserNotFound />;

  const { getUser } = data;

  const handleModal = type => {
    switch (type) {
      case 'avatar':
        setTitleModal('Cambiar foto de perfil');
        setChildrenModal(
          <AvatarForm setShowModal={setShowModal} auth={auth} />
        );
        setShowModal(true);
        break;
      case 'settings':
        setTitleModal('Editar perfil');
        setChildrenModal(
          <SettingsForm
            setShowModal={setShowModal}
            setTitleModal={setTitleModal}
            setChildrenModal={setChildrenModal}
            getUser={getUser}
            refetch={refetch}
          />
        );
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Grid className='profile'>
        <Grid.Column width={5} className='profile__left'>
          <Image
            src={getUser.avatar || ImageNotFound}
            avatar
            onClick={() => username === auth.username && handleModal('avatar')}
          />
        </Grid.Column>
        <Grid.Column width={11} className='profile__right'>
          <HeaderProfile
            getUser={getUser}
            auth={auth}
            handleModal={handleModal}
          />
          <Followers
            username={getUser.username}
            totalPublications={totalPublications}
          />
          <div className='other'>
            <p className='name'>{getUser.name}</p>
            {getUser.website && (
              <a
                href={getUser.website}
                className='website'
                target='_blank'
                rel='noopener noreferrer'
              >
                {getUser.website}
              </a>
            )}
            {getUser.description && (
              <p className='description'>{getUser.description}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
};

export default Profile;
