import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/movie.dto';

@Controller('movies')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get()
	async getAll() {
		return this.movieService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.movieService.getById(id);
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.movieService.getBySlug(slug);
	}

	@Post()
	async createMovie(@Body() dto: CreateMovieDto) {
		return this.movieService.create(dto);
	}
}
