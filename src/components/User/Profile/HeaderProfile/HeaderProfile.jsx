import { Button } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/client';
import { IS_FOLLOW, FOLLOW, UNFOLLOW } from '../../../../gql/follow';
import './HeaderProfile.css';

const HeaderProfile = ({ getUser, auth, handleModal }) => {
  const [follow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UNFOLLOW);
  const { data, loading, refetch } = useQuery(IS_FOLLOW, {
    variables: { username: getUser.username },
  });

  const buttonFollow = () => {
    if (data.isFollow) {
      return (
        <Button className='btn-danger' onClick={onUnfollow}>
          Dejar de seguir
        </Button>
      );
    } else {
      return (
        <Button className='btn-action' onClick={onFollow}>
          Seguir
        </Button>
      );
    }
  };

  const onFollow = async () => {
    try {
      await follow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const onUnfollow = async () => {
    try {
      await unfollow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='header-profile'>
      <h2>{getUser.username}</h2>
      {auth.username === getUser.username ? (
        <Button onClick={() => handleModal('settings')}>Ajustes</Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
};

export default HeaderProfile;
