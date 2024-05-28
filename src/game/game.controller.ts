// src/game/game.controller.ts

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GameService } from './game.service';
import { GameState, Player } from './game.entity';
import { RegisterPlayerDto } from './dto/register-player.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('state')
  getGameState(): GameState {
    return this.gameService.getGameState();
  }

  @Get('players')
  getPlayers(): Player[] {
    return this.gameService.getPlayers();
  }

  @Post('move')
  makeMove(@Body() moveData: { playerId: string; position: number }): {
    gameState: GameState;
    message: string;
  } {
    return this.gameService.makeMove(moveData.playerId, moveData.position);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  registerPlayer(
    @Body() playerData: RegisterPlayerDto,
  ): Player | { message: string } {
    try {
      return this.gameService.registerPlayer(playerData.symbol);
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { message: error.message };
      }
      throw error;
    }
  }
}
