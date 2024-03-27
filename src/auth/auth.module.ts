import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountModule } from 'src/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';

@Module({
  imports: [
    AccountModule,
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      global: true,
      // secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
