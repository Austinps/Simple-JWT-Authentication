// config.js
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  paths: {
    public: path.join(__dirname, 'public'),
    views: path.join(__dirname, 'views'),
    uploads: path.join(__dirname, 'uploads'),
  },
  viewEngine: 'ejs',
  bodyParser: {
    extended: true,
  },
};
