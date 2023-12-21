'use client';
import React, { ReactElement } from 'react';
import { ILeaderboardPlayer, ITournament } from '../../../types';
import { Card, IconButton } from '@material-tailwind/react';
import TournamentNotStarted from '../TournamentNotStarted';

interface LeaderBoardTableProps {
  title?: string | ReactElement;
  icon?: string | ReactElement;
  players?: ILeaderboardPlayer[] | null;
  tournament?: ITournament | null;
  mode: 'tournament' | 'admin';
}

const createLeaderboard = (tournament: ITournament): ILeaderboardPlayer[] => {
  const leaderboard: any = {};

  for (const playerId of Object.keys(tournament.players)) {
    const playerName = tournament.players[playerId];
    leaderboard[playerId] = {
      id: playerId,
      name: playerName,
      games: 0,
      won: 0,
      points: 0,
      lastMatches: [],
    };
  }

  for (const roundId of Object.keys(tournament.rounds)) {
    for (const matchId of Object.keys(tournament.rounds[roundId])) {
      const match = tournament.rounds[roundId][matchId];
      const team1player1 = match.team1.players[0];
      const team1player2 = match.team1.players[1];
      const team2player1 = match.team2.players[0];
      const team2player2 = match.team2.players[1];
      const pointsTeam1 = match.team1.points ? Number(match.team1.points) : 0;
      const pointsTeam2 = match.team2.points ? Number(match.team2.points) : 0;
      const pointDiffTeam1 = pointsTeam1 - pointsTeam2;
      const pointDiffTeam2 = pointsTeam2 - pointsTeam1;
      if (pointDiffTeam1 > 0) {
        leaderboard[team1player1].won += 1;
        leaderboard[team1player2].won += 1;
        leaderboard[team1player1].lastMatches.push('won');
        leaderboard[team1player2].lastMatches.push('won');
        leaderboard[team2player1].lastMatches.push('loss');
        leaderboard[team2player2].lastMatches.push('loss');
      } else if (pointDiffTeam2 > 0) {
        leaderboard[team2player1].won += 1;
        leaderboard[team2player2].won += 1;
        leaderboard[team2player1].lastMatches.push('won');
        leaderboard[team2player2].lastMatches.push('won');
        leaderboard[team1player1].lastMatches.push('loss');
        leaderboard[team1player2].lastMatches.push('loss');
      } else {
        leaderboard[team1player1].lastMatches.push('draw');
        leaderboard[team1player2].lastMatches.push('draw');
        leaderboard[team2player1].lastMatches.push('draw');
        leaderboard[team2player2].lastMatches.push('draw');
      }
      leaderboard[team1player1].games += 1;
      leaderboard[team1player2].games += 1;
      leaderboard[team2player1].games += 1;
      leaderboard[team2player2].games += 1;
      leaderboard[team1player1].points += pointDiffTeam1;
      leaderboard[team1player2].points += pointDiffTeam1;
      leaderboard[team2player1].points += pointDiffTeam2;
      leaderboard[team2player2].points += pointDiffTeam2;
    }
  }
  const leaderboardArray: ILeaderboardPlayer[] = Object.values(leaderboard);
  leaderboardArray.sort(sortLeaderboard);
  const leaderboardArrayWithoutInactive = leaderboardArray.filter(
    (player) => player.games > 0
  );

  return leaderboardArrayWithoutInactive;
};

function sortLeaderboard(
  playerA: ILeaderboardPlayer,
  playerB: ILeaderboardPlayer
): number {
  if (playerA.won !== playerB.won) {
    return playerB.won - playerA.won;
  }

  if (playerA.points !== playerB.points) {
    return playerB.points - playerA.points;
  }

  return playerA.games - playerB.games;
}

export default function LeaderboardView({
  title,
  icon,
  players,
  tournament,
  mode,
}: LeaderBoardTableProps) {
  const TABLE_HEAD =
    mode === 'tournament'
      ? ['Name', 'Wins', 'Played', '+/-', '5 Latest Games']
      : ['Name', 'Wins', 'Played', '+/-', '# Tournaments played'];

  if (mode === 'tournament' && tournament) {
    players = createLeaderboard(tournament);
  }

  if (!players || players.length === 0) {
    return <TournamentNotStarted />;
  }
  return (
    <Card className='h-full overflow-y-hidden max-w-full'>
      <table className='text-center'>
        <thead>
          <tr>
            {TABLE_HEAD.map((head: string, idx) => (
              <th
                key={`head_${idx}_${head}`}
                className={`bg-gray-100 p-4 ${
                  head === 'Name' ? 'sticky left-0 text-left' : ''
                } ${head === '5 Latest Games' ? 'text-left w-fit' : ''}`}
                style={{ boxShadow: 'inset 0 -2px 0 #D1D5DB' }}
              >
                <p className='font-normal leading-none bg-gray-100'>{head}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((row: ILeaderboardPlayer, idx) => (
            <tr
              key={`row_num_${idx}_${row.name}`}
              className='even:bg-blue-gray-50/50'
            >
              <td
                className={`${
                  idx % 2 == 0 ? 'bg-white' : 'bg-gray-100'
                } p-4 sticky left-0 text-left`}
              >
                <p className='font-normal text-md'>{row.name || ''}</p>
              </td>
              <td
                className={`${
                  idx % 2 == 0 ? 'bg-white' : 'bg-gray-100'
                } py-4 px-2 sm:px-2`}
              >
                <p className='font-normal text-md'>
                  {typeof row.won == 'number' ? row.won : ''}
                </p>
              </td>
              {/* May include draws later
                        <td className={`${idx % 2 == 0 ? "bg-white" : "bg-gray-100"} py-4 px-2 sm:px-2`}>
                            <p className="font-normal text-md">
                                {typeof row.games == 'number' && typeof row.won == 'number' ? row.games - row.won : ""}
                            </p>
                        </td>
                        */}
              <td
                className={`${
                  idx % 2 == 0 ? 'bg-white' : 'bg-gray-100'
                } py-4 px-2 sm:px-2`}
              >
                <p className='font-normal text-md'>
                  {typeof row.games == 'number' ? row.games : ''}
                </p>
              </td>
              <td
                className={`${
                  idx % 2 == 0 ? 'bg-white' : 'bg-gray-100'
                } py-4 px-2 sm:px-2`}
              >
                <p className='font-normal text-md'>
                  {typeof row.points == 'number' ? row.points : ''}
                </p>
              </td>
              {mode === 'tournament' && row.lastMatches && (
                <td
                  className={`${
                    idx % 2 == 0 ? 'bg-white' : 'bg-gray-100'
                  } py-4 px-2 sm:px-2flex justify-start w-fit`}
                >
                  <p className='font-normal pl-2 flex gap-1'>
                    {row.lastMatches.slice(0, 5).map((result, idx) => (
                      <IconButton
                        key={`result_${row.name}_${idx}`}
                        className={`${
                          result === 'won'
                            ? 'bg-success'
                            : result === 'draw'
                            ? 'bg-warning'
                            : 'bg-error'
                        } cursor-default shadow-none hover:shadow-none`}
                      >
                        <i className='fas fa-heart' />
                      </IconButton>
                    ))}
                  </p>
                </td>
              )}
              {mode === 'admin' && row.tournaments && (
                <td
                  className={`${
                    idx % 2 == 0 ? 'bg-white' : 'bg-gray-100'
                  } py-4 px-2 sm:px-2`}
                >
                  <p className='font-normal text-md'>
                    {typeof row.tournaments == 'number' ? row.tournaments : ''}
                  </p>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
