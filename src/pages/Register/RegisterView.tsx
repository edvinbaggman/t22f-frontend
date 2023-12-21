'use client';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import CustomInput from '../../components/formik/CustomInput';

interface RegisterViewProps {
  handleCreate: (values: { [field: string]: any }) => Promise<void>;
  error: string;
}

export default function RegisterView({
  handleCreate,
  error,
}: RegisterViewProps) {
  const initialTournamentValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    key: '',
  };
  const errorText = 'Field is required';

  const formValidation = Yup.object({
    firstName: Yup.string().required(errorText),
    lastName: Yup.string().required(errorText),
    email: Yup.string().required(errorText),
    password: Yup.string().required(errorText),
    key: Yup.string().required(errorText),
  });
  return (
    <>
      <div className='isolate bg-grey px-6 py-20 sm:py-32 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Create new account
          </h2>
        </div>
        <div className='mx-auto mt-16 max-w-md sm:mt-20'>
          <Formik
            initialValues={initialTournamentValues}
            validationSchema={formValidation}
            onSubmit={async (values, actions) => {
              await handleCreate(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                  <div className='sm:col-span-2'>
                    <CustomInput
                      name='firstName'
                      label='First name'
                      type='text'
                    ></CustomInput>
                  </div>
                  <div className='sm:col-span-2'>
                    <CustomInput
                      name='lastName'
                      label='Last name'
                      type='text'
                    ></CustomInput>
                  </div>
                  <div className='sm:col-span-2'>
                    <CustomInput
                      name='email'
                      label='Email'
                      type='text'
                    ></CustomInput>
                  </div>
                  <div className='sm:col-span-2'>
                    <CustomInput
                      name='password'
                      label='Password'
                      type='password'
                    ></CustomInput>
                  </div>

                  <div className='sm:col-span-2'>
                    <CustomInput
                      name='key'
                      label='Secret key'
                      type='text'
                    ></CustomInput>
                  </div>

                  <div className='sm:col-span-2'>
                    <button
                      disabled={isSubmitting}
                      type='submit'
                      className='w-full btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'
                    >
                      {isSubmitting ? 'Loading' : 'Create account'}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className='sm:col-span-2 mt-3'>
            {error && (
              <p className='text-error text-xs'>
                <div dangerouslySetInnerHTML={{ __html: error }} />
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
