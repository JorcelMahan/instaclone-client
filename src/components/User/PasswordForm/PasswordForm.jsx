import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';
import './PasswordForm.css';

const PasswordForm = ({ logout }) => {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('repeatNewPassword')]),
    }),
    onSubmit: async formData => {
      try {
        const result = await updateUser({
          variables: {
            input: {
              currentPassword: formData.currentPassword,
              newPassword: formData.newPassword,
            },
          },
        });
        if (!result.data.updateUser) {
          toast.error('Error al cambiar la contraseña');
        } else {
          toast.success('Contraseña actualizada');
          logout();
        }
      } catch (error) {
        toast.error('Error al cambiar la contraseña');
      }
    },
  });

  return (
    <Form className='password-form' onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder='Contraseña actual'
        name='currentPassword'
        type='password'
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        error={formik.errors.currentPassword}
      />
      <Form.Input
        placeholder='Nueva contraseña'
        name='newPassword'
        type='password'
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.errors.newPassword}
      />
      <Form.Input
        placeholder='Repetir nueva contraseña'
        name='repeatNewPassword'
        type='password'
        value={formik.values.repeatNewPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatNewPassword}
      />
      <Button type='submit' className='btn-submit'>
        Actualizar
      </Button>
    </Form>
  );
};

export default PasswordForm;
