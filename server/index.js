import express from 'express';
import cors from 'cors';
import wishesRouter from './routes/wishes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/wishes', wishesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});