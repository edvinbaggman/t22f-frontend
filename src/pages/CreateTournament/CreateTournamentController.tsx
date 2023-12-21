import { ICreateTournament } from '../../types';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useContext } from 'react';
import { createTournament } from '../../utils/requestUtils';
import CreateTournamentView from './CreateTournamentView';

export default function CreateTournamentController() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { userEmail, jwt } = authContext;
  const handleSumbit = async (values: { [field: string]: any }) => {
    if (!userEmail || !jwt) {
      navigate('/login');
    } else {
      const newTournament: ICreateTournament = {
        name: values.name,
        date: values.date.toJSON(),
        startingTime: values.startingTime,
        description: values.description,
        location: values.location,
        numberOfRounds: values.numberOfRounds,
        owner: userEmail,
        settings: {
          prioRest: values.prioRest,
          prioType: values.prioType,
          maxSimultaneousGames: values.maxSimultaneousGames,
        },
      };

      const file = values.image;
      const tournament = await createTournament(newTournament, file, jwt);
      navigate(`/tournament/${tournament.id}`);
    }
  };

  return (
    <>
      <CreateTournamentView onSubmit={handleSumbit} />
    </>
  );
}
