import express from 'express';
import routes from './routes/index';
import path from 'path';

const app: express.Application = express();
const port: number = 3000;
const publicPath: string = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));
app.use(routes);


app.listen(port, () => {
  const url: string = `http://localhost:${port}`;
  console.log(`Server is running at ${url}`);
});

export default app;
