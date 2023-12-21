import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { IPlayers, ITournamentRound, ITournamentRounds } from '../../../types';
import { isRoundFinished } from '../../../utils/isRoundFinished';
import GamesView from './GamesView';
import { TournamentContext } from '../../../contexts/TournamentProvider';
import { AuthContext } from '../../../contexts/AuthProvider';

interface GamesControllerProps {
  title: string;
  icon: ReactNode | string;
  rounds: ITournamentRounds;
  numberOfRounds: number;
  tournamentId: string;
  players: IPlayers;
  isAdmin: boolean;
}

export default function GamesController({
  title,
  icon,
  rounds,
  numberOfRounds,
  tournamentId,
  players,
  isAdmin,
}: GamesControllerProps) {
  const roundInPlay: number = Object.keys(rounds).length - 1;
  const [selectedRound, setSelectedRound] = useState<number>(roundInPlay);
  const [error, setError] = useState<string>('');
  const [generatingRound, setGeneratingRound] = useState<boolean>(false);
  const tournamentContext = useContext(TournamentContext);

  useEffect(() => {
    // This hook selects the last round on mount and whenever a new round is generated
    setSelectedRound(roundInPlay);
  }, [Object.keys(rounds).length]);

  // Sort the matches after their id's
  const round = useMemo(() => {
    try {
      const matches = rounds[selectedRound] || undefined;
      return Object.keys(matches)
        .sort()
        .reduce((acc: ITournamentRound, key: string) => {
          acc[key] = matches[key];
          return acc;
        }, {});
    } catch {
      return;
    }
  }, [selectedRound, rounds]);

  const roundInPlayFinished: boolean = isRoundFinished(roundInPlay, rounds);

  const handleClickRound = (round: number) => {
    if (round <= roundInPlay) {
      setSelectedRound(round);
    }
  };

  const handleButtonClick = async () => {
    setError('');
    const isLastRound = roundInPlay + 1 === numberOfRounds;
    setGeneratingRound(true);
    let res;
    if (isLastRound) {
      res = await tournamentContext.saveTournament!();
    } else {
      res = await tournamentContext.startNewRound!();
    }
    if (res.message === 'Not enough players') {
      setError(
        'You need at least 4 players to generate a round! Go to "Players" and add more'
      );
    }

    setGeneratingRound(false);
  };

  return (
    <GamesView
      tournamentId={tournamentId}
      round={round}
      roundInPlay={roundInPlay}
      roundInPlayFinished={roundInPlayFinished}
      numberOfRounds={numberOfRounds}
      selectedRound={selectedRound}
      setSelectedRound={handleClickRound}
      players={players}
      isAdmin={isAdmin}
      handleButtonClick={handleButtonClick}
      generatingRound={generatingRound}
      error={error}
    />
  );
}
