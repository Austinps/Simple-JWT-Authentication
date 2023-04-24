// server.js
import app from './app';
import connectDB from './dbConnect';

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
