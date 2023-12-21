'use client';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { ITournament } from '../../../types';
import CustomInput from '../../formik/CustomInput';
import CustomDatePicker from '../../formik/CustomDatePicker';
import CustomInputArea from '../../formik/CustomInputArea';
import CustomTimePicker from '../../formik/CustomTimePicker';
import CustomRadioButton from '../../formik/CustomCheckbox';

interface SettingsViewProps {
  onSubmit: (values: { [field: string]: any }) => Promise<void>;
  onDelete: () => Promise<void>;
  tournament: ITournament;
}

export default function SettingsView({
  onSubmit,
  onDelete,
  tournament,
}: SettingsViewProps) {
  const tournamentDate = new Date(tournament.date);
  const initialTournamentValues = {
    id: tournament.id,
    name: tournament.name,
    location: tournament.location,
    numberOfRounds: tournament.numberOfRounds,
    maxSimultaneousGames: tournament.settings.maxSimultaneousGames,
    date: tournamentDate,
    startingTime: tournament.startingTime,
    description: tournament.description,
    prioRest: tournament.settings.prioRest,
    prioType: tournament.settings.prioType,
  };

  const errorText = 'Field is required';

  const formValidation = Yup.object({
    name: Yup.string().required(errorText),
    location: Yup.string().required(errorText),
    numberOfRounds: Yup.number().min(1, 'Really?').required(errorText),
    maxSimultaneousGames: Yup.number().min(1, 'Really?').required(errorText),
    startingTime: Yup.string().required(errorText),
  });
  return (
    <div className='mx-auto max-w-xl bg-white px-6 py-6'>
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

              <CustomDatePicker
                name='date'
                label='Date'
                defaultDate={tournamentDate}
              />
              <CustomTimePicker name='startingTime' label='Time' />

              <div className='sm:col-span-2'>
                <CustomInputArea
                  name='description'
                  label='Description'
                ></CustomInputArea>
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

              <div className='sm:col-span-2 pb-6 flex flex-col items-center space-y-2'>
                <button
                  disabled={isSubmitting}
                  type='submit'
                  className='w-full btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'
                >
                  {isSubmitting ? 'Please wait' : 'Save changes'}
                </button>

                <button
                  onClick={async () => await onDelete()}
                  className='w-full btn transition hover:bg-red-300 bg-red-200 rounded-lg'
                >
                  Delete Tournament
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
