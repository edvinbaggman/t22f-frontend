interface GameViewProps {
  team1: string[];
  team2: string[];
  team1Score: number | string;
  team2Score: number | string;
  isAdmin: boolean;
  openModal: () => void;
  result: number;
}

export default function GameView({
  team1,
  team2,
  team1Score,
  team2Score,
  isAdmin,
  openModal,
  result,
}: GameViewProps) {
  const resultToClassName = (team: number, result: number) => {
    if (team === result) {
      return 'bg-success text-white font-bold';
    } else if (result === 0) {
      return 'bg-warning text-white font-bold';
    } else if (result === -1) {
      return 'bg-gray-500 text-gray-800';
    } else {
      return 'bg-error text-white font-bold';
    }
  };

  return (
    <div /*className={`border-s-4 rounded-lg ${result === -1 ? 'border-warning' : 'border-success'}`}*/
    >
      <div
        className={`${
          isAdmin ? 'cursor-pointer' : ''
        } flex flex-col gap-2 items-center justify-center rounded-lg border-y border-x border-gray-300 py-4 ${
          result === -1 ? 'opacity-75 bg-gray-200' : ''
        }`}
        onClick={openModal}
      >
        <div className='flex gap-2 text-sm items-center justify-between w-full truncate'>
          <div
            className={`flex flex-col items-center justify-center rounded-lg px-4 h-14 w-full truncate`}
          >
            {team1.map((player, idx) => (
              <div key={`${idx}_${player}`} className='truncate w-full'>
                {player}
              </div>
            ))}
          </div>
          <div
            className={`flex items-center justify-center rounded-lg text-center w-12 h-12 mx-4 ${resultToClassName(
              1,
              result
            )}`}
            style={{ aspectRatio: 1 }}
          >
            {typeof team1Score === 'number' ? team1Score : ''}
          </div>
        </div>
        <div className='flex gap-2 text-sm items-center justify-between w-full'>
          <div
            className={`flex flex-col items-center justify-center rounded-lg px-4 h-14 w-full truncate`}
          >
            {team2.map((player, idx) => (
              <div key={`${idx}_${player}`} className='truncate w-full'>
                {player}
              </div>
            ))}
          </div>
          <div
            className={`flex items-center justify-center rounded-lg text-center w-12 h-12 mx-4 ${resultToClassName(
              2,
              result
            )}`}
            style={{ aspectRatio: 1 }}
          >
            {typeof team2Score === 'number' ? team2Score : ''}
          </div>
        </div>
      </div>
    </div>
  );
}
