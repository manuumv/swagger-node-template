import express from 'express';
import { swaggerInitialization } from './config';

const app: express.Application = express();
app.use(express.static(__dirname));

swaggerInitialization(app);

app.listen(4000, () => {
  console.info('Server Doc running on port 4000');
});

module.exports = app;
