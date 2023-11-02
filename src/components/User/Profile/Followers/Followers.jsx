import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWERS, GET_FOLLOWED } from '../../../../gql/follow';
import ModalBasic from '../../../Modal/ModalBasic/ModalBasic';
import ListUsers from '../../ListUsers/ListUsers';
import './Followers.css';

const Followers = ({ username, totalPublications }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [childrenModal, setChildrenModal] = useState(null);

  const { data, loading, startPolling, stopPolling } = useQuery(GET_FOLLOWERS, {
    variables: { username },
  });

  const {
    data: dataFollowed,
    loading: loadingFollowed,
    startPolling: startPollingFollowed,
    stopPolling: stopPollingFollowed,
  } = useQuery(GET_FOLLOWED, {
    variables: { username },
  });

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  useEffect(() => {
    startPollingFollowed(1000);
    return () => {
      stopPollingFollowed();
    };
  }, [startPollingFollowed, stopPollingFollowed]);

  const openFollowers = () => {
    setTitleModal('Seguidores');
    setChildrenModal(
      <ListUsers users={getFollowers} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  const openFollowed = () => {
    setTitleModal('Seguidos');
    setChildrenModal(
      <ListUsers users={getFollowed} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  if (loading || loadingFollowed) return null;
  const { getFollowers } = data;
  const { getFollowed } = dataFollowed;

  return (
    <>
      <div className='followers'>
        <p>
          <span>{totalPublications}</span> publicaciones
        </p>
        <p className='link' onClick={openFollowers}>
          <span>{getFollowers.length}</span> seguidores
        </p>
        <p className='link' onClick={openFollowed}>
          <span>{getFollowed.length}</span> seguidos
        </p>
      </div>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
};

export default Followers;
