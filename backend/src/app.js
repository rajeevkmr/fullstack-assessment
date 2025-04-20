import express, { json } from 'express';
import routes from './routes/index.js';
import connectDB from './config/db.js';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(json());

// connect to DB
connectDB();

// Routes
app.use('/api', routes);

export default app;
