import { UploadedFile } from "express-fileupload";

export interface ImageFileData {
    fileName: string;
    fileData: ArrayBuffer;
}

export interface CloudinaryUploadType{
    name: string
    data: ArrayBuffer
    size: number,
    encoding: string,
    tempFilePath: string,
    truncated: boolean,
    mimetype: string,
    md5: string,
}

export interface FileStorage {
    uploadFile(file: UploadedFile): Promise<string>;
    deleteFile(fileName: string): Promise<void>;
    getObjectUri(fileName: string): string;
}
