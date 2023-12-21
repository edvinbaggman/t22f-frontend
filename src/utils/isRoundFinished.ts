import { ITournamentRounds } from '../types';
import { IGame } from '../types';

export const isRoundFinished = (
  roundInPlay: number,
  rounds: ITournamentRounds
): boolean => {
  let roundInPlayFinished = false;
  if (roundInPlay >= 0) {
    roundInPlayFinished = Object.values(rounds[roundInPlay]).every(
      (game: IGame) => {
        return game.team1.points !== '' && game.team2.points !== '';
      }
    );
  }
  return roundInPlayFinished;
};
