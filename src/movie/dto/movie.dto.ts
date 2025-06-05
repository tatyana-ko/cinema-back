import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
	@IsString()
	slug: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsArray()
	genres: string[];

	@IsArray()
	actors: string[];

	@IsNumber()
	year: number;

	@IsString()
	country: string;

	@IsNumber()
	rating: number;

	@IsString()
	poster: string;

	@IsString()
	bigPoster: string;

	@IsString()
	videoUrl: string;
}

export type UpdateMovieDto = Partial<CreateMovieDto>;
