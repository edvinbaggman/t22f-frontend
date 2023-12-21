import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import TournamentView from './TournamentView';
import { TournamentLoader } from '../../components/tournament/TournamentLoader';
import { TournamentContext } from '../../contexts/TournamentProvider';

export default function TournamentController() {
  const navigate = useNavigate();
  const params = useParams();
  const authContext = useContext(AuthContext);
  const tournamentContext = useContext(TournamentContext);
  const { userEmail } = authContext;
  const { tournament, setNewTournament, loading, tournamentStatus } =
    tournamentContext;

  useEffect(() => {
    if (!tournament || tournament.id != params.id) {
      setNewTournament!(params.id!);
    }
  }, []);

  if (loading || !tournament) {
    return <TournamentLoader />;
  }

  const isAdmin = userEmail === tournament?.owner;

  function handleGoBack() {
    isAdmin ? navigate('/dashboard') : navigate('/');
  }

  return (
    <TournamentView
      tournament={tournament}
      tournamentStatus={tournamentStatus!}
      isAdmin={isAdmin}
      handleBackClick={handleGoBack}
    />
  );
}
