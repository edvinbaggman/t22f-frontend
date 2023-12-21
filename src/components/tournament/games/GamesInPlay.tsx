import { IPlayers, ITournamentRound } from '../../../types';
import GameController from './GameComponent/GameController';

export default function GamesInPlay({
  round,
  selectedRound,
  tournamentId,
  players,
  isAdmin,
}: {
  round: ITournamentRound | undefined;
  selectedRound: number;
  tournamentId: string;
  players: IPlayers;
  isAdmin: boolean;
}) {
  if (!round) return <></>;

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='w-full flex gap-2 items-center pb-5'>
        <p className='font-semibold text-sm'>
          Games of round {selectedRound + 1}
        </p>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4 lg:gap-8'>
        {Object.keys(round).map((gameKey: string, index: number) => {
          const team1 = round[gameKey].team1;
          const team1_names = [
            players[team1.players[0]],
            players[team1.players[1]],
          ];
          const team2 = round[gameKey].team2;
          const team2_names = [
            players[team2.players[0]],
            players[team2.players[1]],
          ];
          return (
            <GameController
              key={gameKey}
              gameKey={gameKey}
              tournamentId={tournamentId}
              selectedRound={selectedRound}
              team1={team1_names}
              team1Score={team1.points}
              team2={team2_names}
              team2Score={team2.points}
              isAdmin={isAdmin}
            />
          );
        })}
      </div>
    </div>
  );
}
