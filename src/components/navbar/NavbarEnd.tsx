import { useContext, useEffect, useState } from 'react';
import ProfileCircle from './profileCircle';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

export default function NavbarEnd() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { userEmail, logout } = authContext;

  function handleDashboardClick() {
    navigate('/dashboard');
  }

  if (userEmail) {
    return (
      <ProfileCircle
        email={userEmail}
        onLogout={logout}
        onDashboard={handleDashboardClick}
      />
    );
  }

  return (
    <Link to='/login' className='btn bg-black text-yellow-200 rounded-lg'>
      Login
    </Link>
  );
}
