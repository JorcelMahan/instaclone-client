import { useState } from 'react';
import { Container, Image } from 'semantic-ui-react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import instaclone from '../../assets/instaclone.png';
import './Auth.css';

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container fluid className='auth'>
      <Image src={instaclone} />
      <div className='container-form'>
        {showLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
      <div className='change-form'>
        <p>
          {showLogin ? (
            <>
              ¿No tienes cuenta?
              <span onClick={() => setShowLogin(!showLogin)}>Regístrate</span>
            </>
          ) : (
            <>
              ¡Entra y disfruta de la experiencia!
              <span onClick={() => setShowLogin(!showLogin)}>
                Inicia sesión
              </span>
            </>
          )}
        </p>
      </div>
    </Container>
  );
};

export default Auth;
