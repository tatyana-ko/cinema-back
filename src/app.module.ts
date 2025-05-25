import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import { FileModule } from './file/file.module';
import { ActorModule } from './actor/actor.module';
import { MovieModule } from './movie/movie.module';

@Module({
	imports: [AuthModule, UserModule, GenreModule, FileModule, ActorModule, MovieModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
