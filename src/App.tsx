import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import LoginController from './pages/Login/LoginController';
import RegisterController from './pages/Register/RegisterController';
import ResetPasswordController from './pages/ResetPassword/ResetPasswordController';
import AboutController from './pages/About/AboutController';
import HomeController from './pages/Home/HomeController';
import DashboardController from './pages/Dashboard/DashboardController';
import CreateTournamentController from './pages/CreateTournament/CreateTournamentController';
import TournamentController from './pages/Tournament/TournamentController';
import AdminLeaderBoardController from './pages/Leaderboard/AdminLeaderboardController';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomeController />
      </Layout>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Layout>
        <DashboardController />
      </Layout>
    ),
  },
  {
    path: '/dashboard/leaderboard',
    element: (
      <Layout>
        <AdminLeaderBoardController />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <LoginController />
      </Layout>
    ),
  },
  {
    path: '/register',
    element: (
      <Layout>
        <RegisterController />
      </Layout>
    ),
  },
  {
    path: '/resetPassword',
    element: (
      <Layout>
        <ResetPasswordController />
      </Layout>
    ),
  },
  {
    path: '/about',
    element: (
      <Layout>
        <AboutController />
      </Layout>
    ),
  },
  {
    path: '/create-tournament',
    element: (
      <Layout>
        <CreateTournamentController />
      </Layout>
    ),
  },
  {
    path: '/tournament/:id',
    element: (
      <Layout>
        <TournamentController />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
