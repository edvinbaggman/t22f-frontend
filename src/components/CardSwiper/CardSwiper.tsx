import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, FreeMode } from 'swiper/modules';
import Card from '../Card';
import { LoadingCard } from './LoadingCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import { ITournamentSimple } from '../../types';
import { NoTournamentCard } from './NoTournamentCard';

interface CardSwiperProps {
  title: string;
  tournaments: ITournamentSimple[] | undefined;
}

const loadingCards = (
  <div className='w-full animate-pulse grid grid-cols-4 sm:grid-cols-4  md:grid-cols-3 lg:grid-cols-4 overflow-hidden gap-3'>
    <LoadingCard />
    <LoadingCard />
    <LoadingCard additionalClassName={'hidden md:block'} />
    <LoadingCard additionalClassName={'hidden sm:hidden md:hidden lg:block'} />
  </div>
);

export default function CardSwiper({ title, tournaments }: CardSwiperProps) {
  if (!tournaments) {
    return (
      <div className='max-w-6xl mx-auto pt-8 px-4 w-full'>
        <p className='text-xl pb-8 flex font-semibold'>{title}</p>
        <div className='px-2'>{loadingCards}</div>
      </div>
    );
  }
  return (
    <>
      <div className='max-w-6xl mx-auto pt-8 px-4 w-full'>
        <p className='text-xl pb-8 flex font-semibold'>{title}</p>
        <Swiper
          modules={[Pagination, Navigation, Mousewheel, FreeMode]}
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 10 },
            720: { slidesPerView: 3, spaceBetween: 10 },
            960: { slidesPerView: 4, spaceBetween: 10 },
            1200: { slidesPerView: 4, spaceBetween: 10 },
            1408: { slidesPerView: 4, spaceBetween: 10 },
          }}
          pagination={{
            type: 'progressbar',
          }}
          navigation={true}
          mousewheel={tournaments.length > 4 ? true : false}
          freeMode={true}
          className='px-2'
        >
          {!tournaments
            ? loadingCards
            : tournaments.map((tournament: ITournamentSimple) => (
                <SwiperSlide key={tournament.id}>
                  <Card tournament={tournament} />
                </SwiperSlide>
              ))}
          {tournaments && tournaments.length == 0 && (
            <div className='w-full grid grid-cols-4 sm:grid-cols-4  md:grid-cols-3 lg:grid-cols-4 overflow-hidden gap-3'>
              <NoTournamentCard />
            </div>
          )}
        </Swiper>
      </div>
    </>
  );
}
