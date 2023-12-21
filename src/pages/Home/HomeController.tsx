import { useEffect, useState } from 'react';
import HomeView from './HomeView';
import { getHomeScreenTournaments } from '../../utils/requestUtils';

export default function HomeController() {
  const [tournaments, setTournaments] = useState<any>(null);

  useEffect(() => {
    console.log('getting tournaments');

    getHomeScreenTournaments()
      .then((data) => {
        setTournaments(data);
      })
      .catch((error) => {
        console.error('Error fetching tournaments:', error);
      });
  }, []);

  return <HomeView tournaments={tournaments} />;
}
