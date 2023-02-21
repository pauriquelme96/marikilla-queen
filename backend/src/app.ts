import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { ENV_NAME, PORT } from './env';
import { createUser, validateUser } from './entities/user/user';

const app = express();
app.use(compression());
app.use(express.json({ limit: '50mb' }));

if (ENV_NAME === 'local') {
  app.use(cors({ origin: true, credentials: true }));
  app.set('trust proxy', true);
}

app.get('/api', (req, res) => {
  console.log('enter in /api');
  res.send({ msg: 'Root' });
});

async function startup() {
  validateUser({
    name: 'pau',
    email: 'riquelme@gmail.com',
  });
}

app.listen(PORT, () => {
  console.log('-------------------');
  console.log('TIME:', new Date());
  console.log('ENV: ', ENV_NAME);
  console.log('PORT:', PORT);
  console.log('-------------------');
  //startup();
});
