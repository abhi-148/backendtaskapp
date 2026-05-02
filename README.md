🚀 Task Manager Backend (Node.js + Express + MongoDB)

📌 Overview

This is the backend API for the Team Task Manager application.
It provides RESTful APIs for authentication, project management, and task management.

---

🌐 Live Backend API

https://backendtaskapp-1.onrender.com

---

📌 Features

🔐 Authentication

- User Signup & Login
- JWT Authentication
- Protected Routes

📁 Project Management

- Create Project
- Get Projects

📋 Task Management

- Create Task
- Update Task Status
- Delete Task
- Filter tasks by project

---

🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

⚙️ Installation (Local Setup)

git clone https://github.com/abhi-148/backendtaskapp
cd backendtaskapp
npm install
npm run dev

---

🔐 Environment Variables

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000

---

📦 API Endpoints

Auth

- POST /api/auth/register
- POST /api/auth/login

Projects

- GET /api/projects
- POST /api/projects

Tasks

- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

Dashboard

- GET /api/dashboard

---

👨‍💻 Author

Abhishek Kumar
GitHub: https://github.com/abhi-148
