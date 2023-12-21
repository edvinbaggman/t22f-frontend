import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import CustomInput from '../../components/formik/CustomInput';
import CustomDatePicker from '../../components/formik/CustomDatePicker';
import CustomTimePicker from '../../components/formik/CustomTimePicker';
import CustomInputArea from '../../components/formik/CustomInputArea';
import CustomFileUpload from '../../components/formik/CustomFileUpload';
import CustomRadioButton from '../../components/formik/CustomCheckbox';

interface CreateTournamentViewProps {
  onSubmit: (values: { [field: string]: any }) => Promise<void>;
}

export default function CreateTournamentView({
  onSubmit,
}: CreateTournamentViewProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const initialTournamentValues = {
    name: '',
    location: '',
    numberOfRounds: 10,
    maxSimultaneousGames: 10,
    date: today,
    startingTime: '',
    description: '',
    image: null,
    prioRest: '0',
    prioType: '0',
  };
  const errorText = 'Field is required';

  const formValidation = Yup.object({
    name: Yup.string().required(errorText),
    location: Yup.string().required(errorText),
    numberOfRounds: Yup.number().min(1, 'Really?').required(errorText),
    maxSimultaneousGames: Yup.number().min(1, 'Really?').required(errorText),
    date: Yup.date().min(today, 'Time traveler?').required(errorText),
    startingTime: Yup.string().required(errorText),
  });
  return (
    <div className='isolate px-6 py-20 sm:py-32 lg:px-8'>
      <div className='mx-auto max-w-2xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Create Tournament
        </h2>
      </div>
      <div className='mx-auto mt-16 max-w-xl sm:mt-20'>
        <Formik
          initialValues={initialTournamentValues}
          validationSchema={formValidation}
          onSubmit={async (values, actions) => {
            await onSubmit(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                <div className='sm:col-span-2'>
                  <CustomInput
                    name='name'
                    label='Name of the tournament'
                    type='text'
                  ></CustomInput>
                </div>
                <div className='sm:col-span-2'>
                  <CustomInput
                    name='location'
                    label='Location'
                    type='text'
                  ></CustomInput>
                </div>

                <CustomDatePicker name='date' label='Date' />
                <CustomTimePicker name='startingTime' label='Time' />

                <div className='sm:col-span-2'>
                  <CustomInputArea
                    name='description'
                    label='Description'
                  ></CustomInputArea>
                  <CustomFileUpload
                    name='image'
                    label='Do you want to upload an image?'
                  />
                </div>
                <CustomInput
                  name='numberOfRounds'
                  label='How many rounds?'
                  type='number'
                ></CustomInput>
                <CustomInput
                  name='maxSimultaneousGames'
                  label='Max simultaneous games?'
                  type='number'
                ></CustomInput>
                <div>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    What type of matches?
                  </label>
                  <CustomRadioButton
                    name='prioType'
                    value='0'
                    label='Men / Women'
                  />
                  <CustomRadioButton name='prioType' value='1' label='Mixed' />
                  <CustomRadioButton name='prioType' value='2' label='Random' />
                </div>
                <div>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    What do you want to prioritize?
                  </label>
                  <CustomRadioButton
                    name='prioRest'
                    value='0'
                    label='Number of games'
                  />
                  <CustomRadioButton
                    name='prioRest'
                    value='1'
                    label='Fair games'
                  />
                </div>

                <div className='sm:col-span-2'>
                  <button
                    disabled={isSubmitting}
                    type='submit'
                    className='w-full btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'
                  >
                    {isSubmitting ? 'Please wait' : 'Create tournament'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
