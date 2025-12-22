# 📈 TradingApp (Frontend + Backend)

A full-stack stock trading platform built using the **MERN stack**.  
This project is being developed incrementally with a focus on **clean architecture, authentication, and real-world practices**.

---

## 🚀 Features Implemented (Phase 1)

### 🔐 Authentication (Completed)
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes (Backend + Frontend)
- Auto-login after registration
- Secure password hashing using bcrypt

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router v6
- SCSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (JSON Web Token)
- bcryptjs

---

## 📂 Project Structure

```bash
TradingApp/
│
├── client/        # React frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
├── server/        # Node + Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
└── README.md
