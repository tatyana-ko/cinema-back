import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MovieService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		const movies = await this.prisma.movie.findMany();

		return movies;
	}

	async getById(id: string) {
		const movie = await this.prisma.movie.findUnique({ where: { id } });

		if (!movie) throw new NotFoundException('Movie not found');

		return movie;
	}

	async getBySlug(slug: string) {
		const movie = await this.prisma.movie.findUnique({ where: { slug } });

		if (!movie) throw new NotFoundException('Movie not found');

		return movie;
	}
}
