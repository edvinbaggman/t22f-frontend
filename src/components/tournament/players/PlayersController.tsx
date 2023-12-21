import { ICreatePlayer, ITournament } from '../../../types';
import { useState, useEffect, useContext } from 'react';
import {
  addPlayer,
  creatPlayer,
  getPlayersNotInTournament,
  getTournamentPlayers,
  removePlayer,
} from '../../../utils/requestUtils';
import { modals } from '@mantine/modals';
import PlayersView from './PlayersView';
import { AuthContext } from '../../../contexts/AuthProvider';

interface PlayersControllerProps {
  title: string;
  icon: React.ReactNode;
  tournament: ITournament;
}

interface Player {
  id: string;
  name: string;
}

export default function PlayersController(props: PlayersControllerProps) {
  const { title, icon, tournament } = props;
  const [tournamentPlayers, setTournamentPlayers] = useState<Player[]>([]);
  const [userPlayers, setUserPlayers] = useState<Player[]>([]);
  const [previousState, setPreviousState] = useState<{
    tournamentPlayers: Player[];
    userPlayers: Player[];
  } | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const authContext = useContext(AuthContext);
  const { jwt } = authContext;

  useEffect(() => {
    async function fetchData() {
      if (tournament && !tournamentPlayers.length && !userPlayers.length) {
        const inactivePlayers = tournament.playersInactive
          ? tournament.playersInactive
          : [];

        const tp = Object.entries(tournament.players)
          .filter(([id]) => !inactivePlayers.includes(id))
          .map(([id, name]) => ({ id, name }));

        //const tp = await getTournamentPlayers(tournament.id, jwt!);
        console.log(tp);

        const up = await getPlayersNotInTournament(tournament.id, jwt!);
        console.log(up);

        setTournamentPlayers(tp);
        if (up?.statusCode) {
          setUserPlayers([]);
        } else {
          setUserPlayers(up);
        }
      }
    }
    fetchData();
  }, []);

  const handleDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    setPreviousState({ tournamentPlayers, userPlayers });

    if (
      source.droppableId === 'tournament' &&
      destination.droppableId === 'user'
    ) {
      const updatedTournamentPlayers = [...tournamentPlayers];
      const [movedPlayer] = updatedTournamentPlayers.splice(source.index, 1);

      const updatedUserPlayers = [...userPlayers, movedPlayer];
      setTournamentPlayers(updatedTournamentPlayers);
      setUserPlayers(updatedUserPlayers);

      try {
        if (tournament) await removePlayer(tournament.id, movedPlayer.id, jwt!);
      } catch (error) {
        console.error('Erreur lors de la suppression du joueur:', error);
        if (previousState) {
          setTournamentPlayers(previousState.tournamentPlayers);
          setUserPlayers(previousState.userPlayers);
        }
      }
    } else if (
      source.droppableId === 'user' &&
      destination.droppableId === 'tournament'
    ) {
      const filteredPlayers = userPlayers.filter((player) =>
        player.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      const updatedUserPlayers = [...userPlayers];
      const movedPlayer = filteredPlayers[source.index];
      const indexInOriginalArray = userPlayers.findIndex(
        (p) => p.id === movedPlayer.id
      );
      updatedUserPlayers.splice(indexInOriginalArray, 1);

      const updatedTournamentPlayers = [...tournamentPlayers, movedPlayer];
      setTournamentPlayers(updatedTournamentPlayers);
      setUserPlayers(updatedUserPlayers);

      try {
        if (tournament) await addPlayer(tournament.id, movedPlayer.id, jwt!);
      } catch (error) {
        console.error("Erreur lors de l'ajout du joueur:", error);
        if (previousState) {
          setTournamentPlayers(previousState.tournamentPlayers);
          setUserPlayers(previousState.userPlayers);
        }
      }
    }
  };

  const createPlayer = async (player: ICreatePlayer) => {
    await creatPlayer(tournament.id, player, jwt!);
    const updatedPlayers = await getTournamentPlayers(tournament.id, jwt!);
    setTournamentPlayers(updatedPlayers);
  };

  const openModal = () => {
    modals.openContextModal({
      modal: 'AddPlayerModal',
      centered: true,
      title: 'Add Player',
      innerProps: {
        addPlayer: createPlayer,
      },
    });
  };

  return (
    <PlayersView
      handleDragEnd={handleDragEnd}
      tournamentPlayers={tournamentPlayers}
      userPlayers={userPlayers}
      openModal={openModal}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />
  );
}
