import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { ITournaments } from '../../types';
import DashboardView from './DashboardView';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { getDashboardTournaments } from '../../utils/requestUtils';

export default function DashboardController() {
  // This is only for logged in users. The tournaments visible here are the user's own tournaments
  const [tournaments, setTournaments] = useState<ITournaments | null>(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { userEmail, jwt } = authContext;

  useEffect(() => {
    async function fetchData() {
      console.log('getting data');

      const data = await getDashboardTournaments(userEmail!, jwt!);
      setTournaments(data);
    }

    if (userEmail && jwt) {
      fetchData();
    } else {
      navigate('/');
    }
  }, []);

  function goToCreateNewTournament() {
    navigate('/create-tournament');
  }

  return (
    <>
      <DashboardView
        tournaments={tournaments}
        goToCreateNewTournament={goToCreateNewTournament}
      />
    </>
  );
}
