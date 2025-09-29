const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function listPosts() {
  const res = await fetch(`${API_BASE}/api/posts`);
  return res.json();
}

export async function createPost(payload) {
  const res = await fetch(`${API_BASE}/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to create');
  return res.json();
}

export async function updatePost(id, payload) {
  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update');
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API_BASE}/api/posts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete');
}
