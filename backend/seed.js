const mongoose = require('mongoose');
const Medicine = require('./models/Medicine');
const InsurancePlan = require('./models/InsurancePlan');
require('dotenv').config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/careconnect';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for Seeding');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const medicines = [
  // Pain Relief
  {
    name: 'Dolo 650',
    generic: 'Paracetamol 650mg',
    price: 45,
    mrp: 55,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
    category: 'pain',
    stock: 50,
    rating: 4.5,
    manufacturer: 'Micro Labs',
    description: 'Fast relief from fever and body pain',
    prescription: false
  },
  {
    name: 'Combiflam',
    generic: 'Ibuprofen + Paracetamol',
    price: 65,
    mrp: 80,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
    category: 'pain',
    stock: 45,
    rating: 4.3,
    manufacturer: 'Sanofi',
    description: 'Effective pain relief',
    prescription: false
  },
  {
    name: 'Aspirin 75mg',
    generic: 'Acetylsalicylic Acid',
    price: 35,
    mrp: 45,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2070&auto=format&fit=crop',
    category: 'pain',
    stock: 60,
    rating: 4.2,
    manufacturer: 'Bayer',
    description: 'Blood thinner and pain relief',
    prescription: false
  },
  // Antibiotics
  {
    name: 'Azithromycin 500mg',
    generic: 'Azithromycin',
    price: 180,
    mrp: 220,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop',
    category: 'antibiotics',
    stock: 20,
    rating: 4.6,
    manufacturer: 'Pfizer',
    description: 'Treats bacterial infections',
    prescription: true
  },
  {
    name: 'Amoxicillin 500mg',
    generic: 'Amoxicillin',
    price: 120,
    mrp: 150,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop',
    category: 'antibiotics',
    stock: 30,
    rating: 4.4,
    manufacturer: 'GSK',
    description: 'Antibiotic for bacterial infections',
    prescription: true
  },
  // Vitamins
  {
    name: 'Vitamin C 500mg',
    generic: 'Ascorbic Acid',
    price: 120,
    mrp: 150,
    image: 'https://images.unsplash.com/photo-1616671276441-2f2c5b21b5d5?q=80&w=2070&auto=format&fit=crop',
    category: 'vitamins',
    stock: 35,
    rating: 4.3,
    manufacturer: 'Abbott',
    description: 'Boosts immunity',
    prescription: false
  },
  {
    name: 'Vitamin D3 1000IU',
    generic: 'Cholecalciferol',
    price: 95,
    mrp: 120,
    image: 'https://images.unsplash.com/photo-1616671276441-2f2c5b21b5d5?q=80&w=2070&auto=format&fit=crop',
    category: 'vitamins',
    stock: 40,
    rating: 4.5,
    manufacturer: 'Cipla',
    description: 'Calcium absorption and bone health',
    prescription: false
  },
  // Ayurvedic
  {
    name: 'Ashwagandha',
    generic: 'Withania Somnifera',
    price: 299,
    mrp: 399,
    image: 'https://images.unsplash.com/photo-1616671276441-2f2c5b21b5d5?q=80&w=2070&auto=format&fit=crop',
    category: 'ayurvedic',
    stock: 45,
    rating: 4.7,
    manufacturer: 'Dabur',
    description: 'Reduces stress and improves energy',
    prescription: false
  },
  {
    name: 'Turmeric Curcumin',
    generic: 'Curcuma Longa',
    price: 199,
    mrp: 299,
    image: 'https://images.unsplash.com/photo-1616671276441-2f2c5b21b5d5?q=80&w=2070&auto=format&fit=crop',
    category: 'ayurvedic',
    stock: 50,
    rating: 4.4,
    manufacturer: 'Himalaya',
    description: 'Anti-inflammatory and antioxidant',
    prescription: false
  },
  // Diabetes
  {
    name: 'Glucometer Kit',
    generic: 'Blood Glucose Monitor',
    price: 899,
    mrp: 1299,
    image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=2070&auto=format&fit=crop',
    category: 'diabetes',
    stock: 15,
    rating: 4.4,
    manufacturer: 'Accu-Chek',
    description: 'Accurate blood sugar monitoring',
    prescription: false
  },
  {
    name: 'Metformin 500mg',
    generic: 'Metformin Hydrochloride',
    price: 45,
    mrp: 60,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
    category: 'diabetes',
    stock: 60,
    rating: 4.6,
    manufacturer: 'Lupin',
    description: 'Diabetes management',
    prescription: true
  },
  // Cardiac Care
  {
    name: 'Atorvastatin 10mg',
    generic: 'Atorvastatin',
    price: 75,
    mrp: 100,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
    category: 'cardiac',
    stock: 40,
    rating: 4.5,
    manufacturer: 'Ranbaxy',
    description: 'Reduces cholesterol',
    prescription: true
  },
  {
    name: 'Lisinopril 5mg',
    generic: 'Lisinopril',
    price: 65,
    mrp: 85,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
    category: 'cardiac',
    stock: 35,
    rating: 4.3,
    manufacturer: 'Torrent',
    description: 'Blood pressure management',
    prescription: true
  },
  // Gastric Care
  {
    name: 'Omeprazole 20mg',
    generic: 'Omeprazole',
    price: 95,
    mrp: 120,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
    category: 'gastric',
    stock: 40,
    rating: 4.2,
    manufacturer: 'Cipla',
    description: 'Relieves acidity and heartburn',
    prescription: false
  },
  {
    name: 'Antacid Suspension',
    generic: 'Aluminum Hydroxide',
    price: 45,
    mrp: 60,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
    category: 'gastric',
    stock: 50,
    rating: 4.1,
    manufacturer: 'Reckitt',
    description: 'Quick relief from acidity',
    prescription: false
  },
  // Skin Care
  {
    name: 'Vitamin E Moisturizer',
    generic: 'Tocopherol Acetate',
    price: 199,
    mrp: 299,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=2070&auto=format&fit=crop',
    category: 'skin',
    stock: 25,
    rating: 4.7,
    manufacturer: 'Lotus',
    description: 'Nourishing skin moisturizer',
    prescription: false
  },
  {
    name: 'Sunscreen SPF 50',
    generic: 'Avobenzone + Octinoxate',
    price: 249,
    mrp: 349,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=2070&auto=format&fit=crop',
    category: 'skin',
    stock: 30,
    rating: 4.6,
    manufacturer: 'L\'Oreal',
    description: 'Complete sun protection',
    prescription: false
  }
];

