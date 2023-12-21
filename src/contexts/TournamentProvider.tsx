import React, { useContext, useState } from 'react';
import {
  IEditTournament,
  IPlayer,
  ITournament,
  IUpdateGameResults,
} from '../types';
import {
  deleteTournament,
  editTournament,
  generateNewRound,
  getTournament,
  saveTournamentStats,
  updateGameResults,
} from '../utils/requestUtils';
import { getTournamentStatus } from '../utils/getTournamentStatus';
import { AuthContext } from './AuthProvider';

type ContextProps = {
  tournament: any; //todo
  loading: boolean;
  setNewTournament: (id: string) => Promise<void>;
  setGameResult: (game: IUpdateGameResults) => void;
  startNewRound: () => Promise<any>;
  setNewSettings: (settings: IEditTournament) => void;
  removeTournament: () => Promise<void>;
  saveTournament: () => Promise<void>;
  tournamentStatus: string;
};

function ConvertPlayersArrayToDict(players: IPlayer[]) {
  const playersDict: any = {};
  players.forEach((player) => {
    playersDict[player.id] = player.name;
  });
  return playersDict;
}

export const TournamentContext = React.createContext<Partial<ContextProps>>({});

export const TournamentProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tournament, setTournamnet] = useState<ITournament | null>(null);
  const authContext = useContext(AuthContext);
  const { jwt } = authContext;

  const setNewTournament = async (id: string) => {
    setTournamnet(null);
    console.log('getting data');
    const tournament = await getTournament(id);
    tournament.players = ConvertPlayersArrayToDict(tournament.players);
    setTournamnet(tournament);
    setLoading(false);
  };

  const setGameResult = (game: IUpdateGameResults) => {
    if (!tournament || !jwt) {
      return;
    }
    updateGameResults(
      tournament.id,
      game.round,
      game.match,
      game.team1Points,
      game.team2Points,
      jwt
    );
    const updatedTorunament = { ...tournament };
    updatedTorunament.rounds[game.round][game.match].team1.points =
      game.team1Points;
    updatedTorunament.rounds[game.round][game.match].team2.points =
      game.team2Points;
    setTournamnet(updatedTorunament);
  };

  const startNewRound = async () => {
    if (!tournament || !jwt) {
      return;
    }
    const res = await generateNewRound(tournament.id, jwt);

    if (!res.message) {
      const roundNumber = Object.keys(tournament.rounds).length;
      tournament.rounds[roundNumber] = res;
    }

    return res;
  };

  const setNewSettings = (settings: IEditTournament) => {
    if (!tournament || !jwt) {
      return;
    }
    editTournament(
      tournament.id,
      {
        name: settings.name,
        date: settings.date,
        startingTime: settings.startingTime,
        description: settings.description,
        numberOfRounds: settings.numberOfRounds,
        location: settings.location,
        settings: settings.settings,
      },
      jwt
    );
    setTournamnet({ ...tournament, ...settings });
  };

  const removeTournament = async () => {
    if (!tournament || !jwt) {
      return;
    }
    if (window.confirm('Are you sure you want to delete this tournament?')) {
      await deleteTournament(tournament.id, jwt!);
      return;
    }
  };

  const saveTournament = async () => {
    if (!tournament || !jwt) {
      return;
    }
    await saveTournamentStats(tournament.id, jwt);
  };

  const tournamentStatus = getTournamentStatus(tournament);

  const value = {
    tournament,
    loading,
    setNewTournament,
    tournamentStatus,
    setGameResult,
    startNewRound,
    setNewSettings,
    removeTournament,
    saveTournament,
  };
  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
