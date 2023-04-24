// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import { authRoutes, userRoutes, homeRoutes } from './routes/index.js';
import config from './config.js';
import { isAuthenticated } from './middleware/auth.js';
import { authenticate } from './middleware/auth.js';

const app = express();
const { paths, viewEngine, bodyParser } = config;

app.use(express.static(paths.public));
app.set('views', paths.views);
app.set('view engine', viewEngine);
app.use(express.urlencoded(bodyParser));
app.use(express.json());
app.use(cookieParser());

app.use(authenticate);

app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/user', isAuthenticated, userRoutes);

export default app;
