import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from '../styles/Pharmacy.module.css';

const Pharmacy = () => {
  const navigate = useNavigate();
  const { addToCart, getCartCount, notification } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'pain', name: 'Pain Relief' },
    { id: 'antibiotics', name: 'Antibiotics' },
    { id: 'vitamins', name: 'Vitamins' },
    { id: 'ayurvedic', name: 'Ayurvedic' },
    { id: 'diabetes', name: 'Diabetes Care' },
    { id: 'cardiac', name: 'Cardiac Care' },
    { id: 'gastric', name: 'Gastric Care' },
    { id: 'skin', name: 'Skin Care' },
  ];

  const medicines = [
    // Pain Relief
    {
      id: 1,
      name: 'Dolo 650',
      generic: 'Paracetamol 650mg',
      price: 45,
      mrp: 55,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
      category: 'pain',
      stock: 50,
      rating: 4.5,
      manufacturer: 'Micro Labs',
      description: 'Fast relief from fever and body pain'
    },
    {
      id: 2,
      name: 'Combiflam',
      generic: 'Ibuprofen + Paracetamol',
      price: 65,
      mrp: 80,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
      category: 'pain',
      stock: 45,
      rating: 4.3,
      manufacturer: 'Sanofi',
      description: 'Effective pain relief'
    },
    {
      id: 3,
      name: 'Aspirin 75mg',
      generic: 'Acetylsalicylic Acid',
      price: 35,
      mrp: 45,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2070&auto=format&fit=crop',
      category: 'pain',
      stock: 60,
      rating: 4.2,
      manufacturer: 'Bayer',
      description: 'Blood thinner and pain relief'
    },
    {
      id: 4,
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
      id: 5,
      name: 'Vitamin C 500mg',
      generic: 'Ascorbic Acid',
      price: 120,
      mrp: 150,
      image: 'https://images.unsplash.com/photo-1616671276441-2f2c5b21b5d5?q=80&w=2070&auto=format&fit=crop',
      category: 'vitamins',
      stock: 35,
      rating: 4.3,
      manufacturer: 'Abbott',
      description: 'Boosts immunity'
    },
    {
      id: 6,
      name: 'Ashwagandha',
      generic: 'Withania Somnifera',
      price: 299,
      mrp: 399,
      image: 'https://images.unsplash.com/photo-1616671276441-2f2c5b21b5d5?q=80&w=2070&auto=format&fit=crop',
      category: 'ayurvedic',
      stock: 45,
      rating: 4.7,
      manufacturer: 'Dabur',
      description: 'Reduces stress and improves energy'
    },
    {
      id: 7,
      name: 'Glucometer Kit',
      generic: 'Blood Glucose Monitor',
      price: 899,
      mrp: 1299,
      image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=2070&auto=format&fit=crop',
      category: 'diabetes',
      stock: 15,
      rating: 4.4,
      manufacturer: 'Accu-Chek',
      description: 'Accurate blood sugar monitoring'
    },
    {
      id: 8,
      name: 'Omeprazole 20mg',
      generic: 'Omeprazole',
      price: 95,
      mrp: 120,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
      category: 'gastric',
      stock: 40,
      rating: 4.2,
      manufacturer: 'Cipla',
      description: 'Relieves acidity and heartburn'
    }
  ];

  useEffect(() => {
    const filtered = medicines.filter(medicine => {
      const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.generic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredMedicines(filtered);
  }, [searchTerm, selectedCategory]);

  const handleBuyNow = (medicine) => {
    // Navigate directly to checkout with the selected medicine
    navigate('/checkout', { 
      state: { 
        items: [{ ...medicine, quantity: 1 }],
        total: medicine.price,
        fromBuyNow: true
      } 
    });
  };

  const cartCount = getCartCount();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.pharmacyPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>Pharmacy</h1>
          <div className={styles.headerActions}>
            <button
              className={styles.viewOrdersBtn}
              onClick={() => navigate('/orders')}
            >
              My Orders
            </button>
            <button
              className={styles.cartButton}
              onClick={() => navigate('/cart')}
            >
              🛒 Cart {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification.show && (
        <div className={styles.notification}>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>
            Your Wellness, <span>Our Priority</span>
          </h2>
          <p className={styles.heroSubtitle}>
            Get medicines delivered in 2 hours • 10,000+ products
          </p>

          <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search medicines by name, composition, or brand..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit" className={styles.searchButton}>🔍</button>
          </form>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>2hr</span>
              <span className={styles.statLabel}>Delivery</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>10k+</span>
              <span className={styles.statLabel}>Products</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>50k+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <h3 className={styles.sectionTitle}>Shop by Category</h3>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryButton} ${selectedCategory === cat.id ? styles.activeCategory : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className={styles.products}>
        <div className={styles.productsHeader}>
          <h3 className={styles.sectionTitle}>Popular Medicines</h3>
          <p className={styles.productsCount}>{filteredMedicines.length} products available</p>
        </div>

        {filteredMedicines.length === 0 ? (
          <div className={styles.noResults}>
            <p>No medicines found matching your search.</p>
            <button 
              className={styles.clearSearchBtn}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {filteredMedicines.map((medicine) => (
              <div key={medicine.id} className={styles.productCard}>
                {medicine.prescription && (
                  <span className={styles.prescriptionBadge}>Rx</span>
                )}
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <h4 className={styles.productName}>{medicine.name}</h4>
                  <p className={styles.productDesc}>{medicine.description}</p>
                  <p className={styles.manufacturer}>{medicine.manufacturer}</p>
                  
                  <div className={styles.productRating}>
                    {'★'.repeat(Math.floor(medicine.rating))}
                    {'☆'.repeat(5 - Math.floor(medicine.rating))}
                    <span className={styles.ratingCount}>({medicine.rating})</span>
                  </div>

                  <div className={styles.productPrice}>
                    <span className={styles.currentPrice}>₹{medicine.price}</span>
                    <span className={styles.originalPrice}>₹{medicine.mrp}</span>
                  </div>

                  <div className={styles.stockInfo}>
                    {medicine.stock > 10 ? (
                      <span className={styles.inStock}>In Stock</span>
                    ) : (
                      <span className={styles.lowStock}>Only {medicine.stock} left</span>
                    )}
                  </div>

                  <div className={styles.productActions}>
                    <button
                      className={styles.addToCartBtn}
                      onClick={() => addToCart(medicine)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className={styles.buyNowBtn}
                      onClick={() => handleBuyNow(medicine)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Pharmacy;