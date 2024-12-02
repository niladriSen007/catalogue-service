import config from 'config';

const NODE_ENV: string = config.get('server.NODE_ENV') ?? 'development';
const PORT: number = config.get('server.PORT') ?? 5001;
const MONGO_URI: string = config.get('database.URL');
const JWKS_URI: string = config.get('auth.JWKS_URI');

export const Config = { NODE_ENV, PORT, MONGO_URI,JWKS_URI };
