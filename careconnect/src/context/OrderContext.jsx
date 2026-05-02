import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });

  // Load orders from localStorage on initial render
  useEffect(() => {
    const savedOrders = localStorage.getItem('pharmacyOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pharmacyOrders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderDetails) => {
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `ORD${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      status: 'Confirmed',
      ...orderDetails,
      items: orderDetails.items.map(item => ({
        ...item,
        totalPrice: item.price * item.quantity
      }))
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    
    setNotification({ show: true, message: 'Order placed successfully!' });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);

    return newOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const getOrdersByDateRange = (startDate, endDate) => {
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= startDate && orderDate <= endDate;
    });
  };

  const getTotalSpent = () => {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
  };

  const getOrderCount = () => {
    return orders.length;
  };

  const clearOrderHistory = () => {
    setOrders([]);
    localStorage.removeItem('pharmacyOrders');
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        getOrderById,
        getOrdersByDateRange,
        getTotalSpent,
        getOrderCount,
        clearOrderHistory,
        notification,
        setNotification
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};