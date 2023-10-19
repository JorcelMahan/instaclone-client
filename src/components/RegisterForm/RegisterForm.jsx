import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../gql/user';
import './RegisterForm.css';

const RegisterForm = props => {
  const { setShowLogin } = props;

  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Your name is required'),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          'The username can only contain letters, numbers and hyphens'
        )
        .required('The username is required'),
      email: Yup.string()
        .email('The email is not valid')
        .required('The email is required'),
      password: Yup.string()
        .required('The password is required')
        .oneOf([Yup.ref('confirmPassword')], 'Passwords do not match'),
      confirmPassword: Yup.string()
        .required('The password is required')
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
    }),
    onSubmit: async formData => {
      try {
        const newUser = formData;
        delete newUser.confirmPassword;

        await register({
          variables: {
            input: newUser,
          },
        });

        toast.success('User registered successfully');
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    },
  });

  return (
    <>
      <h2 className='register-form-title'>
        Sign up to see photos and videos from your friends.
      </h2>
      <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Input
          type='text'
          placeholder='Name'
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name && true}
        />
        <Form.Input
          type='text'
          placeholder='Username'
          name='username'
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username && true}
        />
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
        <Form.Input
          type='password'
          placeholder='Confirm password'
          name='confirmPassword'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.errors.confirmPassword && true}
        />
        <Button type='submit' className='btn-submit'>
          Sign up
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;

const initialValues = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
