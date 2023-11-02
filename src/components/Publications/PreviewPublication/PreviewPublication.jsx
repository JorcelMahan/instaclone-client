import { useState } from 'react';
import { Image } from 'semantic-ui-react';
import ModalPublication from '../../Modal/ModalPublication/ModalPublication';
import './PreviewPublication.css';

const PreviewPublication = ({ publication }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className='preview-publication' onClick={() => setShowModal(true)}>
        <Image src={publication.url} />
      </div>
      <ModalPublication
        show={showModal}
        setShow={setShowModal}
        publication={publication}
      />
    </>
  );
};

export default PreviewPublication;
