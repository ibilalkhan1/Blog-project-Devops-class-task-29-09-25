import React, { useEffect, useState } from 'react'
import { listPosts, createPost, deletePost } from './api'

export default function App() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    try {
      setLoading(true)
      setPosts(await listPosts())
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function onCreate(e) {
    e.preventDefault()
    if (!title || !body) return
    await createPost({ title, body })
    setTitle(''); setBody('')
    load()
  }

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>Blog</h1>
      <form onSubmit={onCreate} style={{ display: 'grid', gap: 8 }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} rows={5} />
        <button type="submit">Publish</button>
      </form>

      <hr />
      {loading ? <p>Loading…</p> : error ? <p style={{color:'crimson'}}>{error}</p> : (
        posts.length ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map(p => (
              <li key={p.id} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
                <h3 style={{ margin: '0 0 6px' }}>{p.title}</h3>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{p.body}</p>
                <small>{new Date(p.created_at).toLocaleString()}</small>
                <div>
                  <button onClick={() => { deletePost(p.id).then(load) }}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : <p>No posts yet. Create one above.</p>
      )}
    </div>
  )
}
