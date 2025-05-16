import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from 'src/configs/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
})
export class AuthModule {}
