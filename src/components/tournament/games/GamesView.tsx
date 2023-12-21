import { IPlayers, ITournamentRound } from '../../../types';
import TournamentNotStarted from '../TournamentNotStarted';
import GamesInPlay from './GamesInPlay';
import RoundsStepperController from './RoundsStepperComponent/RoundsStepperController';

interface TournamentGamesProps {
  roundInPlay: number;
  roundInPlayFinished: boolean;
  numberOfRounds: number;
  selectedRound: number;
  setSelectedRound: (round: number) => void;
  round: ITournamentRound | undefined;
  tournamentId: string;
  players: IPlayers;
  isAdmin: boolean;
  handleButtonClick: () => void;
  generatingRound: boolean;
  error: string;
}

export default function GamesView({
  tournamentId,
  round,
  roundInPlay,
  roundInPlayFinished,
  numberOfRounds,
  selectedRound,
  setSelectedRound,
  players,
  isAdmin,
  handleButtonClick,
  generatingRound,
  error,
}: TournamentGamesProps) {
  if (roundInPlay < 0 && !isAdmin) return <TournamentNotStarted />;
  const isLastRound = roundInPlay + 1 === numberOfRounds;
  const buttonText = isLastRound
    ? 'Finish tournament'
    : generatingRound
    ? 'Please wait...'
    : !round
    ? 'Start tournament'
    : 'Generate new round';

  return (
    <div className='p-2'>
      <RoundsStepperController
        roundInPlay={roundInPlay}
        roundInPlayFinished={roundInPlayFinished}
        numberOfRounds={numberOfRounds}
        selectedRound={selectedRound}
        setSelectedRound={setSelectedRound}
      />
      <GamesInPlay
        round={round}
        selectedRound={selectedRound}
        tournamentId={tournamentId}
        players={players}
        isAdmin={isAdmin}
      />

      {isAdmin && (
        <div className='pt-5 flex items-end justify-end'>
          <button
            className='btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'
            disabled={(round && !roundInPlayFinished) || generatingRound}
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </div>
      )}
      {error && (
        <p className='text-right text-red-500 text-xs italic mt-5'>{error}</p>
      )}
    </div>
  );
}
