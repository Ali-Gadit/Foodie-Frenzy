# Foodie Frenzy 🍔

Foodie Frenzy is a comprehensive Full-Stack E-commerce platform for food delivery. It features a customer-facing frontend, a dedicated admin dashboard for management, and a robust Node.js backend.

## 🚀 Features

### Frontend (Customer App)
- **Menu Browsing**: Explore a wide variety of food items with categories.
- **Cart Management**: Add, remove, and update quantities of items.
- **Secure Checkout**: Integration with Stripe for payments.
- **User Authentication**: Sign up and login functionality.
- **Order History**: Track previous and current orders.

### Admin Dashboard
- **Item Management**: Add, update, and delete food items with images.
- **Order Management**: View and update the status of customer orders.
- **Analytics**: Overview of sales and items (expandable).

### Backend
- **RESTful API**: Clean and scalable API architecture.
- **Database**: MongoDB integration for persistent storage.
- **Security**: JWT-based authentication and Bcrypt for password hashing.
- **File Uploads**: Multer integration for handling item images.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS (or CSS Modules).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Authentication**: JSON Web Tokens (JWT).
- **Payment Gateway**: Stripe.
- **Deployment**: Vercel.

## 📦 Project Structure

```text
├── admin/       # Admin Dashboard (React + Vite)
├── backend/     # Express API
└── frontend/    # Customer Web App (React + Vite)
```

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ali-Gadit/Foodie-Frenzy.git
   cd Foodie-Frenzy
   ```

2. **Backend Setup**:
   - Navigate to `backend/`.
   - Install dependencies: `npm install`.
   - Create a `.env` file and add:
     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_secret_key
     STRIPE_SECRET_KEY=your_stripe_key
     ```
   - Start the server: `npm start`.

3. **Frontend & Admin Setup**:
   - Navigate to `frontend/` or `admin/`.
   - Install dependencies: `npm install`.
   - Create a `.env` file and add:
     ```env
     VITE_BACKEND_URL=http://localhost:4000
     ```
   - Start the app: `npm run dev`.

## 🌐 Deployment

This project is optimized for deployment on **Vercel**.
- The backend is configured as a Serverless Function via `vercel.json`.
- Environment variables for CORS (`FRONTEND_URL`, `ADMIN_URL`) must be set in the Vercel dashboard.

---
Created by [Ali-Gadit](https://github.com/Ali-Gadit)
