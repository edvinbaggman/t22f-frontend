export const TournamentLoader = () => {
  return (
    <div className='px-0 lg:px-20 xl:px-40 py-5 h-full flex flex-col grow'>
      <div className='w-full flex flex-col gap-4 animate-pulse'>
        <div className='py-3 px-2 flex flex-col gap-1 h-3 w-20 rounded-lg bg-gray-200' />
        <div
          className='relative rounded-lg block w-full rounded-lg bg-gray-200'
          style={{ height: 150 }}
        />
        <div className='py-3 px-2 flex flex-col gap-1 h-3 w-40 rounded-lg bg-gray-200' />
        <div className='relative rounded-lg block w-full h-80 rounded-lg bg-gray-200' />
      </div>
    </div>
  );
};
