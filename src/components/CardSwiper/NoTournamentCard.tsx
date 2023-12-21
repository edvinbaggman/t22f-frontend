export const NoTournamentCard = (): JSX.Element => {
  return (
    <div className={`rounded-lg col-span-2 md:col-span-1 lg:col-span-1`}>
      <div className='flex flex-col gap-3 pb-4'>
        <div
          className='relative rounded-lg bg-gray-200 '
          style={{ aspectRatio: 2 }}
        >
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold'>
            {'Nothing here :('}
          </div>
        </div>
        <div className='bg-gray-200 h-3 w-20 rounded'></div>
        <div className='bg-gray-200 h-3 w-52 rounded'></div>
        <div className='bg-gray-200 h-3 w-40 rounded'></div>
      </div>
    </div>
  );
};
