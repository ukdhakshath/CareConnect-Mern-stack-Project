# CareConnect Backend API

A comprehensive Node.js/Express/MongoDB backend for the CareConnect healthcare application. This API handles pharmacy services, appointments, insurance management, and contact inquiries.

## 📋 Features

- **Pharmacy Management**: Browse medicines, categories, pricing, ratings
- **Order Management**: Create orders, track status, view order history
- **Appointment Booking**: Schedule healthcare appointments with status tracking
- **Insurance Management**: Access insurance plans and submit insurance forms
- **Contact Inquiries**: Submit contact forms and track inquiry status
- **Admin Features**: Manage medicines, update order status, respond to inquiries

## 🏗️ Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   ├── Medicine.js          # Medicine schema
│   ├── Order.js             # Order schema
│   ├── Appointment.js       # Appointment schema
│   ├── InsurancePlan.js     # Insurance Plan schema
│   ├── InsuranceForm.js     # Insurance Form schema
│   └── ContactInquiry.js    # Contact Inquiry schema
├── controllers/
│   ├── medicineController.js       # Medicine operations
│   ├── orderController.js          # Order operations
│   ├── appointmentController.js    # Appointment operations
│   ├── insuranceController.js      # Insurance operations
│   └── contactController.js        # Contact operations
├── routes/
│   ├── apiRoutes.js         # Main API routes
│   ├── medicineRoutes.js    # Medicine endpoints
│   ├── orderRoutes.js       # Order endpoints
│   ├── appointmentRoutes.js # Appointment endpoints
│   ├── insuranceRoutes.js   # Insurance endpoints
│   └── contactRoutes.js     # Contact endpoints
├── .env                     # Environment variables
├── package.json             # Dependencies
├── server.js                # Main server file
└── seed.js                  # Database seeding script
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v14.0.0 or higher)
- **MongoDB** (Local or MongoDB Atlas)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables

Edit the `.env` file in the backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/careconnect
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**MongoDB Connection Options:**
- **Local MongoDB**: `mongodb://localhost:27017/careconnect`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/careconnect`

### Step 3: Start MongoDB

**If using Local MongoDB:**
```bash
mongod
```

**Note:** Ensure MongoDB is running before starting the backend server.

### Step 4: Seed Database (Optional but Recommended)

Populate the database with sample medicines and insurance plans:

```bash
npm run seed
```

Or manually:
```bash
node seed.js
```

**Expected Output:**
```
🗑️ Cleared existing data
✅ 17 medicines added to database
✅ 6 insurance plans added to database
✅ Database seeding completed successfully!
```

### Step 5: Start Backend Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║   CareConnect Backend Server          ║
╚════════════════════════════════════════╝
🚀 Server running on: http://localhost:5000
📡 API Base URL: http://localhost:5000/api
✅ Ready to receive requests...
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /health
```

### 💊 Medicines
```
GET    /medicines                    # Get all medicines (with filters)
GET    /medicines/categories/all     # Get all categories
GET    /medicines/category/:category # Get medicines by category
GET    /medicines/:id                # Get single medicine
POST   /medicines                    # Create medicine (Admin)
PUT    /medicines/:id                # Update medicine (Admin)
DELETE /medicines/:id                # Delete medicine (Admin)
```

### 📦 Orders
```
POST   /orders                       # Create new order
GET    /orders                       # Get all orders
GET    /orders/stats/analytics       # Get order statistics
GET    /orders/customer/:phone       # Get orders by customer phone
GET    /orders/number/:orderNumber   # Get order by order number
GET    /orders/:id                   # Get single order
PUT    /orders/:id/status            # Update order status
DELETE /orders/:id                   # Delete order
```

### 📅 Appointments
```
POST   /appointments                 # Create new appointment
GET    /appointments                 # Get all appointments
GET    /appointments/stats/analytics # Get appointment statistics
GET    /appointments/status/:status  # Get appointments by status
GET    /appointments/phone/:phone    # Get appointments by phone
GET    /appointments/:id             # Get single appointment
PUT    /appointments/:id/status      # Update appointment status
PUT    /appointments/:id             # Update appointment
DELETE /appointments/:id             # Delete appointment
```

### 🏥 Insurance
```
GET    /insurance/plans              # Get all insurance plans
GET    /insurance/plans/category/:category  # Get plans by category
GET    /insurance/plans/:id          # Get single plan
POST   /insurance/plans              # Create plan (Admin)
PUT    /insurance/plans/:id          # Update plan (Admin)
DELETE /insurance/plans/:id          # Delete plan (Admin)
POST   /insurance/forms              # Submit insurance form
GET    /insurance/forms              # Get all insurance forms
GET    /insurance/forms/phone/:phone # Get forms by phone
GET    /insurance/forms/:id          # Get single form
PUT    /insurance/forms/:id/status   # Update form status (Admin)
DELETE /insurance/forms/:id          # Delete form
```

