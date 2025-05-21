import { IsString } from 'class-validator';

export class CreateGenreDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsString()
	slug: string;
}

export type UpdateGenreDto = Partial<CreateGenreDto>;
