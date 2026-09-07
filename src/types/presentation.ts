export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  poster: string;
  accentColor: string;
  trueLatentScore: number; // ground truth latent preference score (theta)
  initialElo: number;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  mathSnippet?: string;
  speakerNotes: string[];
}

export interface MatchNode {
  id: string;
  round: number;
  movieA: Movie;
  movieB: Movie;
  winner?: Movie;
  votesA: number;
  votesB: number;
  completed: boolean;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
  progress: number;
  speed: number;
}