### 📞 Contact
```
POST   /contact                      # Submit contact inquiry
GET    /contact                      # Get all inquiries
GET    /contact/stats/analytics      # Get inquiry statistics
GET    /contact/status/:status       # Get inquiries by status
GET    /contact/phone/:phone         # Get inquiries by phone
GET    /contact/:id                  # Get single inquiry
PUT    /contact/:id/status           # Update inquiry status (Admin)
DELETE /contact/:id                  # Delete inquiry
```

## 📝 Example API Requests

### Create an Order
```bash
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
      "quantity": 2,
      "totalPrice": 90
    }
  ],
  "totalAmount": 90,
  "paymentMethod": "cod"
}
```

### Book an Appointment
```bash
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

### Submit Insurance Form
```bash
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

### Submit Contact Inquiry
```bash
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

## 🗄️ Database Models

### Medicine
- `name`: String (required)
- `generic`: String (required)
- `price`: Number (required)
- `mrp`: Number (required)
- `category`: String (pain, antibiotics, vitamins, ayurvedic, diabetes, cardiac, gastric, skin)
- `stock`: Number
- `rating`: Number (0-5)
- `manufacturer`: String
- `description`: String
- `prescription`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

### Order
- `orderNumber`: String (unique)
- `customerName`: String
- `customerPhone`: String
- `customerEmail`: String
- `address`: Object (fullName, phone, address, city, pincode)
- `items`: Array (id, name, price, quantity, totalPrice)
- `totalAmount`: Number
- `paymentMethod`: String (card, upi, netbanking, cod)
- `status`: String (Confirmed, Shipped, Delivered, Cancelled)
- `deliveryDate`: Date
- `orderDate`: Date
- `createdAt`: Date
- `updatedAt`: Date

### Appointment
- `appointmentNumber`: String (unique)
- `fullName`: String
- `email`: String
- `phone`: String
- `address`: String
- `serviceType`: String
- `specificServices`: Array
- `preferredDate`: String
- `preferredTime`: String
- `urgentCare`: Boolean
- `message`: String
- `status`: String (Pending, Confirmed, Completed, Cancelled)
- `createdAt`: Date
- `updatedAt`: Date

### InsurancePlan
- `name`: String
- `provider`: String
- `coverage`: String
- `premium`: String
- `category`: String (health, life, critical, senior)
- `rating`: Number
- `reviews`: Number
- `benefits`: Array
- `eligibility`: String
- `claimRatio`: String
- `logo`: String
- `cashless`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

### InsuranceForm
- `formNumber`: String (unique)
- `fullName`: String
- `age`: Number
- `phone`: String
- `email`: String
- `address`: String
- `city`: String
- `pincode`: String
- `nomineeName`: String
- `nomineeRelation`: String
- `medicalConditions`: String
- `planName`: String
- `planProvider`: String
- `coverage`: String
- `premium`: String
- `status`: String (Pending, Approved, Rejected, Under Review)
- `submittedAt`: Date
- `createdAt`: Date
- `updatedAt`: Date

### ContactInquiry
- `inquiryNumber`: String (unique)
- `fullName`: String
- `email`: String
- `phone`: String
- `subject`: String
- `message`: String
- `status`: String (New, In Progress, Resolved, Closed)
- `response`: String
- `respondedAt`: Date
- `createdAt`: Date
- `updatedAt`: Date

## 🔄 Frontend Integration

### API Base URL Configuration

Update your frontend `.env` file:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Example Frontend API Call

```javascript
// Create order
const response = await fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customerName: 'John Doe',
    customerPhone: '9876543210',
    // ... other order data
  })
});
const data = await response.json();
```

## 🚀 Production Deployment

### Deploy to Heroku
```bash
heroku create careconnect-backend
git push heroku main
```

### Deploy to Vercel
Not recommended for production Node.js servers. Use Railway, Render, or Heroku instead.

### Deploy to Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

## 🔒 Security Considerations

- ✅ CORS is configured
- ✅ Input validation with Mongoose schemas
- ⚠️ TODO: Add authentication middleware
- ⚠️ TODO: Add rate limiting
- ⚠️ TODO: Add input sanitization
- ⚠️ TODO: Add request logging
- ⚠️ TODO: Add error tracking (Sentry)

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running. Start with `mongod` command.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` file or kill the process using port 5000.

### CORS Error in Frontend
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Ensure FRONTEND_URL in `.env` matches your frontend URL.

### Seed Script Issues
```
TypeError: Cannot read property 'connect' of undefined
```
**Solution:** Ensure MongoDB is running before running seed script.

## 📞 Support

For issues or questions, please contact the development team or create an issue in the repository.

## 📄 License

This project is licensed under the ISC License.

---

**Last Updated**: May 2, 2026
**Backend Version**: 1.0.0
