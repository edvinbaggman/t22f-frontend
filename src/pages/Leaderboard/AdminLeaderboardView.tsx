import BackButton from '../../components/BackButton';
import LeaderboardView from '../../components/tournament/leaderboard/LeaderboardView';
import { ILeaderboardPlayer } from '../../types';
import leaderboardImage from '../../assets/leaderboard.jpg';

export default function AdminLeaderBoardView({
  players,
  handleBackClick,
}: {
  players: ILeaderboardPlayer[] | null;
  handleBackClick: () => void;
}) {
  return (
    <div className='px-0 lg:px-20 xl:px-40 py-5 h-full flex flex-col grow'>
      <BackButton onClick={handleBackClick} />
      <p className='text-2xl pb-5 '>Leaderboard</p>
      <div
        className='relative overflow-hidden rounded-none lg:rounded-lg block mb-5'
        style={{ height: 150 }}
      >
        <img
          src={leaderboardImage}
          alt='Tjena'
          style={{
            width: '100%',
            objectFit: 'cover',
            height: '100%',
          }}
        />
      </div>

      <LeaderboardView players={players} mode='admin' />
    </div>
  );
}
