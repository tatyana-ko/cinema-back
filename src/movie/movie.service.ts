import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMovieDto } from './dto/movie.dto';

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

	async create(dto: CreateMovieDto) {
		const {
			title,
			slug,
			description,
			year,
			country,
			rating,
			poster,
			bigPoster,
			videoUrl,
			genres,
			actors,
		} = dto;

		const movie = await this.prisma.movie.create({
			data: {
				title: title,
				slug: slug,
				description: description,
				year: year,
				country: country,
				rating: rating,
				poster: poster,
				bigPoster: bigPoster,
				videoUrl: videoUrl,
				genres: { connect: genres.map(id => ({ id })) },
				actors: { connect: actors.map(id => ({ id })) },
			},
			include: {
				genres: {
					select: { id: true, title: true },
				},
				actors: {
					select: { id: true, name: true },
				},
			},
		});

		return movie;
	}
}
