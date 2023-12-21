'use client';
import LogoSilhouette from '../../../assets/Logo_Silhoutte';
import { ITournament } from '../../../types';
import {
  CalendarIcon,
  MapPinIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import formatDateRelativeToNow from '../../../utils/timeUtils';

interface TournamentAboutViewProps {
  title?: string;
  icon?: ReactNode;
  tournament?: ITournament;
  isAdmin?: boolean;
  tournamentStatus: string;
}

export default function TournamentAboutView({
  title,
  icon,
  tournament,
  isAdmin,
  tournamentStatus,
}: TournamentAboutViewProps) {
  const mockDescription =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.';
  const iconClass = 'w-6 h-6 inline-block text-gray-500';
  return (
    <div className=''>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2 text-sm'>
          <CalendarIcon className={iconClass} />
          <p className='text-gray-700'>
            {formatDateRelativeToNow(
              tournament?.date,
              tournament?.startingTime
            )}
          </p>
        </div>
        <div className='flex items-center gap-2 text-sm'>
          <MapPinIcon className={iconClass} />
          <p className='text-gray-700'>{tournament?.location}</p>
        </div>
        <div className='flex items-center gap-2 text-sm'>
          <UserIcon className={iconClass} />
          <p className='text-gray-700'>
            Created by <strong>{tournament?.owner}</strong>
          </p>
        </div>
        {!isAdmin && tournamentStatus == 'upcoming' && (
          <div className='flex items-center bg-blue-100 p-4 pe-6 w-fit rounded-lg gap-2 text-sm shadow'>
            <div className='h-12 w-12'>
              <LogoSilhouette />
            </div>
            <span className='flex flex-col gap-2'>
              <p className='font-semibold'>
                Do you want to join this tournament?
              </p>
              <p className=''>Contact the creator of this tournament</p>
            </span>
          </div>
        )}
        <div className='text-sm pt-4'>
          {(tournament?.description &&
            tournament.description.split('\n').map((par, idx) => (
              <p key={idx}>
                {par}
                <br />
              </p>
            ))) ||
            mockDescription}
        </div>
      </div>
    </div>
  );
}
