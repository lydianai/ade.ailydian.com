import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator to extract user from request
 * Usage: @User() user: UserPayload
 */
export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);

/**
 * User payload interface from JWT
 */
export interface UserPayload {
  sub: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}
