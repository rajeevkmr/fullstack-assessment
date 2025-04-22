import { mongoose } from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log('Database connected successfully');
      })
      .catch((error) => {
        console.error('There is some error in DB connection:', error);
      });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
