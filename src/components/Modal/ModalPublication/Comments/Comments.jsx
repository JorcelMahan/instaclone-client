import { useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../../../../gql/comment';
import ImageNotFound from '../../../../assets/avatar.png';
import './Comments.css';

const Comments = ({ publication }) => {
  const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
    variables: {
      idPublication: publication.id,
    },
  });

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  const { getComments } = data;

  return (
    <div className='comments'>
      {getComments.map((comment, index) => (
        <Link key={index} to={`/${comment.user.username}`} className='comment'>
          <Image src={comment.user.avatar || ImageNotFound} avatar />
          <div>
            <p>{comment.user.username}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Comments;
