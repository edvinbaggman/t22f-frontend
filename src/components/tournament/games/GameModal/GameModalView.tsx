import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../../formik/CustomInput';

interface GameModalViewProps {
  team1: string[];
  score1: number;
  team2: string[];
  score2: number;
  handleSave: (values: { [field: string]: any }) => void;
}

export default function GameModalView({
  team1,
  score1,
  team2,
  score2,
  handleSave,
}: GameModalViewProps) {
  const initialTournamentValues = {
    score1: score1,
    score2: score2,
  };

  const errorText1 = 'You cant have negative points';
  const errorText2 = 'Field is required';

  const formValidation = Yup.object({
    score1: Yup.number().min(0, errorText1).required(errorText2),
    score2: Yup.number().min(0, errorText1).required(errorText2),
  });

  return (
    <div>
      <Formik
        initialValues={initialTournamentValues}
        validationSchema={formValidation}
        onSubmit={async (values, actions) => {
          await handleSave(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='gap-x-2 gap-y-2 grid grid-cols-3'>
              <div
                className={`flex-initial items-center justify-center rounded-lg px-4 h-14 truncate w-full col-span-2`}
              >
                {team1 &&
                  team1.map((name, idx) => (
                    <p key={`team_1_player${idx}`} className='truncate w-full'>
                      {name}
                    </p>
                  ))}
              </div>
              <CustomInput type='number' label='' name='score1'></CustomInput>

              <div className='flex-initial items-center justify-center rounded-lg px-4 h-14 truncate w-full col-span-2'>
                {team2 &&
                  team2.map((name, idx) => (
                    <p key={`team_2_player${idx}`} className='truncate w-full'>
                      {name}
                    </p>
                  ))}
              </div>
              <CustomInput type='number' label='' name='score2'></CustomInput>
            </div>
            <div className='flex justify-center'>
              <button
                disabled={isSubmitting}
                type='submit'
                className='w-full btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'
              >
                {isSubmitting ? 'Loading' : 'Save scores'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
