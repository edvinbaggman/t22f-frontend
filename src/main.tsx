import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthProvider.tsx';
import { TournamentProvider } from './contexts/TournamentProvider.tsx';
/*
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <TournamentProvider>
        <App />
      </TournamentProvider>
    </AuthProvider>
  </React.StrictMode>
);
*/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <TournamentProvider>
      <App />
    </TournamentProvider>
  </AuthProvider>
);
