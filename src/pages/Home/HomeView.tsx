import frontImage from '../../assets/background.png';
import { Link } from 'react-router-dom';
import { ITournaments } from '../../types';
import CardSwiper from '../../components/CardSwiper/CardSwiper';

export default function HomeView({
  tournaments,
}: {
  tournaments: ITournaments;
}) {
  return (
    <div className='mb-28'>
      <div className='overflow-hidden flex relative' style={{ height: 300 }}>
        <img
          src={frontImage}
          className='object-cover'
          alt='tjena'
          style={{ objectPosition: 'bottom', width: '100%', height: 'auto' }}
        />
        <Link to='/about'>
          <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-200 transition hover:bg-yellow-300 rounded-lg py-2 px-2 font-semibold'>
            READ MORE
          </button>
        </Link>
      </div>
      <div className='pt-2 '>
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
