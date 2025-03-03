import express from 'express';
import { getAllWishes, createWish, getRandomWish } from '../controllers/wishController.js';

const router = express.Router();

router.get('/', getAllWishes);
router.post('/', createWish);
router.get('/random', getRandomWish);

export default router;