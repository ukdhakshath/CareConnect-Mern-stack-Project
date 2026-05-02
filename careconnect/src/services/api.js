// API configuration and service functions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`API Error: ${response.status}`, data);
      return { success: false, error: data.message || 'API Error', data };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, error: error.message, data: null };
  }
};

// Medicines API
export const medicineAPI = {
  getAll: (filters = {}) => {
    let url = '/medicines?';
    if (filters.category && filters.category !== 'all') url += `category=${filters.category}&`;
    if (filters.search) url += `search=${filters.search}&`;
    if (filters.sortBy) url += `sortBy=${filters.sortBy}`;
    return apiCall(url.endsWith('&') ? url.slice(0, -1) : url);
  },
  getById: (id) => apiCall(`/medicines/${id}`),
  getByCategory: (category) => apiCall(`/medicines/category/${category}`),
  getCategories: () => apiCall('/medicines/categories/all'),
};

// Orders API
export const orderAPI = {
  create: (orderData) => apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  getAll: () => apiCall('/orders'),
  getById: (id) => apiCall(`/orders/${id}`),
  getByOrderNumber: (orderNumber) => apiCall(`/orders/number/${orderNumber}`),
  getByCustomerPhone: (phone) => apiCall(`/orders/customer/${phone}`),
  updateStatus: (id, status) => apiCall(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
  getStats: () => apiCall('/orders/stats/analytics'),
};

// Appointments API
export const appointmentAPI = {
  create: (appointmentData) => apiCall('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  }),
  getAll: () => apiCall('/appointments'),
  getById: (id) => apiCall(`/appointments/${id}`),
  getByPhone: (phone) => apiCall(`/appointments/phone/${phone}`),
  getByStatus: (status) => apiCall(`/appointments/status/${status}`),
  updateStatus: (id, status) => apiCall(`/appointments/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
  update: (id, data) => apiCall(`/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  getStats: () => apiCall('/appointments/stats/analytics'),
};

// Insurance API
export const insuranceAPI = {
  getPlans: (category) => {
    if (category && category !== 'all') {
      return apiCall(`/insurance/plans?category=${category}`);
    }
    return apiCall('/insurance/plans');
  },
  getPlanById: (id) => apiCall(`/insurance/plans/${id}`),
  getPlansByCategory: (category) => apiCall(`/insurance/plans/category/${category}`),
  submitForm: (formData) => apiCall('/insurance/forms', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),
  getAllForms: () => apiCall('/insurance/forms'),
  getFormById: (id) => apiCall(`/insurance/forms/${id}`),
  getFormsByPhone: (phone) => apiCall(`/insurance/forms/phone/${phone}`),
  updateFormStatus: (id, status) => apiCall(`/insurance/forms/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
};

// Contact API
export const contactAPI = {
  submitInquiry: (inquiryData) => apiCall('/contact', {
    method: 'POST',
    body: JSON.stringify(inquiryData),
  }),
  getAll: () => apiCall('/contact'),
  getById: (id) => apiCall(`/contact/${id}`),
  getByPhone: (phone) => apiCall(`/contact/phone/${phone}`),
  getByStatus: (status) => apiCall(`/contact/status/${status}`),
  updateStatus: (id, status, response = '') => apiCall(`/contact/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, response }),
  }),
  getStats: () => apiCall('/contact/stats/analytics'),
};

export default apiCall;
