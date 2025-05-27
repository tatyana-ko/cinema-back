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

	@IsString()
	year: string;

	@IsString()
	country: string;

	@IsNumber()
	rating: number;
}

export type UpdateMovieDto = Partial<CreateMovieDto>;
