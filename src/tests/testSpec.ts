import { promises as fs } from 'fs';
import path from 'path';
import File from '../fileHandler';


const thumbPath = File.imagesThumbPath;


describe('Image Processing Tests using Sharp Library', () => {
  it('should raise an error for invalid width value', async () => {
    const error = await File.createThumb({
      filename: 'doesntexist',
      width: '-100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('should raise an error for non-existent filename', async () => {
    const error = await File.createThumb({
      filename: 'nonexistent',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('should successfully create resized thumbnail for valid inputs', async () => {
    const filename = 'fjord';
    const width = '150';
    const height = '165';

    await File.createThumb({
      filename,
      width,
      height
    });

    const resizedImagePath = path.resolve(
      thumbPath,
      `${filename}-${width}x${height}.jpg`
    );
    let errorFile = null;

    try {
      await fs.access(resizedImagePath);
    } catch {
      errorFile = 'Error: File was not created';
    }

    expect(errorFile).toBeNull();
  });
});

afterAll(async () => {
  const filename = 'fjord';
  const width = '150';
  const height = '165';
  const resizedImagePath = path.resolve(
    thumbPath,
    `${filename}-${width}x${height}.jpg`
  );

  try {
    await fs.unlink(resizedImagePath);
  } catch (err) {
    console.error('Cleanup error:', err);
  }
});
