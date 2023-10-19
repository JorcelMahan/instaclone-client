import { Modal } from 'semantic-ui-react';
import './ModalBasic.css';

const ModalBasic = props => {
  const { show, setShow, title, children } = props;

  const onClose = () => setShow(false);

  return (
    <Modal className='modal-basic' open={show} onClose={onClose} size='mini'>
      {title && <Modal.Header>{title}</Modal.Header>}
      {children}
    </Modal>
  );
};

export default ModalBasic;
