import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token and active business ID
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('khaki_access_token');
    const businessId = localStorage.getItem('khaki_active_business_id');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (businessId) {
      config.headers['x-business-id'] = businessId;
    }
  }
  return config;
});

// Response interceptor to handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && typeof window !== 'undefined') {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('khaki_refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
          const newAccessToken = res.data.data.accessToken;
          localStorage.setItem('khaki_access_token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshErr) {
          localStorage.removeItem('khaki_access_token');
          localStorage.removeItem('khaki_refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Services
export const authService = {
  login: async (phone: string, password: string) => {
    const res = await apiClient.post('/auth/login', { phone, password });
    return res.data;
  },
  verifyOtp: async (phone: string, otp: string, name?: string) => {
    const res = await apiClient.post('/auth/otp/verify', { phone, otp, name });
    return res.data;
  },
  getMe: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },
};

export const adminService = {
  login: async (phone: string, password: string) => authService.login(phone, password),
  verifyOtp: async (phone: string, otp: string) => authService.verifyOtp(phone, otp),
  getDashboard: async () => {
    const res = await apiClient.get('/admin/dashboard');
    return res.data;
  },
  getUsers: async () => {
    const res = await apiClient.get('/admin/users');
    return res.data;
  },
  getBusinesses: async () => {
    const res = await apiClient.get('/admin/businesses');
    return res.data;
  },
};

export const businessService = {
  getDashboardOverview: async () => {
    const res = await apiClient.get('/reports/dashboard');
    return res.data;
  },
  getCurrentBusiness: async () => {
    const res = await apiClient.get('/businesses/current');
    return res.data;
  },
};

export const customerService = {
  getAll: async (params?: { search?: string; filter?: string; page?: number }) => {
    const res = await apiClient.get('/customers', { params });
    return res.data;
  },
  getCustomers: async (params?: any) => {
    const res = await apiClient.get('/customers', { params });
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post('/customers', data);
    return res.data;
  },
  createCustomer: async (data: any) => {
    const res = await apiClient.post('/customers', data);
    return res.data;
  },
  getLedger: async (id: string) => {
    const res = await apiClient.get(`/customers/${id}/ledger`);
    return res.data;
  },
};

export const supplierService = {
  getAll: async (params?: { search?: string; page?: number }) => {
    const res = await apiClient.get('/suppliers', { params });
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post('/suppliers', data);
    return res.data;
  },
  getLedger: async (id: string) => {
    const res = await apiClient.get(`/suppliers/${id}/ledger`);
    return res.data;
  },
};

export const productService = {
  getAll: async (params?: { search?: string; lowStock?: boolean; page?: number }) => {
    const res = await apiClient.get('/products', { params });
    return res.data;
  },
  getProducts: async (params?: any) => {
    const res = await apiClient.get('/products', { params });
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post('/products', data);
    return res.data;
  },
  createProduct: async (data: any) => {
    const res = await apiClient.post('/products', data);
    return res.data;
  },
  getInventorySummary: async () => {
    const res = await apiClient.get('/inventory/summary');
    return res.data;
  },
  getLowStockAlerts: async () => {
    const res = await apiClient.get('/inventory/low-stock');
    return res.data;
  },
};

export const invoiceService = {
  getAll: async (params?: { search?: string; status?: string; page?: number }) => {
    const res = await apiClient.get('/invoices', { params });
    return res.data;
  },
  getInvoices: async (params?: any) => {
    const res = await apiClient.get('/invoices', { params });
    return res.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/invoices/${id}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post('/invoices', data);
    return res.data;
  },
  createInvoice: async (data: any) => {
    const res = await apiClient.post('/invoices', data);
    return res.data;
  },
  cancel: async (id: string) => {
    const res = await apiClient.post(`/invoices/${id}/cancel`);
    return res.data;
  },
  shareWhatsApp: async (invoiceId: string, phone?: string) => {
    const res = await apiClient.post('/whatsapp/share-invoice', { invoiceId, phone });
    return res.data;
  },
};

export const purchaseService = {
  getAll: async (params?: { search?: string; page?: number }) => {
    const res = await apiClient.get('/purchases', { params });
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post('/purchases', data);
    return res.data;
  },
};

export const paymentService = {
  getAll: async (params?: { type?: string; partyType?: string }) => {
    const res = await apiClient.get('/payments', { params });
    return res.data;
  },
  getPayments: async (params?: any) => {
    const res = await apiClient.get('/payments', { params });
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post('/payments', data);
    return res.data;
  },
};

export const accountingService = {
  getDayBook: async (date?: string) => {
    const res = await apiClient.get('/accounting/day-book', { params: { date } });
    return res.data;
  },
  getCashBook: async () => {
    const res = await apiClient.get('/accounting/cash-book');
    return res.data;
  },
  getBankBook: async () => {
    const res = await apiClient.get('/accounting/bank-book');
    return res.data;
  },
  getProfitAndLoss: async () => {
    const res = await apiClient.get('/accounting/profit-and-loss');
    return res.data;
  },
  getProfitLoss: async () => {
    const res = await apiClient.get('/accounting/profit-and-loss');
    return res.data;
  },
};

export const gstService = {
  getGstr1: async (month?: number, year?: number) => {
    const res = await apiClient.get('/gst/gstr-1', { params: { month, year } });
    return res.data;
  },
  getGstr3b: async (month?: number, year?: number) => {
    const res = await apiClient.get('/gst/gstr-3b', { params: { month, year } });
    return res.data;
  },
};
