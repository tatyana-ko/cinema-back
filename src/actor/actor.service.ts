import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ActorDto } from './dto/actor.dto';

@Injectable()
export class ActorService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		const actors = await this.prisma.actor.findMany();

		if (!actors) throw new NotFoundException('Actors not found');

		return actors;
	}

	async getById(id: string) {
		const actor = await this.prisma.actor.findUnique({
			where: { id },
		});

		if (!actor) throw new NotFoundException('Can not found actor');

		return actor;
	}

	async getBySlug(slug: string) {
		const actor = await this.prisma.actor.findUnique({
			where: { slug },
		});

		if (!actor) throw new NotFoundException('Can not found actor');

		return actor;
	}

	async create(dto: ActorDto) {
		const actor = await this.prisma.actor.create({
			data: {
				name: dto.name,
				slug: dto.slug,
				photo: dto.photo,
			},
		});

		return actor;
	}

	async update(id: string, dto: ActorDto) {
		const { name, slug, photo } = dto;

		const actorToUpdate = await this.prisma.actor.findUnique({
			where: { id },
		});

		if (!actorToUpdate) throw new NotFoundException('Actor not found');

		const updateActor = await this.prisma.actor.update({
			where: { id },
			data: {
				name,
				photo,
				slug,
			},
		});

		return updateActor;
	}

	async delete(id: string) {
		const actor = await this.prisma.actor.findUnique({
			where: { id },
		});

		if (!actor) throw new NotFoundException('Actor not found');

		await this.prisma.actor.delete({
			where: { id },
		});

		return { message: 'Actor deleted' };
	}
}
