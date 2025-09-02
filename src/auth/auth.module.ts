import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserModelSheme } from './user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { getJWTConfig } from '../configs/jwt.config';

@Module({
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([{ name: UserModel.name, schema: UserModelSheme }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJWTConfig,
        }),
        ConfigModule,
        PassportModule,
    ],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