const insurancePlans = [
  {
    name: 'Complete Health Insurance',
    provider: 'Star Health',
    coverage: '₹10 Lakhs',
    premium: '₹2,499/month',
    category: 'health',
    rating: 4.5,
    reviews: 2341,
    benefits: [
      'Cashless treatment at 6500+ hospitals',
      'No Claim Bonus up to 50%',
      'Day care procedures covered',
      'Free annual health checkup'
    ],
    eligibility: '18-65 years',
    claimRatio: '98.5%',
    logo: 'https://via.placeholder.com/150x80?text=Star+Health',
    cashless: true
  },
  {
    name: 'Family Floater Health',
    provider: 'ICICI Lombard',
    coverage: '₹20 Lakhs',
    premium: '₹4,999/month',
    category: 'health',
    rating: 4.7,
    reviews: 3892,
    benefits: [
      'Cover your entire family',
      'Maternity cover included',
      'Newborn baby cover',
      'Wellness benefits'
    ],
    eligibility: '18-65 years',
    claimRatio: '97.2%',
    logo: 'https://via.placeholder.com/150x80?text=ICICI+Lombard',
    cashless: true
  },
  {
    name: 'Term Life Insurance',
    provider: 'LIC',
    coverage: '₹50 Lakhs',
    premium: '₹1,899/month',
    category: 'life',
    rating: 4.8,
    reviews: 5231,
    benefits: [
      'Life cover up to 50 Lakhs',
      'Maturity benefit',
      'Tax benefits u/s 80C',
      'Loan facility available'
    ],
    eligibility: '18-60 years',
    claimRatio: '98.2%',
    logo: 'https://via.placeholder.com/150x80?text=LIC',
    cashless: true
  },
  {
    name: 'Critical Illness Plan',
    provider: 'HDFC Life',
    coverage: '₹15 Lakhs',
    premium: '₹3,299/month',
    category: 'critical',
    rating: 4.6,
    reviews: 1876,
    benefits: [
      'Covers 34 critical illnesses',
      'Lump sum payment on diagnosis',
      'No medical test up to 45 years',
      'Tax benefits u/s 80D'
    ],
    eligibility: '18-55 years',
    claimRatio: '96.5%',
    logo: 'https://via.placeholder.com/150x80?text=HDFC+Life',
    cashless: true
  },
  {
    name: 'Senior Citizen Health',
    provider: 'New India Assurance',
    coverage: '₹5 Lakhs',
    premium: '₹4,999/month',
    category: 'senior',
    rating: 4.4,
    reviews: 892,
    benefits: [
      'No upper age limit',
      'Pre-existing diseases covered',
      'Home care treatments',
      'Ambulance charges covered'
    ],
    eligibility: '60-80 years',
    claimRatio: '94.8%',
    logo: 'https://via.placeholder.com/150x80?text=New+India',
    cashless: true
  },
  {
    name: 'Comprehensive Health Plan',
    provider: 'Bajaj Allianz',
    coverage: '₹15 Lakhs',
    premium: '₹3,999/month',
    category: 'health',
    rating: 4.5,
    reviews: 1543,
    benefits: [
      'Emergency medical evacuation',
      'Day care surgery covered',
      'Domiciliary hospitalization',
      'Health check-up once a year'
    ],
    eligibility: '18-65 years',
    claimRatio: '96.8%',
    logo: 'https://via.placeholder.com/150x80?text=Bajaj+Allianz',
    cashless: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Medicine.deleteMany({});
    await InsurancePlan.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert medicines
    await Medicine.insertMany(medicines);
    console.log(`✅ ${medicines.length} medicines added to database`);

    // Insert insurance plans
    await InsurancePlan.insertMany(insurancePlans);
    console.log(`✅ ${insurancePlans.length} insurance plans added to database`);

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
