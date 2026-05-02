# CareConnect - Complete Setup & Run Guide

## 🎯 Project Overview

CareConnect is a full-stack healthcare application with:
- **Frontend**: React + Vite (modern, fast)
- **Backend**: Node.js + Express + MongoDB
- **Features**: Pharmacy, Orders, Appointments, Insurance, Contact Management

---

## 📋 Prerequisites

Before starting, ensure you have installed:

1. **Node.js** (v14.0.0+) - [Download](https://nodejs.org/)
2. **MongoDB** (v4.4+) - [Download](https://www.mongodb.com/try/download/community)
3. **npm** (comes with Node.js)
4. **Git** (optional, for version control)

**Verify installations:**
```bash
node --version
npm --version
mongod --version
```

---

## 🚀 Step-by-Step Setup

### Phase 1: Backend Setup

#### Step 1.1: Start MongoDB

**On Windows:**
```bash
# If MongoDB is installed as a service, it starts automatically
# Or manually start it:
mongod
```

**On Mac (using Homebrew):**
```bash
brew services start mongodb-community
```

**On Linux:**
```bash
sudo systemctl start mongod
```

**Verify MongoDB is running:**
- Should see message like: `waiting for connections on port 27017`

#### Step 1.2: Install Backend Dependencies

```bash
cd d:\website\backend
npm install
```

**Expected output:**
```
added 45 packages in 12s
```

#### Step 1.3: Seed the Database

```bash
npm run seed
```

**Expected output:**
```
✅ 17 medicines added to database
✅ 6 insurance plans added to database
✅ Database seeding completed successfully!
```

#### Step 1.4: Start Backend Server

```bash
npm run dev
```

**Expected output:**
```
╔════════════════════════════════════════╗
║   CareConnect Backend Server          ║
╚════════════════════════════════════════╝
🚀 Server running on: http://localhost:5000
📡 API Base URL: http://localhost:5000/api
✅ Ready to receive requests...
```

**✅ Backend is now running!**

---

### Phase 2: Frontend Setup

#### Step 2.1: Install Frontend Dependencies

Open **NEW terminal** (keep backend terminal open):

```bash
cd d:\website\careconnect
npm install
```

#### Step 2.2: Configure Frontend Environment

The `.env` file is already created with:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

**Verify it exists at:** `d:\website\careconnect\.env`

#### Step 2.3: Start Frontend Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v4.x.x

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

**✅ Frontend is now running!**

---

## 🌐 Access the Application

**Frontend:** http://localhost:5173  
**Backend API:** http://localhost:5000/api  
**MongoDB:** localhost:27017

---

## 🧪 Test the Integration

### Test 1: Create an Appointment

1. Go to http://localhost:5173
2. Click "Book Appointment"
3. Fill the form and submit
4. Check backend logs for success message

### Test 2: Create an Order

1. Go to Pharmacy
2. Add medicines to cart
3. Proceed to checkout
4. Fill delivery details
5. Complete payment (Cash on Delivery)
6. Order should be saved to database

### Test 3: Check Backend API

**Get all medicines:**
```bash
curl http://localhost:5000/api/medicines
```

**Get all orders:**
```bash
curl http://localhost:5000/api/orders
```

**Get all appointments:**
```bash
curl http://localhost:5000/api/appointments
```

---

## 📁 Project Structure

```
website/
├── careconnect/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── services/api.js   # API calls to backend
│   │   ├── pages/            # Pages (Checkout, Appointment, etc.)
│   │   ├── components/       # React components
│   │   ├── context/          # CartContext, OrderContext
│   │   ├── styles/           # CSS files
│   │   └── main.jsx          # Entry point
│   ├── .env                  # Frontend config
│   ├── package.json
│   └── vite.config.js
│
└── backend/                  # Backend (Node + Express + MongoDB)
    ├── models/               # Database schemas
    ├── controllers/          # Business logic
    ├── routes/               # API endpoints
    ├── config/
    │   └── database.js       # MongoDB connection
    ├── .env                  # Backend config
    ├── package.json
    ├── server.js             # Main server
    ├── seed.js               # Database seeding
    └── README.md             # Backend documentation
```

---

## 🔧 Configuration

### Backend `.env`
**Location:** `d:\website\backend\.env`

```env
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/careconnect  # Database URL
NODE_ENV=development                        # Environment
FRONTEND_URL=http://localhost:5173          # Frontend URL for CORS
```

### Frontend `.env`
**Location:** `d:\website\careconnect\.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api  # Backend API URL
```

---

## 🔌 API Endpoints Quick Reference

### Medicines
```
GET  /api/medicines                    # Get all medicines
GET  /api/medicines/:id                # Get single medicine
GET  /api/medicines/category/:category # Get by category
```

### Orders
```
POST /api/orders                       # Create order
GET  /api/orders                       # Get all orders
GET  /api/orders/:id                   # Get single order
GET  /api/orders/customer/:phone       # Get by customer phone
PUT  /api/orders/:id/status            # Update status
```

### Appointments
```
POST /api/appointments                 # Create appointment
GET  /api/appointments                 # Get all appointments
GET  /api/appointments/:id             # Get single appointment
GET  /api/appointments/phone/:phone    # Get by phone
PUT  /api/appointments/:id/status      # Update status
```

### Insurance
```
GET  /api/insurance/plans              # Get all plans
GET  /api/insurance/plans/:id          # Get single plan
POST /api/insurance/forms              # Submit form
GET  /api/insurance/forms/phone/:phone # Get forms by phone
```

### Contact
```
POST /api/contact                      # Submit inquiry
GET  /api/contact                      # Get all inquiries
GET  /api/contact/phone/:phone         # Get by phone
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "MongoDB Connection Error"
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
```bash
# Start MongoDB
mongod
```

### Issue 2: "Port 5000 Already in Use"
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

### Issue 3: "CORS Error"
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL.

### Issue 4: "Module not found"
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
npm install
```

### Issue 5: "API calls returning 404"
**Solution:** Check that:
- Backend server is running on port 5000
- Frontend `.env` has correct API URL
- API endpoints match the routes

---

## 📦 Database Models

### Medicines Collection
- name, generic, price, mrp, category, stock, rating, manufacturer, description

### Orders Collection
- orderNumber, customerName, customerPhone, items, totalAmount, paymentMethod, status

### Appointments Collection
- appointmentNumber, fullName, email, phone, serviceType, preferredDate, status

### Insurance Plans Collection
- name, provider, coverage, premium, category, rating, benefits

### Insurance Forms Collection
- formNumber, fullName, age, phone, planName, status

### Contact Inquiries Collection
- inquiryNumber, fullName, email, phone, message, status

---

## 🚀 Production Deployment

### Deploy Backend to Heroku

```bash
cd backend
heroku login
heroku create careconnect-backend
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/careconnect
git push heroku main
```

### Deploy Frontend to Vercel

```bash
cd careconnect
npm install -g vercel
vercel
```

---

## 📊 Monitoring

### Backend Logs
- Check terminal running `npm run dev`
- Monitor API requests and responses
- Track database operations

### Database Monitoring
```bash
# Connect to MongoDB shell
mongosh

# View databases
show dbs

# Use careconnect database
use careconnect

# View collections
show collections

# Query data
db.medicines.find()
```

---

## 🔒 Security Notes

- ⚠️ Never commit `.env` files with sensitive data
- ⚠️ Use environment variables for all sensitive configs
- ⚠️ TODO: Add authentication before production
- ⚠️ TODO: Add input validation & sanitization
- ⚠️ TODO: Add rate limiting
- ⚠️ TODO: Add HTTPS/SSL certificates

---

## 📞 Support

### Backend Issues
- Check logs in backend terminal
- Verify MongoDB is running
- Check network connectivity

### Frontend Issues
- Open browser DevTools (F12)
- Check Console tab for errors
- Verify network requests in Network tab

### API Issues
- Test endpoints with Postman
- Check request body and headers
- Verify database connectivity

---

## 🎓 Next Steps

1. **Add Authentication**
   - Implement user login/signup
   - Add JWT tokens
   - Protect admin routes

2. **Add Payment Integration**
   - Integrate Razorpay/Stripe
   - Implement actual payment processing
   - Track payment status

3. **Add Email Notifications**
   - Send order confirmations
   - Send appointment reminders
   - Send inquiry responses

4. **Add Admin Dashboard**
   - View all orders, appointments, inquiries
   - Manage medicines and insurance plans
   - Update order/appointment status

5. **Add Search & Filters**
   - Search medicines by name
   - Filter appointments by date
   - Filter orders by status

---

## 📝 Quick Commands Reference

```bash
# Backend
cd backend
npm install                  # Install dependencies
npm run seed                 # Seed database
npm run dev                  # Start development server
npm start                    # Start production server

# Frontend
cd careconnect
npm install                  # Install dependencies
npm run dev                  # Start development server
npm run build                # Build for production
npm run preview              # Preview production build

# MongoDB
mongod                       # Start MongoDB
mongosh                      # Connect to MongoDB shell

# Utilities
netstat -ano | findstr :5000 # Find process on port 5000
taskkill /PID <PID> /F       # Kill process
```

---

## ✅ Verification Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB running
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Database seeded with data
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Can access http://localhost:5000/api
- [ ] API calls working in browser console
- [ ] Can create appointments
- [ ] Can place orders
- [ ] Can submit insurance forms

---

## 🎉 You're All Set!

Your CareConnect application is now fully functional with frontend and backend integration!

**Happy coding! 🚀**

---

**Last Updated:** May 2, 2026  
**Version:** 1.0.0-complete
