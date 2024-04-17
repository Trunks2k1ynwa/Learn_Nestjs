import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'WE KEEP THIS LOVE IN A PHOTOGRAPH',
};
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const saltPassword = 10;
