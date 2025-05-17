import { Body, Controller, Delete, Get, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@User('id') id: string) {
		return this.userService.byId(id);
	}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@Auth()
	async updateProfile(@User('id') id: string, @Body() dto: UpdateUserDto) {
		return this.userService.updateProfile(id, dto);
	}

	@Delete('profile')
	@Auth()
	async deleteUser(@User('id') id: string) {
		return this.userService.delete(id);
	}
}
