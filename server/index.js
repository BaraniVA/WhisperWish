import express from 'express';
import cors from 'cors';
import wishesRouter from './routes/wishes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
app.use(cors({
  origin: '*',  // Allow all origins (or specify your frontend URL)
  methods: ['GET', 'POST', 'OPTIONS'], // Explicitly allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Ensure JSON requests pass
}));

// Handle preflight requests explicitly
app.options('*', cors());

app.use(express.json());

app.use('/wishes', wishesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
