// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import { authRoutes, userRoutes } from './routes';
import { paths, viewEngine, bodyParser } from './config.js';

import { authenticate } from './middleware/auth.js';

const app = express();

app.use(express.static(paths.public));
app.set('views', paths.views);
app.set('view engine', viewEngine);
app.use(express.urlencoded(bodyParser));
app.use(express.json());
app.use(cookieParser());

app.use(authenticate);

app.use('/', (req, res) => {
  res.render('index', { token: res.locals.token });
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

export default app;
