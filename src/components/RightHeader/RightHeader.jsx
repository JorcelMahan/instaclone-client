import { useState } from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ImageNotFound from '../../assets/avatar.png';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/user';
import './RightHeader.css';

const RightHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  if (loading) return null;
  if (error) return <p>{error.message}</p>;

  const { getUser } = data;

  return (
    <div className='right-header'>
      <Link to='/'>
        <Icon name='home' />
      </Link>
      <Icon name='plus' onClick={() => setShowModal(true)} />
      <Link to={`/${auth.username}`}>
        <Image src={getUser.avatar ? getUser.avatar : ImageNotFound} avatar />
      </Link>
    </div>
  );
};

export default RightHeader;
