import { ICreatePlayer, ICreateTournament, IEditTournament } from '../types';

// ##### Region: general configuration

const protocolAndHost: string = 'http://localhost:8080';
//const protocolAndHost: string = 'https://t22f-hvr74qbrvq-ew.a.run.app';

interface requestBody {
  method: string;
  cache?: RequestCache;
  headers: {
    'Accept': string;
    'Content-Type'?: string;
  };
  body?: string | FormData; // json format
}

const getBody: requestBody = {
  method: 'GET',
  cache: 'no-store',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
};

async function request(url: string, body: requestBody) {
  const response = await fetch(url, body)
    .then((res) => res.json())
    .catch((er) => {
      console.log(er);
    });
  if (body.method === 'GET' || body.method === 'POST') {
    return response;
  }
}

// ##### EndRegion

// ##### Region: requests WITHOUT authorization

export async function getHomeScreenTournaments() {
  // TODO: maybe limit the amount of Tournaments that get fetched (imagine if we have 10 000)
  try {
    const tournaments = await request(`${protocolAndHost}/tournaments/simple`, {
      ...getBody,
    });
    return tournaments;
  } catch (e) {
    return 'Not working';
  }
}

export async function getTournament(id: string) {
  const tournament = await request(
    `${protocolAndHost}/tournaments/${id}`,
    getBody
  );
  return tournament;
}

// ##### EndRegion

// ##### Region: requests WITH authorization

export async function getDashboardTournaments(userId: string, jwt: string) {
  const body = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  };
  const tournaments = await request(
    `${protocolAndHost}/tournaments/simple/${encodeURIComponent(userId)}`,
    body
  );
  return tournaments;
}

export async function createTournament(
  data: ICreateTournament,
  file: File,
  jwt: string
) {
  const formData = new FormData();
  formData.append('form', JSON.stringify(data));
  formData.append('file', file);

  const body = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  };
  const tournament = await request(`${protocolAndHost}/tournaments`, body);
  return tournament;
}

export async function editTournament(
  id: string,
  data: IEditTournament,
  jwt: string
) {
  const body = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  };
  await request(`${protocolAndHost}/tournaments/${id}`, body);
}

export async function deleteTournament(id: string, jwt: string) {
  const body = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  };
  await request(`${protocolAndHost}/tournaments/${id}`, body);
}

export async function addUserToDatabase(
  email: string,
  name: string,
  jwt: string
) {
  const data = {
    email,
    name,
  };

  const body = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  };
  await request(`${protocolAndHost}/users`, body);
}

export async function generateNewRound(id: string, jwt: string) {
  const body = {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  };
  const response = await request(
    `${protocolAndHost}/tournaments/${id}/generateNewRound`,
    body
  );
  return response;
}

export async function updateGameResults(
  tournamentId: string,
  round: string,
  match: string,
  team1Points: number,
  team2Points: number,
  jwt: string
) {
  const body = {
    method: 'PATCH',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      round,
      match,
      team1Points,
      team2Points,
    }),
  };
  const response = await request(
    `${protocolAndHost}/tournaments/${tournamentId}`,
    body
  );
  return response;
}

export async function saveTournamentStats(tournamentId: string, jwt: string) {
  const body = {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  };
  await request(
    `${protocolAndHost}/tournaments/${tournamentId}/endOfTournament`,
    body
  );
}

export async function getTournamentPlayers(tournamentId: string, jwt: string) {
  const body = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  };
  // TODO : Backend add this
  const players = await request(
    `${protocolAndHost}/tournaments/${tournamentId}/getTournamentPlayers`,
    body
  );
  return players;
}

export async function getAllPlayersUnderAdmin(userId: string, jwt: string) {
  const body = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  };
  // TODO : Backend add this
  const players = await request(
    `${protocolAndHost}/users/${encodeURIComponent(userId)}/getLeaderboard`,
    body
  );
  return players;
}

export async function getPlayersNotInTournament(
  tournamentId: string,
  jwt: string
) {
  const body = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  };
  const players = await request(
    `${protocolAndHost}/tournaments/${tournamentId}/getPlayersNotInTournamment`,
    body
  );
  return players;
}
export async function addPlayer(
  tournamentId: string,
  playerId: string,
  jwt: string
) {
  const body = {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  };
  await request(
    `${protocolAndHost}/tournaments/${tournamentId}/addPlayer/${playerId}`,
    body
  );
}

export async function creatPlayer(
  tournamentId: string,
  data: ICreatePlayer,
  jwt: string
) {
  const body = {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  };
  await request(
    `${protocolAndHost}/tournaments/${tournamentId}/createPlayer`,
    body
  );
}

export async function removePlayer(
  tournamentId: string,
  playerId: string,
  jwt: string
) {
  const body = {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  };
  await request(
    `${protocolAndHost}/tournaments/${tournamentId}/removePlayer/${playerId}`,
    body
  );
}

// ##### EndRegion
