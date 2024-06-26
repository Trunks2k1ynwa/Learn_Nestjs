import { Module } from '@nestjs/common';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';

@Module({
  controllers: [SocketController],
  providers: [SocketService],
})
export class SocketModule {}
