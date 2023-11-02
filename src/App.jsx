import { useState, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import Navigation from './routes/Navigation';
import { ToastContainer } from 'react-toastify';
import { getToken, decodeToken, removeToken } from './utils/token';
import Auth from './pages/Auth/Auth';
import AuthContext from './context/AuthContext';

function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = user => {
    setAuth(user);
  };

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation />}

        <ToastContainer
          position='top-right'
          autoClose={5000}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
