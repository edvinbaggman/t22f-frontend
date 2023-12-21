import { PlusIcon } from '@heroicons/react/24/solid';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { ITournaments } from '../../types';
import CardSwiper from '../../components/CardSwiper/CardSwiper';

export default function DashboardView({
  tournaments,
  goToCreateNewTournament,
}: {
  tournaments: ITournaments | null;
  goToCreateNewTournament: () => void;
}) {
  return (
    <div className='max-w-6xl mx-auto px-4 mt-10 pb-10 w-full'>
      <div className='flex flex-col flex-col-reverse justify-between md:flex-row gap-5'>
        <p className='text-2xl ms-2 w-full font-bold'>Dashboard</p>
        <div className='flex gap-5 flex-col md:flex-row'>
          <Link
            className='w-full md:w-52 btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'
            to='/dashboard/leaderboard/'
          >
            <Bars3Icon className='w-5 h-5 text-gray-500' />
            <p>Leaderboard</p>
          </Link>

          <button
            className='w-full md:w-72 btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'
            onClick={goToCreateNewTournament}
          >
            <PlusIcon className='w-5 h-5 text-gray-500' />
            <p>Create new tournament</p>
          </button>
        </div>
      </div>
      <div className='pt-2'>
        <CardSwiper
          title="Today's Tournaments"
          tournaments={tournaments?.todays}
        />
        <CardSwiper
          title='Upcoming Tournaments'
          tournaments={tournaments?.upcoming}
        />
        <CardSwiper
          title='Finished Tournaments'
          tournaments={tournaments?.finished}
        />
      </div>
    </div>
  );
}
