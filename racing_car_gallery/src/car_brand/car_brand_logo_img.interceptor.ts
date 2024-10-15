import { BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from 'uuid';

export function CarBrandLogoImgFileInterceptor() {
    return FileInterceptor('logo_img', {
        storage: diskStorage({
            destination: (req, file, callback) => {
                const uploadPath = './uploads';
                // Check if the upload path exists, and create it if it doesn't
                if (!existsSync(uploadPath)) {
                    mkdirSync(uploadPath);
                }

                const uploadPathLvl2 = './uploads/car_brand_img';
                // Check if the upload path exists, and create it if it doesn't
                if (!existsSync(uploadPathLvl2)) {
                    mkdirSync(uploadPathLvl2);
                }
                callback(null, uploadPathLvl2);
            },
            filename: (req, file, cb) => {
                // Generate a unique filename
                const randomName = uuidv4();
                cb(null, `${randomName}${extname(file.originalname)}`);
            },

        }),
        limits: {
            fileSize: 5 * 1024 * 1024, // 5 MB limit (size in bytes)
        },
        fileFilter: (req, file, callback) => {
            // Allowed file types: e.g., images (jpg, png, gif)
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (allowedMimeTypes.includes(file.mimetype)) {
                callback(null, true); // Accept the file
            } else {
                callback(new BadRequestException('Invalid file type'), false); // Reject the file
            }
        },
    }
    );
}