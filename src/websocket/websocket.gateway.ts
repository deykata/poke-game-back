import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ path: 'wrapper-poke/ws' })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(WebsocketGateway.name, true);
  battles = {};

  @WebSocketServer()
  server: Server

  handleDisconnect(client: Socket) {
    if (client.disconnected) {
      client.disconnect(true);
      client.leave(client.handshake.query?.id);
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit("battles", Object.keys(this.battles));
  }
  
  @SubscribeMessage('addBattle')
  handleMessage(client: any, battle: any) {
    console.log('YYYYYEEEEEEESSSSS')
    this.battles[battle.id] = battle;
    this.server.emit("battles", Object.keys(this.battles));
    client.emit("battle", battle);
  }
}
