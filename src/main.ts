import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.enableCors({
		origin: ['http://localhost:3000'],
		credentials: true,
		exposedHeaders: 'set-cookie',
	});

	await app.listen(4200);
}

bootstrap().catch(error => {
	Logger.error('Bootstrap failed', (error as Error).stack || error);
	process.exit(1);
});
