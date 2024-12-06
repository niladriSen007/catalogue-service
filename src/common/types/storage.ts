export interface ImageFileData {
    fileName: string;
    fileData: ArrayBuffer;
}

export interface FileStorage {
    uploadFile(file: ImageFileData): Promise<string>;
    deleteFile(fileName: string): void;
    getObjectUri(fileName: string): string;
}
