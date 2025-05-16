import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../strategies/jwt.strategy';

export const Auth = () => applyDecorators(UseGuards(JwtAuthGuard));
