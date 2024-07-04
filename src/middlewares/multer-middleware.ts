import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const accountId = req.body.account_id;
        const dateSuffix = `${Date.now()}${path.extname(file.originalname)}`;

        let filenamePrefix = accountId;
        if (file.fieldname === 'photo_path') {
            filenamePrefix += '-photos';
        } else if (file.fieldname === 'selfie_path') {
            filenamePrefix += '-selfie';
        }

        const uniqueSuffix = `${filenamePrefix}-${dateSuffix}`;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

export default upload;
