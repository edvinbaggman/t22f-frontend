import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../../formik/CustomInput';
import CustomSelectInput from '../../../formik/CustomSelectInput';

interface AddPlayerModalViewProps {
  handleSubmit: (values: { [field: string]: any }) => void;
}

export default function AddPlayerModalView({
  handleSubmit,
}: AddPlayerModalViewProps) {
  const initialTournamentValues = {
    name: '',
    sex: 'man',
  };

  const errorText2 = 'Field is required';

  const formValidation = Yup.object({
    name: Yup.string().required(errorText2),
    sex: Yup.string().required(errorText2),
  });

  const options = [
    { label: 'Man', value: 'man' },
    { label: 'Woman', value: 'woman' },
  ];

  return (
    <div>
      <Formik
        initialValues={initialTournamentValues}
        validationSchema={formValidation}
        onSubmit={async (values, actions) => {
          await handleSubmit(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='grid gap-x-2 gap-y-2 grid-cols-2'>
              <div
                className={`flex-initial items-center justify-center rounded-lg py-4 px-4 h-14"`}
              >
                {'Name'}
              </div>
              <CustomInput type='string' label='' name='name' />
              <div
                className={`flex-initial items-center justify-center rounded-lg py-4 px-4 h-14"`}
              >
                {'Sex'}
              </div>
              <CustomSelectInput
                type='text'
                label='Sex'
                name='sex'
                options={options}
              />
              <div></div>
            </div>
            <div className='flex justify-center'>
              <button
                disabled={isSubmitting}
                type='submit'
                className='w-full btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'
              >
                {isSubmitting ? 'Loading' : 'Add Player'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
