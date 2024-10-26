import express from 'express';
import imagesRouter from './api/images';
import uploadRouter from './api/upload';

const router = express.Router();

router.use('/api/images', imagesRouter);
router.use('/api/upload', uploadRouter);

router.get('/', (req, res) => {
  res.send(`
    <h2>Welcome to this app</h2>
    <p>Listening at <code><a href="/api/images">/api/images</a></code> for queries containing at least a valid filename. Optionally use both width and height to set the size...</p>
    <p>Examples:
      <ul>
        <li><a href="/api/images?filename=fjord">/api/images?filename=fjord</a></li>
        <li><a href="/api/images?filename=fjord&width=100&height=100">/api/images?filename=fjord&width=100&height=100</a></li>
      </ul>
    </p>
  `);
});

export default router;
