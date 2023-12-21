// ITournamentSimple is a stripped version of the tournament, used when fetching many tournaments
export interface ITournamentSimple {
  date: string;
  location: string;
  name: string;
  id: string;
  owner: string;
  image?: string;
  startingTime: string;
}

export interface ITournaments {
  todays: ITournamentSimple[] | [];
  upcoming: ITournamentSimple[] | [];
  finished: ITournamentSimple[] | [];
}
export interface ICreateTournament {
  name: string;
  date: string;
  startingTime: string;
  description: string;
  numberOfRounds: number;
  location: string;
  owner: string;
  settings: {
    prioRest: string;
    prioType: string;
    maxSimultaneousGames: string;
  };
}
export interface IEditTournament {
  name: string;
  date: string;
  startingTime: string;
  description: string;
  numberOfRounds: number;
  location: string;
  settings: {
    prioRest: string;
    prioType: string;
    maxSimultaneousGames: string;
  };
}
// Tournament full version

export interface IGame {
  team1: {
    players: string[];
    points: number | string;
  };
  team2: {
    players: string[];
    points: number | string;
  };
}

export interface ITournamentRound {
  [gameKey: string]: IGame;
}

export interface ITournamentRounds {
  [roundNumber: string]: ITournamentRound;
}

export interface ILeaderboardPlayer {
  lastMatches?: Array<string>;
  tournaments?: number;
  games: number;
  id: string;
  name: string;
  points: number;
  won: number;
}

export interface IPlayer {
  id: string;
  name: string;
}
export interface IPlayers {
  [playerId: string]: string;
}

export interface ITournament {
  startingTime: string;
  date: string;
  location: string;
  name: string;
  id: string;
  owner: string;
  description: string;
  image?: string;
  numberOfRounds: number;
  rounds: ITournamentRounds;
  players: IPlayers;
  status: string;
  playersInactive?: string[];
  settings: {
    prioRest: string;
    prioType: string;
    maxSimultaneousGames: string;
  };
}

export interface ICreatePlayer {
  name: string;
  sex: string;
}

export interface IUpdateGameResults {
  round: string;
  match: string;
  team1Points: number;
  team2Points: number;
}
