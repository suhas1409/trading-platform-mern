# 📈 TradingApp (Frontend + Backend)

A full-stack stock trading platform built using the **MERN stack**.  
This project is being developed incrementally with a focus on **clean architecture, authentication, dashboard UI design, and real-world practices**.

---

## 🚀 Features Implemented

### 🔐 Authentication (Completed)
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes (Backend + Frontend)
- Auto-login after registration
- Secure password hashing using bcrypt

### 🖥️ Dashboard UI (Completed – Desktop)
- Navbar with market indices and navigation
- Watchlist panel (left section)
- Overview section (right section)
- Component-based UI structure
- SCSS-based styling

### 📱 Mobile UI (In Progress)
- Mobile-friendly Watchlist screen
- Bottom navigation bar
- Responsive layout using media queries
- Shared components across desktop & mobile

🧾 Orders (UI Completed)
-Order status indicators (OPEN / EXECUTED / CANCELLED)
-Click-to-modify OPEN orders
-Modify Order modal
-Editable quantity
-ESC key close
-Backdrop click close
-Close (✕) icon

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
├── client/                 # React frontend
│   ├── public/
│   │   └── favicon.png
│   ├── src/
│   │   ├── pages/          # Login, Register, Dashboard, Profile, Orders
│   │   ├── components/     # Navbar, Watchlist, Overview, BottomNav, MobileTopBar, ProtectedRoute, OrderModal
│   │   ├── services/       # API service layer
│   │   ├── assets/         # Images & icons
│   │   ├── index.scss      # Global styles
│   │   └── responsive.scss # Media query helpers
│   └── package.json
│
├── server/                 # Node + Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
└── README.md
