import { Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import ImageNotFound from '../../../assets/avatar.png';
import './ListUsers.css';

const ListUsers = ({ users, setShowModal }) => {
  console.log('users', users);
  const navigate = useNavigate();

  const goToUser = username => {
    navigate(`/${username}`);
    setShowModal(false);
  };

  return (
    <div className='list-users'>
      {users.map.length > 0 ? (
        users.map(user => (
          <div
            key={user.username}
            className='list-users__user'
            onClick={() => goToUser(user.username)}
          >
            <Image src={user.avatar || ImageNotFound} avatar />
            <div>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
          </div>
        ))
      ) : (
        <p className='list-users__not-users'>No se han encontrado resultados</p>
      )}
    </div>
  );
};

export default ListUsers;
