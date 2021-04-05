import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(+process.env.PORT || 4444)
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  rooms = [];

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger(AppGateway.name, true);

  afterInit() {
    this.logger.log('Init');
  }

  @SubscribeMessage('addRoom')
  handleAddBattle(client: Socket, room: any) {
    this.rooms.push({...room, socketId: client.id});
    this.server.emit('rooms', this.rooms);
    client.emit('room', room);
    this.logger.log(`New room created: ${room}`);
  }

  @SubscribeMessage('newChallenge')
  handleNewChallenge(client: Socket, data: any) {
    let selectedRoom;
    this.rooms.map(room => {
      if (room.id === data.playerId) {
        selectedRoom = room;
        room.available = false;
      }
      if (room.roomPlayer === data.challenger) {
        room.available = false;
      }
    })
    this.server.emit('rooms', this.rooms);
    this.logger.log(`New challenge send: ${data.challenger}`);
    client.to(selectedRoom.socketId).emit('receiveChallenge', data.challenger);
  }

  @SubscribeMessage('respondChallenge')
  handleRespondChallenge(client: Socket, data: any) {
    let newBattle = [];
    let toBeRemoved = [];
    this.rooms.map((room, i) => {
      if (data.result == false) {
        if (room.roomPlayer === data.challenger || room.roomPlayer === data.player) {
          room.available = true;
        }
      }
      if (data.result == true) {
        if (room.roomPlayer === data.challenger || room.roomPlayer === data.player) {
          newBattle.push(room.socketId);
          toBeRemoved.push(i);
        }
      }
    })
    if (newBattle.length) {
      this.rooms = this.rooms.filter((_room, i) => i !== toBeRemoved[i]);
      const joinedBattle = newBattle.join('_--_');
      newBattle.forEach(socket => {
        this.server.sockets.connected[socket].join(joinedBattle);
      })
      this.server.sockets.in(joinedBattle).emit('startBattle', joinedBattle);
      this.logger.log(`New challenge accepted: ${joinedBattle}`);
    }
    this.server.emit('rooms', this.rooms);
  }

  @SubscribeMessage('updateBattle')
  handleUpdateBattle(client: Socket, payload) {
    this.logger.log(`Update battle: ${payload.room}`);
    client.broadcast.to(payload.room).emit('ongoingBattle', payload.data);
  }

  @SubscribeMessage('endBattle')
  handleEndBattle(client: Socket, battle) {
    this.logger.log(`End battle: ${battle}`);
    this.server.sockets.sockets[client.id].leave(battle);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const roomToRemove = this.rooms.findIndex(room => room.socketId === client.id);
    this.rooms.splice(roomToRemove, 1);
    this.server.emit('rooms', this.rooms);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('rooms', this.rooms);
  }

}
