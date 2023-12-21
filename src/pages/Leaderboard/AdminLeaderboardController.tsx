import { useContext, useEffect, useState } from 'react';
import { ILeaderboardPlayer } from '../../types';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { getAllPlayersUnderAdmin } from '../../utils/requestUtils';
import AdminLeaderBoardView from './AdminLeaderboardView';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function AdminLeaderBoardController() {
  const [players, setPlayers] = useState<ILeaderboardPlayer[] | null | 'init'>(
    'init'
  );
  const authContext = useContext(AuthContext);
  const { userEmail, jwt } = authContext;
  const navigate = useNavigate();

  const getPlayers = async () => {
    const players = await getAllPlayersUnderAdmin(userEmail!, jwt!);
    setPlayers(players);
  };

  // Re-route visitor if it's not logged in. Otherwise, fetch the players
  useEffect(() => {
    if (!userEmail || !jwt) {
      navigate('/');
    } else {
      getPlayers();
    }
  }, [userEmail]);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  if (players === 'init') return <LoadingSpinner />;
  if (!players || players.length === 0) return <>Nothing to see here</>;

  return (
    <AdminLeaderBoardView players={players} handleBackClick={handleBackClick} />
  );
}
