# CareConnect - Quick Start Guide

## ⚡ Get Started in 5 Minutes

### Prerequisites (First time only)
- [ ] Install Node.js from nodejs.org
- [ ] Install MongoDB from mongodb.com
- [ ] Install Git (optional)

### Terminal 1: Start MongoDB
```bash
mongod
```
Keep this running. You should see: `waiting for connections on port 27017`

### Terminal 2: Start Backend
```bash
cd d:\website\backend
npm install
npm run seed
npm run dev
```
Wait for: `✅ Ready to receive requests...`

### Terminal 3: Start Frontend
```bash
cd d:\website\careconnect
npm install
npm run dev
```
Wait for: `➜  Local: http://localhost:5173/`

### Done! 🎉
- Open http://localhost:5173 in your browser
- Everything is connected and working!

---

## 📱 What You Can Do

✅ Browse medicines  
✅ Add to cart and checkout  
✅ Book appointments  
✅ View insurance plans  
✅ Submit insurance forms  
✅ Submit contact inquiries  
✅ Track orders  

---

## 🔍 Test It

1. **Pharmacy**: Add medicine → Cart → Checkout
2. **Appointment**: Book Appointment → Fill form → Submit
3. **Insurance**: Insurance → Select plan → Fill form
4. **Orders**: Go to My Orders → See placed orders

---

## 🆘 If Something Goes Wrong

### Port Already in Use
```bash
# Change port in backend/.env
PORT=5001
```

### MongoDB Not Starting
```bash
# Start MongoDB service
mongod
```

### API Not Found Error
- Check backend is running on port 5000
- Check frontend .env has correct API URL

### Clear Everything & Start Fresh
```bash
# Terminal 2
cd backend
npm install
npm run seed

# Then start with npm run dev
```

---

## 📚 Full Documentation

For detailed setup, see: `d:\website\SETUP_GUIDE.md`

---

**Need help? Check the error message in the terminal and refer to SETUP_GUIDE.md**
