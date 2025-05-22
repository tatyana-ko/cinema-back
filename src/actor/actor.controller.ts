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
import { ActorService } from './actor.service';
import { ActorDto } from './dto/actor.dto';

@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get()
	async getAll() {
		return await this.actorService.getAll();
	}

	@Get(':id')
	async getActorById(@Param('id') id: string) {
		return await this.actorService.getById(id);
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return await this.actorService.getBySlug(slug);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	async createActor(@Body() dto: ActorDto) {
		return await this.actorService.create(dto);
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	async updateActor(@Param('id') id: string, @Body() dto: ActorDto) {
		return await this.actorService.update(id, dto);
	}

	@Delete(':id')
	async deleteActor(@Param('id') id: string) {
		return await this.actorService.delete(id);
	}
}
