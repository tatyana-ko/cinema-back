import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { JwtPayload } from 'src/types/jwt.type';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
	) {}

	private readonly TOKEN_EXPIRATION_ACCESS = '1h';
	private readonly TOKEN_EXPIRATION_REFRESH = '7d';

	private async issueTokens(userId: string) {
		const payload = { id: userId };

		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.TOKEN_EXPIRATION_ACCESS,
		});

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.TOKEN_EXPIRATION_REFRESH,
		});

		return { accessToken, refreshToken };
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});

		if (!user) throw new UnauthorizedException('Invalid email');

		const isValidPassword = await compare(dto.password, user.password);

		if (!isValidPassword) throw new UnauthorizedException('Invalid password');

		return user;
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto);

		return this.buildResponseObject(user);
	}

	async register(dto: AuthDto) {
		const existingUser = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});

		if (existingUser) throw new BadRequestException('A user with this email already exists!');

		const newUser = await this.prisma.user.create({
			data: {
				...dto,
				password: await hash(dto.password, 10),
			},
		});

		return this.buildResponseObject(newUser);
	}

	async buildResponseObject(user: Omit<User, 'password'>) {
		const tokens = await this.issueTokens(user.id);
		return { user, ...tokens };
	}

	async getNewTokens(refreshToken: string) {
		const result: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

		if (!result) throw new UnauthorizedException('Invalid token');

		const user = await this.prisma.user.findUnique({
			where: { id: result.id },
		});

		if (!user) throw new UnauthorizedException('User not found');

		return this.buildResponseObject(user);
	}
}
