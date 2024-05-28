export interface Player {
  id: string;
  symbol: 'X' | 'O';
}

export interface Move {
  playerId: string;
  position: number;
}

export interface GameState {
  board: string[];
  currentPlayer: Player;
  winner: Player | null;
  moves: Move[];
}
