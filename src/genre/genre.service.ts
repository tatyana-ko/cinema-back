import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGenreDto, UpdateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.genre.findMany();
	}

	async getById(id: string) {
		const genre = await this.prisma.genre.findUnique({
			where: { id },
		});

		if (!genre) throw new NotFoundException('Can not found genre');

		return genre;
	}

	async getBySlug(slug: string) {
		const genre = await this.prisma.genre.findUnique({
			where: { slug },
		});

		if (!genre) throw new NotFoundException('Can not found genre');

		return genre;
	}

	async create(dto: CreateGenreDto) {
		const genre = await this.prisma.genre.create({
			data: {
				title: dto.title,
				slug: dto.slug,
				description: dto.description,
			},
		});

		return genre;
	}

	async update(id: string, dto: UpdateGenreDto) {
		const { title, slug, description } = dto;

		const genreToUpdate = await this.prisma.genre.findUnique({
			where: { id },
		});

		if (!genreToUpdate) throw new NotFoundException('Genre not found');

		const updateGenre = await this.prisma.genre.update({
			where: { id },
			data: {
				title,
				description,
				slug,
			},
		});

		return updateGenre;
	}

	async delete(id: string) {
		const genreToUpdate = await this.prisma.genre.findUnique({
			where: { id },
		});

		if (!genreToUpdate) throw new NotFoundException('Genre not found');

		await this.prisma.genre.delete({
			where: { id },
		});

		return { message: 'Genre deleted' };
	}
}
