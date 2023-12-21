import LogoSilhouette from '../../assets/Logo_Silhoutte';

export default function TournamentNotStarted() {
  return (
    <div className='flex'>
      <div className='w-fit flex items-center gap-4 rounded-lg bg-blue-100 shadow p-4  pe-6 text-sm'>
        <div className='h-12'>
          <LogoSilhouette />
        </div>
        <div className='grow-0'>
          <p className='text-md '>Visible when the</p>
          <p className='text-md '>tournament has started</p>
        </div>
      </div>
    </div>
  );
}
