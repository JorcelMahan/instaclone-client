import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';
import './WebsiteForm.css';

const WebsiteForm = ({ setShowModal, currentWebsite, refetch }) => {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      website: currentWebsite || '',
    },
    validationSchema: Yup.object({
      website: Yup.string().required(),
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
        toast.error('Error al actualizar el website');
      }
    },
  });

  return (
    <Form className='website-form' onSubmit={formik.handleSubmit}>
      <Form.Input
        name='website'
        placeholder='Website'
        value={formik.values.website}
        onChange={formik.handleChange}
        error={formik.errors.website}
      />
      <Button type='submit' className='btn-submit'>
        Actualizar
      </Button>
    </Form>
  );
};

export default WebsiteForm;
