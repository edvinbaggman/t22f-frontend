import { Link } from 'react-router-dom';
import Logo from '../../assets/logo_t22f';
import NavbarEnd from './NavbarEnd';

export default function Navbar() {
  return (
    <section className='navbar sticky top-0 z-10 bg-yellow-200'>
      <div className='navbar-start'>
        <Link to='/' className='btn btn-ghost'>
          <Logo />
        </Link>
      </div>
      <div className='navbar-end'>
        <NavbarEnd />
      </div>
    </section>
  );
}
