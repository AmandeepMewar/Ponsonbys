import app from './src/app.js';
import { connectDB } from './src/db/connectDB.js';

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
