# CareConnect Backend - API Testing Guide

## 🧪 Test All API Endpoints

### Prerequisites
- Backend running on http://localhost:5000
- MongoDB running locally
- Database seeded with sample data

---

## 📊 Using Postman

1. Download Postman: https://www.postman.com/downloads/
2. Import API collection (or create new requests manually)
3. Base URL: `http://localhost:5000/api`

---

## 💊 Medicines Endpoints

### Get All Medicines
```
GET http://localhost:5000/api/medicines
```

### Get Medicines by Category
```
GET http://localhost:5000/api/medicines?category=pain
```

### Get Single Medicine
```
GET http://localhost:5000/api/medicines/[MEDICINE_ID]
```
Replace `[MEDICINE_ID]` with actual ID from database

### Get Categories
```
GET http://localhost:5000/api/medicines/categories/all
```

---

## 📦 Orders Endpoints

### Create Order
```
POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerPhone": "9876543210",
  "customerEmail": "john@example.com",
  "address": {
    "fullName": "John Doe",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "pincode": "400001"
  },
  "items": [
    {
      "id": "1",
      "name": "Dolo 650",
      "price": 45,
      "quantity": 2
    }
  ],
  "totalAmount": 90,
  "paymentMethod": "cod"
}
```

### Get All Orders
```
GET http://localhost:5000/api/orders
```

### Get Orders by Customer Phone
```
GET http://localhost:5000/api/orders/customer/9876543210
```

### Get Single Order
```
GET http://localhost:5000/api/orders/[ORDER_ID]
```

### Update Order Status
```
PUT http://localhost:5000/api/orders/[ORDER_ID]/status
Content-Type: application/json

{
  "status": "Shipped"
}
```
Status values: `Confirmed`, `Shipped`, `Delivered`, `Cancelled`

---

## 📅 Appointments Endpoints

### Create Appointment
```
POST http://localhost:5000/api/appointments
Content-Type: application/json

{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "address": "123 Main St, Mumbai",
  "serviceType": "Nursing Care",
  "specificServices": ["Wound Care", "Medication Assist"],
  "preferredDate": "2024-06-15",
  "preferredTime": "10:00 AM",
  "urgentCare": false,
  "message": "Please schedule at your earliest convenience"
}
```

### Get All Appointments
```
GET http://localhost:5000/api/appointments
```

### Get Appointments by Phone
```
GET http://localhost:5000/api/appointments/phone/9876543210
```

### Get Appointments by Status
```
GET http://localhost:5000/api/appointments/status/Pending
```

### Update Appointment Status
```
PUT http://localhost:5000/api/appointments/[APPOINTMENT_ID]/status
Content-Type: application/json

{
  "status": "Confirmed"
}
```

---

## 🏥 Insurance Endpoints

### Get All Insurance Plans
```
GET http://localhost:5000/api/insurance/plans
```

### Get Plans by Category
```
GET http://localhost:5000/api/insurance/plans?category=health
```

### Get Single Plan
```
GET http://localhost:5000/api/insurance/plans/[PLAN_ID]
```

### Submit Insurance Form
```
POST http://localhost:5000/api/insurance/forms
Content-Type: application/json

{
  "fullName": "John Doe",
  "age": 35,
  "phone": "9876543210",
  "email": "john@example.com",
  "address": "123 Main St",
  "city": "Mumbai",
  "pincode": "400001",
  "nomineeName": "Jane Doe",
  "nomineeRelation": "Spouse",
  "medicalConditions": "None",
  "planName": "Complete Health Insurance",
  "planProvider": "Star Health",
  "coverage": "₹10 Lakhs",
  "premium": "₹2,499/month"
}
```

### Get Insurance Forms
```
GET http://localhost:5000/api/insurance/forms
```

### Get Forms by Phone
```
GET http://localhost:5000/api/insurance/forms/phone/9876543210
```

---

## 📞 Contact Endpoints

### Submit Contact Inquiry
```
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Service Inquiry",
  "message": "I would like to know more about your nursing services"
}
```

### Get All Inquiries
```
GET http://localhost:5000/api/contact
```

### Get Inquiries by Phone
```
GET http://localhost:5000/api/contact/phone/9876543210
```

### Get Inquiries by Status
```
GET http://localhost:5000/api/contact/status/New
```

### Update Inquiry Status (Admin)
```
PUT http://localhost:5000/api/contact/[INQUIRY_ID]/status
Content-Type: application/json

{
  "status": "In Progress",
  "response": "Thank you for reaching out. We will contact you soon."
}
```

---

## 🖥️ Using cURL (Command Line)

### Get All Medicines
```bash
curl http://localhost:5000/api/medicines
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "customerPhone": "9876543210",
    "customerEmail": "john@example.com",
    "address": {
      "fullName": "John Doe",
      "phone": "9876543210",
      "address": "123 Main St",
      "city": "Mumbai",
      "pincode": "400001"
    },
    "items": [{"id": "1", "name": "Dolo 650", "price": 45, "quantity": 2}],
    "totalAmount": 90,
    "paymentMethod": "cod"
  }'
```

---

## 🌐 Using Browser Console

```javascript
// Get all medicines
fetch('http://localhost:5000/api/medicines')
  .then(res => res.json())
  .then(data => console.log(data));

// Create order
fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerName: 'John Doe',
    customerPhone: '9876543210',
    customerEmail: 'john@example.com',
    address: {
      fullName: 'John Doe',
      phone: '9876543210',
      address: '123 Main St',
      city: 'Mumbai',
      pincode: '400001'
    },
    items: [{ id: '1', name: 'Dolo 650', price: 45, quantity: 2 }],
    totalAmount: 90,
    paymentMethod: 'cod'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 📊 Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error info"
}
```

---

## 🔍 MongoDB Database Verification

### Connect to Database
```bash
mongosh
use careconnect
```

### View Collections
```bash
show collections
```

### Query Data
```bash
# Get all medicines
db.medicines.find()

# Get all orders
db.orders.find()

# Get all appointments
db.appointments.find()

# Count documents
db.medicines.countDocuments()
```

---

## ✅ Test Checklist

- [ ] MongoDB running
- [ ] Backend server running
- [ ] Can get all medicines
- [ ] Can filter medicines by category
- [ ] Can create order
- [ ] Can retrieve order
- [ ] Can book appointment
- [ ] Can get appointments
- [ ] Can get insurance plans
- [ ] Can submit insurance form
- [ ] Can submit contact inquiry
- [ ] Can update order status
- [ ] Can update appointment status
- [ ] All responses have success flag
- [ ] No CORS errors

---

## 🐛 Common Test Issues

### CORS Error
**Cause:** Frontend and backend on different ports  
**Solution:** Ensure CORS is enabled in backend server.js

### 404 Not Found
**Cause:** Wrong endpoint URL  
**Solution:** Check endpoint path matches routes

### 500 Internal Server Error
**Cause:** Database connection or logic error  
**Solution:** Check backend terminal logs

### Validation Error
**Cause:** Missing required fields  
**Solution:** Include all required fields in request body

---

**Happy Testing! 🚀**
