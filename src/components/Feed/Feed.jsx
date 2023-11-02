import { useState, useEffect } from 'react';
import { Image, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS_FOLLOWED } from '../../gql/publication';
import ImageNotFound from '../../assets/avatar.png';
import CommentForm from '../Modal/ModalPublication/CommentForm/CommentForm';
import ModalPublication from '../Modal/ModalPublication/ModalPublication';
import Actions from '../Modal/ModalPublication/Actions/Actions';
import './Feed.css';

const Feed = () => {
  const [showModal, setShowModal] = useState(false);
  const [publicationSelected, setPublicationSelected] = useState(null);

  const { data, loading, error, startPolling, stopPolling } = useQuery(
    GET_PUBLICATIONS_FOLLOWED
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return <Loader active />;
  if (error) return <p>{error.message}</p>;
  const { getPublicationsFollowed } = data;

  const openPublication = publication => {
    setPublicationSelected(publication);
    setShowModal(true);
  };

  return (
    <>
      <div className='feed'>
        {getPublicationsFollowed.map((publication, index) => (
          <div key={index} className='feed__box'>
            <Link to={`/${publication.user.username}`}>
              <div className='feed__box-user'>
                <Image src={publication.user.avatar || ImageNotFound} avatar />
                <span>{publication.user.name}</span>
              </div>
            </Link>
            <div
              className='feed__box-photo'
              style={{
                backgroundImage: `url("${
                  publication?.url ? publication.url : ''
                }")`,
              }}
              onClick={() => openPublication(publication)}
            />
            <div className='feed__box-actions'>
              <Actions publication={publication} />
            </div>
            <div className='feed__box-form'>
              <CommentForm publication={publication} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalPublication
          show={showModal}
          setShow={setShowModal}
          publication={publicationSelected}
        />
      )}
    </>
  );
};

export default Feed;
