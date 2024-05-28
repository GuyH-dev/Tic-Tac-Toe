import { Server, Socket } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { GameService } from './game.service';

@WebSocketGateway()
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameService: GameService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('move')
  handleMove(@MessageBody() data: { playerId: string; position: number }) {
    const gameState = this.gameService.makeMove(data.playerId, data.position);
    this.server.emit('gameState', gameState);
  }
}
