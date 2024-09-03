import mongoose from 'mongoose';

export async function connectDB() {
  const DB_URL = process.env.MONGODB_URI.replace(
    '<PASSWORD>',
    process.env.MONGODB_PASSWORD
  );

  try {
    const connection = await mongoose.connect(DB_URL);

    if (connection) {
      console.log('MongoDB connection successful!!');
    }
  } catch (error) {
    console.log('MongoDB connection failed!! ', error);
    process.exit(1);
  }
}
