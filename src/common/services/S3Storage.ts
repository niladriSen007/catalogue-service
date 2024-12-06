import { Config } from '../../config';
import { FileStorage, ImageFileData } from '../types/storage';
import { DeleteObjectCommand, DeleteObjectCommandInput, PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
export class S3Storage implements FileStorage {
    private readonly s3Client: S3Client;
    constructor() {
        this.s3Client = new S3Client({
            region: Config.AWS_REGION,
            credentials: {
                accessKeyId: Config.USER_PUBLIC_ACCESS_KEY,
                secretAccessKey: Config.USER_SECRET_ACCESS_KEY,
            },
        });
    }
    async uploadFile(file: ImageFileData): Promise<string> {
        const params : PutObjectCommandInput = {
            Bucket: Config.S3_BUCKET_NAME,
            Key: file.fileName,
            Body: new Uint8Array(file.fileData),
            ContentType: 'image/webp',
            
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
         await this.s3Client.send(new PutObjectCommand(params));
        return this.getObjectUri(file.fileName);
        
    };
    deleteFile = async (fileName: string): Promise<void> => {
          const params : DeleteObjectCommandInput = {
            Bucket: Config.S3_BUCKET_NAME,
            Key: fileName,
            
        };
        await this.s3Client.send(new DeleteObjectCommand(params));
    };
    getObjectUri = (fileName: string): string => {
        return `https://${Config.S3_BUCKET_NAME}.s3.${Config.AWS_REGION}.amazonaws.com/${fileName}`;
    };
}
