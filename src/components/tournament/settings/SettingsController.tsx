import { useNavigate } from 'react-router-dom';
import { IEditTournament, ITournament } from '../../../types';
import { deleteTournament } from '../../../utils/requestUtils';
import SettingsView from './SettingsView';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useContext } from 'react';
import { TournamentContext } from '../../../contexts/TournamentProvider';

interface SettingsControllerProps {
  title: string;
  icon: React.ReactNode;
  tournament: ITournament;
}

export default function SettingsController({
  title,
  icon,
  tournament,
}: SettingsControllerProps) {
  const navigate = useNavigate();
  const tournamentContext = useContext(TournamentContext);

  const handleSumbit = async (values: { [field: string]: any }) => {
    const newSettings: IEditTournament = {
      name: values.name,
      date: values.date.toJSON(),
      startingTime: values.startingTime,
      description: values.description,
      location: values.location,
      numberOfRounds: values.numberOfRounds,
      settings: {
        prioRest: values.prioRest,
        prioType: values.prioType,
        maxSimultaneousGames: values.maxSimultaneousGames,
      },
    };

    tournamentContext.setNewSettings!(newSettings);
  };

  const handleDelete = async () => {
    await tournamentContext.removeTournament!();
    navigate('/dashboard');
  };

  return (
    <>
      <SettingsView
        onSubmit={handleSumbit}
        onDelete={handleDelete}
        tournament={tournament}
      />
    </>
  );
}
