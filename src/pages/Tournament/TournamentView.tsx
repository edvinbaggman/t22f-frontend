import {
  ChartBarIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  PlayIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { ITournament } from '../../types';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import TabSwitch from '../../components/tournament/TabSwitch';
import PlayersController from '../../components/tournament/players/PlayersController';
import TournamentAboutView from '../../components/tournament/about/TournamentAboutView';
import GamesController from '../../components/tournament/games/GamesController';
import LeaderboardView from '../../components/tournament/leaderboard/LeaderboardView';
import SettingsController from '../../components/tournament/settings/SettingsController';
import BackButton from '../../components/BackButton';
import { GameModal } from '../../components/tournament/games/GameModal/GameModal';
import { AddPlayerModal } from '../../components/tournament/players/AddPlayerModal/AddPlayerModal';
import defaultImage from '../../assets/tournamentCover.png';

interface TournamentViewProps {
  tournament: ITournament;
  tournamentStatus: string;
  isAdmin: boolean;
  handleBackClick: () => void;
}

export default function TournamentView({
  tournament,
  tournamentStatus,
  isAdmin,
  handleBackClick,
}: TournamentViewProps) {
  const iconClass = 'h-5 w-5 text-gray-500 group-hover:text-gray-800';

  const liveIcon = (
    <div className='rounded flex items-center gap-1 px-2 bg-error'>
      <div className='h-3 w-3 rounded-full bg-white'></div>
      <p className='text-white'>Ongoing</p>
    </div>
  );

  const finishedIcon = (
    <div className='rounded flex items-center gap-1 px-2 bg-success'>
      <CheckCircleIcon className='h-4 w-4 text-white' />
      <p className='text-white'>Finished</p>
    </div>
  );

  return (
    <MantineProvider>
      <ModalsProvider
        modals={{ GameModal: GameModal, AddPlayerModal: AddPlayerModal }}
      >
        <div className='px-0 lg:px-20 xl:px-40 py-5 h-full flex flex-col grow'>
          <div className='flex flex-col grow h-full'>
            <BackButton onClick={handleBackClick} />
            <div
              className='relative overflow-hidden rounded-none lg:rounded-lg block'
              style={{ height: 150 }}
            >
              <img
                src={tournament?.image || defaultImage}
                alt='Tjena'
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  height: '100%',
                }}
              />
            </div>
            <div className='py-3 px-2 flex gap-3 items-center'>
              {tournamentStatus === 'inPlay' && liveIcon}
              {tournamentStatus === 'finished' && finishedIcon}
              <div className='flex gap-x-2 text-lg font-semibold text-gray-900 items-center text-2xl'>
                <h1>{tournament?.name || null}</h1>
              </div>
            </div>
            {!isAdmin ? (
              <TabSwitch>
                <TournamentAboutView
                  title='About'
                  icon={<InformationCircleIcon className={iconClass} />}
                  tournament={tournament}
                  isAdmin={false}
                  tournamentStatus={tournamentStatus}
                />
                <GamesController
                  title='Games'
                  icon={<PlayIcon className={iconClass} />}
                  rounds={tournament.rounds}
                  numberOfRounds={tournament.numberOfRounds}
                  tournamentId={tournament.id}
                  players={tournament.players}
                  isAdmin={false}
                />
                <LeaderboardView
                  title='Leaderboard'
                  icon={<ChartBarIcon className={iconClass} />}
                  tournament={tournament}
                  mode='tournament'
                />
              </TabSwitch>
            ) : (
              <TabSwitch>
                <TournamentAboutView
                  title='About'
                  icon={<InformationCircleIcon className={iconClass} />}
                  tournament={tournament}
                  isAdmin={true}
                  tournamentStatus={tournamentStatus}
                />
                <GamesController
                  title='Games'
                  icon={<PlayIcon className={iconClass} />}
                  rounds={tournament.rounds}
                  numberOfRounds={tournament.numberOfRounds}
                  tournamentId={tournament.id}
                  players={tournament.players}
                  isAdmin={true}
                />
                <LeaderboardView
                  title='Leaderboard'
                  icon={<ChartBarIcon className={iconClass} />}
                  tournament={tournament}
                  mode='tournament'
                />
                <SettingsController
                  title='Settings'
                  icon={<Cog6ToothIcon className={iconClass} />}
                  tournament={tournament}
                ></SettingsController>
                <PlayersController
                  title='Players'
                  icon={<UsersIcon className={iconClass} />}
                  tournament={tournament}
                />
              </TabSwitch>
            )}
          </div>
        </div>
      </ModalsProvider>
    </MantineProvider>
  );
}
