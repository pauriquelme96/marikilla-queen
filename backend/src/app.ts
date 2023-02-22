import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { ENV_NAME, PORT } from './env';
import { validateUser } from './entities/user/user';

import { LoginResponse } from 'models/LoginResponse';
import { Res } from 'models/Res';

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

app.post('/api/login', (req, res) => {
  const payload: Res<LoginResponse> = {
    ok: true,
    message: {
      token: {
        status: 'valid',
        msgs: [],
      },
      email: {
        status: 'valid',
        msgs: [],
      },
      name: {
        status: 'valid',
        msgs: [{ code: 0, content: 'asd' }],
      },
    },
    payload: {
      token: '897qeqjhr3mnr2',
      email: 'pau@keteden.com',
      name: 'Pau Riquelme',
    },
  };

  res.send(payload);
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
