import { modals } from '@mantine/modals';
import React from 'react';
import '@mantine/core/styles.css';
import GameView from './GameView';

interface GameControllerProps {
  gameKey: string;
  tournamentId: string;
  selectedRound: number;
  team1: string[];
  team1Score: number | string;
  team2: string[];
  team2Score: number | string;
  isAdmin: boolean;
}

export default function GameController({
  gameKey,
  tournamentId,
  selectedRound,
  team1,
  team1Score,
  team2,
  team2Score,
  isAdmin,
}: GameControllerProps) {
  // 1 = player1 wins, 2 = player2 wins, 0 = draw
  const result: number =
    team1Score === '' || team2Score === ''
      ? -1
      : team1Score > team2Score
      ? 1
      : team2Score > team1Score
      ? 2
      : 0;

  const openModal = () => {
    if (!isAdmin) return;

    modals.openContextModal({
      modal: 'GameModal',
      centered: true,
      title: <p className='font-bold'>Update game results</p>,
      innerProps: {
        team1,
        team1Score,
        team2,
        team2Score,
        tournamentId,
        roundIndex: selectedRound,
        gameKey,
      },
    });
  };
  return (
    <GameView
      team1={team1}
      team1Score={team1Score}
      team2={team2}
      team2Score={team2Score}
      isAdmin={isAdmin}
      openModal={openModal}
      result={result}
    />
  );
}
