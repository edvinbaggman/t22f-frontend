import { ITournament } from '../types';

export function getTournamentStatus(tournament: ITournament | null) {
  if (!tournament) return 'upcoming';

  const roundValues = Object.values(tournament.rounds);
  if (roundValues.length === tournament.numberOfRounds) {
    const lastRound = roundValues[roundValues.length - 1];
    return Object.values(lastRound).every(
      (game) => game.team1.points !== '' && game.team2.points !== ''
    )
      ? 'finished'
      : 'inPlay';
  } else if (roundValues.length > 0) {
    return 'inPlay';
  }
  return 'upcoming';
}
