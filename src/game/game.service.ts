// src/game/game.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { GameState, Player } from './game.entity';

@Injectable()
export class GameService {
  private gameState: GameState;
  private players: Player[] = [];
  private playerCount = 0;

  constructor() {
    this.resetGame();
  }

  resetGame() {
    this.gameState = {
      board: Array(9).fill(null),
      currentPlayer: { id: '1', symbol: 'X' },
      winner: null,
      moves: [],
    };
    this.players = [];
    this.playerCount = 0;
  }

  registerPlayer(symbol: 'X' | 'O'): Player {
    if (this.players.length >= 2) {
      throw new BadRequestException(
        'Only two players can play the game at a time.',
      );
    }

    if (this.players.find((player) => player.symbol === symbol)) {
      throw new BadRequestException(
        `Player with symbol ${symbol} is already registered.`,
      );
    }

    const player: Player = { id: (++this.playerCount).toString(), symbol };
    this.players.push(player);
    return player;
  }

  makeMove(
    playerId: string,
    position: number,
  ): { gameState: GameState; message: string } {
    if (this.gameState.board[position] || this.gameState.winner) {
      return { gameState: this.gameState, message: 'Invalid move' };
    }

    const currentPlayer = this.players.find((player) => player.id === playerId);
    if (currentPlayer?.symbol !== this.gameState.currentPlayer.symbol) {
      return { gameState: this.gameState, message: 'Not your turn' };
    }

    this.gameState.board[position] = this.gameState.currentPlayer.symbol;
    this.gameState.moves.push({ playerId, position });

    if (this.checkWin()) {
      this.gameState.winner = this.gameState.currentPlayer;
      return {
        gameState: this.gameState,
        message: `Winner player ${this.gameState.currentPlayer.symbol}`,
      };
    } else {
      this.switchPlayer();
      return { gameState: this.gameState, message: 'Move accepted' };
    }
  }

  getGameState(): GameState {
    return this.gameState;
  }

  getPlayers(): Player[] {
    return this.players;
  }

  private switchPlayer() {
    this.gameState.currentPlayer =
      this.gameState.currentPlayer.symbol === 'X'
        ? this.players.find((player) => player.symbol === 'O')
        : this.players.find((player) => player.symbol === 'X');
  }

  private checkWin(): boolean {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return (
        this.gameState.board[a] &&
        this.gameState.board[a] === this.gameState.board[b] &&
        this.gameState.board[a] === this.gameState.board[c]
      );
    });
  }
}
