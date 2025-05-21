import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto, UpdateGenreDto } from './dto/create-genre.dto';

@Controller('genres')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get()
	async getAll() {
		return await this.genreService.getAll();
	}

	@Get(':id')
	async getGenre(@Param('id') id: string) {
		return await this.genreService.getById(id);
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return await this.genreService.getBySlug(slug);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	async createGenre(@Body() dto: CreateGenreDto) {
		return await this.genreService.create(dto);
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	async updateGenre(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
		return await this.genreService.update(id, dto);
	}

	@Delete(':id')
	async deleteGenre(@Param('id') id: string) {
		return await this.genreService.delete(id);
	}
}
