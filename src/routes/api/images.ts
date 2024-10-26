import express from 'express';
import File from '../../fileHandler';

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

const validateQuery = async (query: ImageQuery): Promise<null | string> => {
  if (!query.width && !query.height) return null;

  const width = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "Please provide a positive numerical value for the 'width' query parameter.";
  }

  const height = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "Please provide a positive numerical value for the 'height' query parameter.";
  }

  return null;
};

const imagesRouter = express.Router();

imagesRouter.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const validationError = await validateQuery(req.query);
    if (validationError) {
      res.status(200).send(validationError);
      return;
    }

    let error: null | string = null;

    if (!(await File.isThumbAvailable(req.query))) {
      error = await File.createThumb(req.query);
    }

    if (error) {
      res.status(200).send(error);
      return;
    }

    const imagePath = await File.getImagePath(req.query);
    if (imagePath) {
      res.sendFile(imagePath);
    } else {
      res.status(200).send('An error occurred while processing your request.');
    }
  }
);

imagesRouter.get(
  '/list',
  async (req: express.Request, res: express.Response) => {
    try {
      const imageNames = await File.getAvailableImageNames();
      res.json(imageNames);
    } catch (error) {
      res.status(200).send('An error occurred while fetching the image list.');
    }
  }
);

export default imagesRouter;
