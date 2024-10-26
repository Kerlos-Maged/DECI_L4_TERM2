import sharp from 'sharp';
import path from 'path';
import { promises as fs } from 'fs';
interface SharpResizeParams {
  source: string;
  target: string;
  width: number;
  height: number;
}

const imageProcessor = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(inputPath)
    .resize(width, height)
    .toFormat('jpg')
    .toFile(outputPath);
};

export default imageProcessor;
