import { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../gql/user';
import { setToken, decodeToken } from '../../utils/token';
import useAuth from '../../hooks/useAuth';
import './LoginForm.css';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [login] = useMutation(LOGIN);
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('The email is not valid')
        .required('The email is required'),
      password: Yup.string().required('The password is required'),
    }),
    onSubmit: async formData => {
      setError('');
      try {
        const { data } = await login({
          variables: {
            input: formData,
          },
        });
        const { token } = data.login;
        setToken(token);
        setUser(decodeToken(token));
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    },
  });

  return (
    <Form className='login-form' onSubmit={formik.handleSubmit}>
      <h2>Entra para ver fotos y videos de tus amigos</h2>
      <Form.Input
        type='text'
        placeholder='Email'
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email && true}
      />
      <Form.Input
        type='password'
        placeholder='Password'
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password && true}
      />
      <Button
        type='submit'
        className='btn-submit'
        disabled={!formik.isValid || formik.isSubmitting}
      >
        Log in
      </Button>
      {error && <p className='submit-error'>{error}</p>}
    </Form>
  );
};

export default LoginForm;

const initialValues = {
  email: '',
  password: '',
};
