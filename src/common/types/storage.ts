export interface ImageFileData {
    fileName: string;
    fileData: ArrayBuffer;
}

export interface FileStorage {
    uploadFile(file: ImageFileData): Promise<string>;
    deleteFile(fileName: string): Promise<void>;
    getObjectUri(fileName: string): string;
}
