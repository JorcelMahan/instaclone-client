import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from '../gql/publication';
import Profile from '../components/User/Profile/Profile';
import Publications from '../components/Publications/Publications';

const User = () => {
  const { username } = useParams();
  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PUBLICATIONS,
    {
      variables: { username },
    }
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  const { getPublications } = data;

  return (
    <>
      <Profile username={username} totalPublications={getPublications.length} />
      <Publications getPublications={getPublications} />
    </>
  );
};

export default User;
