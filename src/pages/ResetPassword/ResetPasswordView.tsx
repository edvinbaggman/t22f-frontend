'use client';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import CustomInput from '../../components/formik/CustomInput';

interface PasswordViewProps {
  handleRequest: (values: { [field: string]: any }) => Promise<void>;
  message: string;
}

export default function ResetPasswordView({
  handleRequest,
  message,
}: PasswordViewProps) {
  const initialTournamentValues = {
    email: '',
  };
  const errorText = 'Field is required';

  const formValidation = Yup.object({
    email: Yup.string().required(errorText),
  });
  return (
    <>
      <div className='isolate bg-grey px-6 py-20 sm:py-32 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Request new password
          </h2>
        </div>
        <div className='mx-auto mt-16 max-w-md sm:mt-20'>
          <Formik
            initialValues={initialTournamentValues}
            validationSchema={formValidation}
            onSubmit={async (values, actions) => {
              await handleRequest(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                  <div className='sm:col-span-2'>
                    <CustomInput
                      name='email'
                      label='Email'
                      type='text'
                    ></CustomInput>
                  </div>

                  <div className='sm:col-span-2'>
                    <button
                      disabled={isSubmitting}
                      type='submit'
                      className='w-full btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'
                    >
                      {isSubmitting ? 'Loading' : 'Send request'}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className='sm:col-span-2 mt-3'>
            {message && <p className='text-xs'>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
