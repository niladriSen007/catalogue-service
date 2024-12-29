import config from 'config';

const NODE_ENV: string = config.get('server.NODE_ENV') ?? 'development';
const PORT: number = config.get('server.PORT') ?? 5001;
const MONGO_URI: string = config.get('database.URL');
const JWKS_URI: string = config.get('auth.JWKS_URI');
const USER_PUBLIC_ACCESS_KEY: string = config.get('aws.USER_PUBLIC_ACCESS_KEY');
const USER_SECRET_ACCESS_KEY: string = config.get('aws.USER_SECRET_ACCESS_KEY');
const AWS_REGION: string = config.get('aws.AWS_REGION');
const S3_BUCKET_NAME: string = config.get('aws.S3_BUCKET_NAME');
const CLOUDINARY_API_KEY: string = config.get('cloudinary.CLOUDINARY_API_KEY');
const CLOUDINARY_CLOUD_NAME: string = config.get(
    'cloudinary.CLOUDINARY_CLOUD_NAME',
);
const CLOUDINARY_API_SECRET: string = config.get(
    'cloudinary.CLOUDINARY_API_SECRET',
);

export const Config = {
    NODE_ENV,
    PORT,
    MONGO_URI,
    JWKS_URI,
    USER_PUBLIC_ACCESS_KEY,
    USER_SECRET_ACCESS_KEY,
    AWS_REGION,
    S3_BUCKET_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_SECRET,
};
