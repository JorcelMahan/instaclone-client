import { Modal, Grid } from 'semantic-ui-react';
import Comments from './Comments/Comments';
import Actions from './Actions/Actions';
import CommentForm from './CommentForm/CommentForm';
import './ModalPublication.css';

const ModalPublication = ({ show, setShow, publication }) => {
  const onClose = () => setShow(false);

  return (
    <Modal open={show} onClose={onClose} className='modal-publication'>
      <Grid>
        <Grid.Column
          className='modal-publication__left'
          width={10}
          style={{
            backgroundImage: `url("${
              publication?.url ? publication.url : ''
            }")`,
          }}
        />
        <Grid.Column className='modal-publication__right' width={6}>
          <Comments publication={publication} />
          <Actions publication={publication} />
          <CommentForm publication={publication} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
};

export default ModalPublication;
