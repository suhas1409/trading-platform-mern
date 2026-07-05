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

### 🖥️ Dashboard UI (Completed – Desktop)
- Navbar with market indices and navigation
- Watchlist panel (left section)
- Overview section (right section)
- Component-based UI structure
- SCSS-based styling

### 📊 Portfolio UI (Completed)
- Holdings list with total P&L summary
- Expandable stock rows for more details
- Buy / Exit / View Chart actions
- Desktop table layout and mobile card layout
- Sticky portfolio summary on mobile
- SCSS-based responsive styling

### 📌 Positions UI (Completed)
- Open positions list with total P&L summary
- Expandable position rows for extra details
- Add Buy / Add Sell, Exit, and View Chart actions
- Desktop table layout and mobile card layout
- SCSS-based responsive styling

### 🧾 Orders UI (Completed)
- Order status indicators (OPEN / EXECUTED / CANCELLED)
- Click-to-modify OPEN orders
- Modify Order modal
- Editable quantity and price
- ESC key close
- Backdrop click close
- Close (✕) icon

### 📈 Chart Page UI (Completed)
- Separate chart page for stock symbols
- Open chart from Portfolio and Positions
- Multiple timeframe buttons (5min, 15min, 30min, 1H, 4H, 1D, 1W, 1M, 1Y)
- Chart placeholder UI for future integration
- Responsive desktop and mobile layout  

### 📱 Mobile UI (In Progress)
- Mobile-friendly Watchlist screen
- Bottom navigation bar for quick navigation
- Responsive Portfolio and Positions pages
- Expandable mobile cards with action buttons
- Sticky portfolio summary section on mobile
- Shared components across desktop & mobile
- Responsive layout built using SCSS media queries
  
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
