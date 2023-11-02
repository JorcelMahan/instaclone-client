import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import useAuth from '../../../hooks/useAuth';
import PasswordForm from '../PasswordForm/PasswordForm';
import EmailForm from '../EmailForm/EmailForm';
import DescriptionForm from '../DescriptionForm/DescriptionForm';
import WebsiteForm from '../WebsiteForm/WebsiteForm';
import './SettingsForm.css';

const SettingsForm = ({
  setShowModal,
  setTitleModal,
  setChildrenModal,
  getUser,
  refetch,
}) => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const { logout } = useAuth();

  const onChangePassword = () => {
    setTitleModal('Cambiar contraseña');
    setChildrenModal(<PasswordForm logout={logout} />);
  };

  const onChangeEmail = () => {
    setTitleModal('Cambiar email');
    setChildrenModal(
      <EmailForm
        setShowModal={setShowModal}
        currentEmail={getUser.email}
        refetch={refetch}
      />
    );
  };

  const onChangeDescription = () => {
    setTitleModal('Actualizar descripción');
    setChildrenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        currentDescription={getUser.description}
        refetch={refetch}
      />
    );
  };

  const onChangeWebsite = () => {
    setTitleModal('Actualizar website');
    setChildrenModal(
      <WebsiteForm
        setShowModal={setShowModal}
        currentWebsite={getUser.website}
        refetch={refetch}
      />
    );
  };

  const onLogout = () => {
    client.clearStore();
    logout();
    navigate.push('/');
  };

  return (
    <div className='settings-form'>
      <Button onClick={onChangePassword}>Cambiar contraseña</Button>
      <Button onClick={onChangeEmail}>Cambiar email</Button>
      <Button onClick={onChangeDescription}>Actualizar descripción</Button>
      <Button onClick={onChangeWebsite}>Actualizar website</Button>
      <Button onClick={onLogout}>Cerrar sesión</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
};

export default SettingsForm;
