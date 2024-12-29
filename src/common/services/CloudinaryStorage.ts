import { v2 as cloudinary } from 'cloudinary';
import { FileStorage, ImageFileData } from '../types/storage';
import { UploadedFile } from 'express-fileupload';
import { Config } from '../../config';

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: Config.CLOUDINARY_CLOUD_NAME,
    api_key:Config.CLOUDINARY_API_KEY,
    api_secret: Config.CLOUDINARY_API_SECRET,
});

export class CloudinaryStorage implements FileStorage {
    // Method to upload an image
    async uploadFile(file: UploadedFile): Promise<string> {
        try {
             const b64 = Buffer.from(file.data).toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;
            const result = await cloudinary.uploader.upload(dataURI);
            return result.secure_url; // Return the secure URL of the uploaded image
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw new Error('Image upload failed');
        }
    }

    async deleteFile(fileName: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(fileName);
        } catch (error) {
            console.error('Error deleting image from Cloudinary:', error);
            throw new Error('Image deletion failed');
        }
    }

    getObjectUri(fileName: string): string {
        return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${fileName}`;
    }
}