import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  battles = {};

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('addBattle')
  handleAddBattle(client: any, battle: any) {
    console.log(battle)
    this.battles[battle.id] = battle;
    this.server.emit("battles", Object.keys(this.battles));
    client.emit("battle", battle);
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    console.log(12312312)
    this.logger.log(`Client connected: 12312312`);
    return data;
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(`Client disconnected: ${client.id}`);
  }

  // safeJoin(client, currentId) {
  //   client.leave(previousId);
  //   client.join(currentId, () => console.log(`Socket ${client.id} joined room ${currentId}`));
  //   previousId = currentId;
  // }

  handleConnection(client: Socket, ...args: any[]) {
    let previousId;
    this.logger.log(`Client connected: ${client.id}`);

    // Room security
    const safeJoin = currentId => {
      
    };

    // GET SINGLE BATTLE
    client.on("getBattle", battleId => {
      safeJoin(battleId);
      client.emit("battle", this.battles[battleId]);
    });

    // CREATE NEW BATTLE
    client.on("addBattle", battle => {
      console.log('YYYYYEEEEEEESSSSS')
      this.battles[battle.id] = battle;
      safeJoin(battle.id);
      this.server.emit("battles", Object.keys(this.battles));
      client.emit("battle", battle);
    });

    client.on("updateBattle", battle => {
      this.battles[battle.id] = battle;
      client.to(battle.id).emit("battle", battle);
    });

    // GET CURRENT BATTLES
    this.server.emit("battles", Object.keys(this.battles));

    // console.log(`Socket ${client.id} has connected`);
  }
}
