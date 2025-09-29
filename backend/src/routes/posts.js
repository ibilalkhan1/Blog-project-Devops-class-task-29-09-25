import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.get('/', async (_req, res) => {
  const { rows } = await pool.query('SELECT id, title, body, created_at FROM posts ORDER BY created_at DESC');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'title and body are required' });
  const { rows } = await pool.query(
    'INSERT INTO posts (title, body) VALUES ($1, $2) RETURNING id, title, body, created_at',
    [title, body]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const { rowCount, rows } = await pool.query(
    'UPDATE posts SET title = COALESCE($1, title), body = COALESCE($2, body) WHERE id = $3 RETURNING id, title, body, created_at',
    [title ?? null, body ?? null, id]
  );
  if (!rowCount) return res.status(404).json({ error: 'not found' });
  res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
  if (!rowCount) return res.status(404).json({ error: 'not found' });
  res.status(204).send();
});

export default router;
