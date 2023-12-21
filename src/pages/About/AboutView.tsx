import { Link } from 'react-router-dom';
import aboutImage from '../../assets/about.png';

export default function AboutView() {
  return (
    <>
      <div className='flex flex-wrap justify-center bg-grey-100 mt-10'>
        <div className='px-4 py-4 max-w-md'>
          <img
            src={aboutImage}
            alt=''
            className='mb-3 mr-3 rounded-xl shadow-sm'
            style={{ height: 'auto' }}
          />
          <div>
            {'Images from '}
            <a
              href='https://instagram.com/yellowballcult?igshid=MzRlODBiNWFlZA=='
              rel='noreferrer'
              target='_blank'
              className='text-teal-700 transition hover:text-teal-700/75'
            >
              {'Corentin - Yellow Ball Cult'}
            </a>
          </div>
        </div>
        <div className='px-4 py-4 max-w-xl'>
          <h2 className='mb-4 text-4xl font-semibold'>Takes two to fwango</h2>
          <p className='mb-5 text-xl leading-7'>What is roundnet?</p>

          <p className='mb-5 text-base leading-7 text-gray-500 dark:text-gray-400'>
            Roundnet is a ball game created in 1989 by Jeff Knurek, inspired
            primarily by concepts from volleyball. The game is played between
            two teams, usually with two players each. Players initially line up
            around a small trampoline-like net at the start of a point and
            starts with a serve from one team to another.
          </p>
          <p className='mb-5 text-xl leading-7'>Takes two to fwango?</p>

          <p className='mb-5 text-base leading-7 text-gray-500 dark:text-gray-400'>
            A fun tournament structure where you switch parner and opponents
            every game. This webapp lets you administrate these these
            tournaments. Just create a tournament, and add players to your
            tournament. During a tournament, you can still change settings and
            players, and it will take effect next time you generate a round.
          </p>

          <p className='mb-5 text-xl leading-7'>Getting started!</p>
          {/*TODO remove key*/}
          <p className='mb-5 text-base leading-7 text-gray-500 dark:text-gray-400'>
            To create your own tournaments, you need an account. To make an
            account you need a secret key given out by Roundnet Sweden. Reach
            out to edvinbaggman@hotmail.se to recieve your key.
          </p>
          <Link to='/'>
            <button className='w-full btn bg-yellow-200 transition hover:bg-yellow-300 rounded-lg'>
              {"Let's fwango"}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
