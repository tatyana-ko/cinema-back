import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

interface IRequestUser {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
}

type TypeData = keyof IRequestUser;

export const User = createParamDecorator((data: TypeData, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest<{ user?: IRequestUser }>();

	const user = request?.user as IRequestUser;

	return data ? user?.[data] : user;
});
