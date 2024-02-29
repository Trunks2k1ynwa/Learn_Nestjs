import { registerAs } from '@nestjs/config';

export default registerAs('cat', () => ({
  test_env: process.env.DB_CAT,
  port_cat: process.env.PORT_CAT,
}));
