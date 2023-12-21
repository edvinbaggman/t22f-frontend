import style from './profileCircle.module.css';
import {
  ArrowLeftOnRectangleIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';

interface ProfileCircleProps {
  email: string;
  onLogout: () => void;
  onDashboard: () => void;
}

export default function ProfileCircle({
  email,
  onLogout,
  onDashboard,
}: ProfileCircleProps) {
  return (
    <details className={style.dropdown}>
      <summary role='button'>
        <div
          className={`${style.button} rounded-full w-11 h-11 shrink-0 grow-0 flex items-center justify-center bg-green-500 text-white text-s hover:border hover:border-2`}
        >
          <p className='m-0 p-0'>
            {email ? email.charAt(0).toUpperCase() : '*'}
          </p>
        </div>
      </summary>
      <ul className='bg-white p-4 mt-3 shadow-md'>
        <li className='pb-2 mb-2 border-b-2 border-gray-300 flex items-center gap-1'>
          <div className='rounded-full w-10 h-10 shrink-0 grow-0 flex items-center justify-center bg-green-500 text-white text-s'>
            <p className='m-0 p-0'>
              {email ? email.charAt(0).toUpperCase() : '*'}
            </p>
          </div>
          {email || "Couldn't find user name"}
        </li>
        <li
          className='p-1 cursor-pointer hover:bg-gray-200 flex items-center gap-1'
          onClick={onDashboard}
        >
          <SquaresPlusIcon className='h-5 w-5' />
          Dashboard
        </li>
        <li
          className='p-1 cursor-pointer hover:bg-gray-200 flex items-center gap-1'
          onClick={onLogout}
        >
          <ArrowLeftOnRectangleIcon className='h-5 w-5' />
          Sign out
        </li>
      </ul>
    </details>
  );
}
