import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import postsRouter from './routes/posts.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? '*' }));

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      body  TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

app.get('/healthz', (_req, res) => res.json({ ok: true }));
app.use('/api/posts', postsRouter);

const port = process.env.PORT || 4000;
migrate().then(() => {
  app.listen(port, () => console.log(`API listening on :${port}`));
});
