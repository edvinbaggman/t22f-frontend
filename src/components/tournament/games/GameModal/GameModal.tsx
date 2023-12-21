import { ContextModalProps } from '@mantine/modals';
import GameModalView from './GameModalView';
import { IUpdateGameResults } from '../../../../types';
import { useContext } from 'react';
import { TournamentContext } from '../../../../contexts/TournamentProvider';

export function GameModal({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  team1: string[];
  team1Score: number;
  team2: string[];
  team2Score: number;
  tournamentId: string;
  roundIndex: string;
  gameKey: string;
}>) {
  const tournamentContext = useContext(TournamentContext);

  const handleSave = async (values: { [field: string]: any }) => {
    const updateGameResultObject: IUpdateGameResults = {
      round: innerProps.roundIndex.toString(),
      match: innerProps.gameKey.toString(),
      team1Points: values.score1,
      team2Points: values.score2,
    };
    tournamentContext.setGameResult!(updateGameResultObject);
    context.closeModal(id);
  };

  return (
    <GameModalView
      team1={innerProps.team1}
      score1={innerProps.team1Score}
      team2={innerProps.team2}
      score2={innerProps.team2Score}
      handleSave={handleSave}
    />
  );
}
