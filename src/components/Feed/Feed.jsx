import { useState, useEffect } from 'react';
import { Image, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS_FOLLOWED } from '../../gql/publication';
import ImageNotFound from '../../assets/avatar.png';
import './Feed.css';

const Feed = () => {
  const { data, loading, error, startPolling, stopPolling } = useQuery(
    GET_PUBLICATIONS_FOLLOWED
  );

  //   useEffect(() => {
  //     startPolling(1000);
  //     return () => {
  //       stopPolling();
  //     };
  //   }, [startPolling, stopPolling]);

  if (loading) return <Loader active />;
  if (error) return <p>{error.message}</p>;
  const { getPublicationsFollowed } = data;
  console.log('getPublicationsFollowed', getPublicationsFollowed);

  return (
    <>
      <h1>Feed</h1>
      <div className='feed'>
        {getPublicationsFollowed.map((publication, index) => (
          <div key={index} className='feed__box'>
            <Link to={`/${publication.user.username}`}>
              <Image src={publication.user.avatar || ImageNotFound} avatar />
              <span>{publication.user.name}</span>
            </Link>
            <div
              className='feed__box-photo'
              style={{ backgroundImage: `url("${publication.file}")` }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
