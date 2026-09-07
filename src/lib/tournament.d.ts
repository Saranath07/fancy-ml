export interface TournamentFilm {
  id: string;
}

export interface CompletedMatch<T extends TournamentFilm> {
  round: number;
  pair: [T, T];
  winner: T;
}

export interface TournamentState<T extends TournamentFilm> {
  round: number;
  queue: Array<[T, T]>;
  winners: T[];
  history: Array<CompletedMatch<T>>;
  champion: T | null;
}

export function shuffle<T>(items: T[]): T[];
export function createTournament<T extends TournamentFilm>(items: T[], arrange?: (items: T[]) => T[]): TournamentState<T>;
export function chooseWinner<T extends TournamentFilm>(state: TournamentState<T>, winnerId: string, arrange?: (items: T[]) => T[]): TournamentState<T>;
