import defaultImage from '../assets/tournamentCover.png';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { ITournamentSimple } from '../types';
import { Link } from 'react-router-dom';
import formatDateRelativeToNow from '../utils/timeUtils';

interface CardInterface {
  tournament: ITournamentSimple;
}

export default function Card({ tournament }: CardInterface) {
  return (
    <Link to={`/tournament/${tournament.id}`}>
      <div className='mt-2 mb-2 w-full bg-white shadow rounded-lg transform transition-transform hover:scale-105'>
        <div
          className='relative block overflow-hidden rounded-t-lg'
          style={{ aspectRatio: 2 }}
        >
          <img
            src={tournament?.image || defaultImage}
            alt='Tjena'
            width='0'
            height='0'
            sizes='100vw'
            className='w-full h-auto'
            style={{ objectFit: 'cover', width: 'auto', height: 'auto' }}
          />
        </div>
        <div className='relative px-2 py-2'>
          <p className='text-md font-semibold text-gray-900 truncate pb-1 pt-2'>
            {tournament.name}
          </p>

          <div className='flex gap-2 items-center mb-1'>
            <CalendarIcon className='w-5 h-5 inline-block text-gray-500' />
            <p className='text-sm text-gray-700 truncate font-thin'>
              {formatDateRelativeToNow(
                tournament.date,
                tournament.startingTime
              )}
            </p>
          </div>
          <div className='flex gap-2 items-center'>
            <MapPinIcon className='w-5 h-5 inline-block text-gray-500' />
            <p className='text-sm text-gray-700 font-thin'>
              {tournament.location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
