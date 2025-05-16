import type { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = (configService: ConfigService): JwtModuleOptions => ({
	secret: configService.get('JWT_SECRET'),
});
