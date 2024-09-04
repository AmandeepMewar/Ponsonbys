import dotenv from 'dotenv';
import app from './src/app.js';
import { connectDB } from './src/db/connectDB.js';

dotenv.config({ path: './config.env' });
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
