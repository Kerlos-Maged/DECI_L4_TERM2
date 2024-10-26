import { promises as fs } from 'fs';
import path from 'path';
import imageProcessor from './imgResizing';

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

export default class FileHandler {
  private static readonly imagesFullPath = path.resolve(
    __dirname,
    '../assets/images/full'
  );
  static readonly imagesThumbPath = path.resolve(
    __dirname,
    '../assets/images/thumb'
  );

  static async getImagePath(params: ImageQuery): Promise<string | null> {
    if (!params.filename) return null;
    const filee =
      params.width && params.height
        ? path.resolve(
            FileHandler.imagesThumbPath,
            params.filename + "-" + params.width + "x" + params.height + ".jpg"
          )
        : path.resolve(FileHandler.imagesFullPath, params.filename + `.jpg`);

    try {
      await fs.access(filee);
      return filee;
    } catch {
      return null;
    }
  }


  static async getAvailableImageNames(): Promise<string[]> {
    try {
      const files = await fs.readdir(FileHandler.imagesFullPath);
      return files.map(file => path.parse(file).name);
    } catch {
      return [];
    }
  }

  static async isThumbAvailable(params: ImageQuery): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) return false;

    const thumbPath = path.resolve(
      FileHandler.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(thumbPath);
      return true;
    } catch {
      return false;
    }
  }
  static async isImageAvailable(filename = ''): Promise<boolean> {
    if (!filename) return false;

    try {
      const files = await fs.readdir(FileHandler.imagesFullPath);
      return files.some(file => path.parse(file).name === filename);
    } catch {
      return false;
    }
  }

  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(FileHandler.imagesThumbPath);
    } catch {
      await fs.mkdir(FileHandler.imagesThumbPath, { recursive: true });
    }
  }

  static async createThumb(params: ImageQuery): Promise<string | null> {
    if (!params.filename || !params.width || !params.height) return null;

    const fullImagePath = path.resolve(
      FileHandler.imagesFullPath,
      `${params.filename}.jpg`
    );
    const thumbImagePath = path.resolve(
      FileHandler.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await imageProcessor(
        fullImagePath,
        thumbImagePath,
        parseInt(params.width),
        parseInt(params.height)
      );
      return null;
    } catch (error) {
      return error.message;
    }
  }
}
