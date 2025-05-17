import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllUsers() {
		return await this.prisma.user.findMany();
	}

	async byId(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});

		if (!user) throw new NotFoundException('User not found');

		return user;
	}

	async updateProfile(id: string, dto: UpdateUserDto) {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});

		if (!user) throw new NotFoundException('User not found');

		if (dto.email) {
			const isSameUser = await this.prisma.user.findUnique({
				where: { email: dto.email },
			});

			if (isSameUser && String(id) !== String(isSameUser.id))
				throw new NotFoundException('Email already exist');
		}

		if (dto.password) {
			const hashPassword = await hash(dto.password, 10);
			user.password = hashPassword;
		}

		return this.prisma.user.update({
			where: { id },
			data: {
				password: user.password,
				...dto,
			},
		});
	}

	async delete(id: string) {
		return await this.prisma.user.delete({
			where: { id },
		});
	}
}
