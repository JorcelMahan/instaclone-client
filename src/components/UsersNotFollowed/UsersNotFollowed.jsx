import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_NOT_FOLLOWED } from '../../gql/follow';
import ImageNotFound from '../../assets/avatar.png';
import './UsersNotFollowed.css';

const UsersNotFollowed = () => {
  const { data, loading, error } = useQuery(GET_NOT_FOLLOWED);

  if (loading) return null;
  if (error) return null;
  const { getNotFollowed } = data;
  return (
    <div className='users-not-followed'>
      <h3>Usuarios que quizás conozcas</h3>
      {getNotFollowed.map((user, index) => (
        <Link
          to={`/${user.username}`}
          key={index}
          className='users-not-followed__user'
        >
          <Image src={user.avatar || ImageNotFound} avatar />
          <span>{user.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default UsersNotFollowed;
