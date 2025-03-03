import pool from '../config/db.js';

export const getAllWishes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM wishes ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createWish = async (req, res) => {
  const { content } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO wishes (content) VALUES (?)',
      [content]
    );
    res.status(201).json({ id: result.insertId, content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRandomWish = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM wishes ORDER BY RAND() LIMIT 1');
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};