import { Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './EmailForm.css';

const EmailForm = ({ setShowModal, currentEmail, refetch }) => {
  const [updateUser, { loading }] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      email: currentEmail || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required(),
    }),
    onSubmit: async formData => {
      try {
        await updateUser({
          variables: {
            input: formData,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error('Error al actualizar el email');
      }
    },
  });

  return (
    <Form className='email-form' onSubmit={formik.handleSubmit}>
      <Form.Input
        name='email'
        placeholder='Email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email && true}
      />
      <Button type='submit' className='btn-submit' disabled={loading}>
        Actualizar
      </Button>
    </Form>
  );
};

export default EmailForm;
