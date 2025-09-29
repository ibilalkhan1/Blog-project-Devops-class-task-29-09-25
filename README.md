# Blog Project — DevOps Class Task (Full-Stack + Docker + Compose)

A tiny full-stack blog to demonstrate **GitHub workflow**, **containerization** with **Docker**, and **multi-container orchestration** with **Docker Compose**.  
Stack: **React (Vite) + Node.js/Express + PostgreSQL**.

---

## 🏁 Quick Start

```bash
git clone https://github.com/ibilalkhan1/Blog-project-Devops-class-task-29-09-25.git
cd Blog-project-Devops-class-task-29-09-25
cp .env.example .env
docker compose up -d --build

---

## 📍 Ports
- Frontend: http://localhost:5173  
- Backend API: http://localhost:4000/posts  

## 🔌 API Endpoints
- `GET /posts` → list all posts  
- `POST /posts` → create `{ title, body }`  
- `DELETE /posts/:id` → delete a post  

## ✅ Verification
```bash
docker compose ps && \
docker compose exec db psql -U appuser -d appdb -c 'SELECT current_database();' && \
docker compose exec db psql -U appuser -d appdb -c '\dt'
