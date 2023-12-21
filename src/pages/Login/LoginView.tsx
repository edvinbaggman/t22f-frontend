'use client';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import CustomInput from '../../components/formik/CustomInput';

interface LoginViewProps {
  handleLogin: (values: { [field: string]: any }) => Promise<void>;
  error: string;
}

export default function LoginView({ handleLogin, error }: LoginViewProps) {
  const initialTournamentValues = {
    username: '',
    password: '',
  };
  const errorText = 'Field is required';

  const formValidation = Yup.object({
    username: Yup.string().required(errorText),
    password: Yup.string().required(errorText),
  });
  return (
    <div className='isolate bg-grey px-6 sm:py-32 lg:px-8'>
      <div className='mx-auto max-w-2xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Login
        </h2>
      </div>
      <div className='mx-auto mt-16 max-w-md sm:mt-20'>
        <Formik
          initialValues={initialTournamentValues}
          validationSchema={formValidation}
          onSubmit={async (values, actions) => {
            await handleLogin(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                <div className='sm:col-span-2'>
                  <CustomInput
                    name='username'
                    label='Username'
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
                  <button
                    disabled={isSubmitting}
                    type='submit'
                    className='w-full btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'
                  >
                    {isSubmitting ? 'Loading' : 'Login'}
                  </button>

                  <div className='flex justify-between text-xs underline mt-2'>
                    <Link to={'/register'}>Dont have an account?</Link>
                    <Link to={'/resetPassword'}>Forgot Password?</Link>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className='sm:col-span-2 mt-3'>
          {error && <p className='text-error text-xs'>{error}</p>}
        </div>
      </div>
    </div>
  );
}
