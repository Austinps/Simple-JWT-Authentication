// server.js
import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/db/dbConnect.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) =>
    console.log('Error connecting to MongoDB: ', error.message)
  );
