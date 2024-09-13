import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const PORT = process.env.PORT || 3000;