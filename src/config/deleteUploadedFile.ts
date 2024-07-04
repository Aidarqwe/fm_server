import fs from 'fs';

export function deleteUploadedFile(file: Express.Multer.File | undefined): void {
    if (file) {
        fs.unlinkSync(file.path);
    }
}