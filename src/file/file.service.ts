import { Injectable } from '@nestjs/common';
import { IFileResponse } from './file.interface';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FileService {
	async saveFiles(file: Express.Multer.File, folder: string = 'default'): Promise<IFileResponse> {
		const uploadFolder = `${path}/uploads/${folder}`;

		await ensureDir(uploadFolder);

		const filePath = `${uploadFolder}/${file.originalname}`;
		await writeFile(filePath, file.buffer);

		return {
			url: `/uploads/${folder}/${file.originalname}`,
			name: file.originalname,
		};
	}
}
