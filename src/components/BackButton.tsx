import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className='flex w-fit items-center justify-center mb-2 hover:bg-gray-300 pe-3 rounded'
      onClick={onClick}
    >
      <ChevronLeftIcon className='h-6 w-6' />
      <p>Back</p>
    </button>
  );
}
