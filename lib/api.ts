import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to extract array of items from any backend list response format
export function extractItems<T = any>(data: any): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  return [];
}

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

// Response interceptor with queue to handle token refresh on 401 without race conditions
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && typeof window !== 'undefined') {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            const token = localStorage.getItem('khaki_access_token');
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('khaki_refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
          const newAccessToken = res.data?.data?.accessToken;
          if (newAccessToken) {
            localStorage.setItem('khaki_access_token', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            processQueue(null);
            return apiClient(originalRequest);
          } else {
            throw new Error('No access token in refresh response');
          }
        } catch (refreshErr) {
          processQueue(refreshErr);
          localStorage.removeItem('khaki_access_token');
          localStorage.removeItem('khaki_refresh_token');
          localStorage.removeItem('khaki_user');
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      } else {
        isRefreshing = false;
        if (window.location.pathname !== '/login') {
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
  refreshToken: async (token: string) => {
    const res = await apiClient.post('/auth/refresh-token', { refreshToken: token });
    return res.data;
  },
  getMe: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },
  logout: async () => {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('khaki_refresh_token') : null;
    try {
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken });
      }
    } catch {}
    if (typeof window !== 'undefined') {
      localStorage.removeItem('khaki_access_token');
      localStorage.removeItem('khaki_refresh_token');
      localStorage.removeItem('khaki_user');
    }
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
  updateCurrentBusiness: async (data: any) => {
    const res = await apiClient.put('/businesses/current', data);
    return res.data;
  },
};

export const customerService = {
  getAll: async (params?: { search?: string; filter?: string; page?: number; limit?: number }) => {
    const res = await apiClient.get('/customers', { params });
    return res.data;
  },
  getCustomers: async (params?: any) => {
    const res = await apiClient.get('/customers', { params });
    return res.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/customers/${id}`);
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
  update: async (id: string, data: any) => {
    const res = await apiClient.put(`/customers/${id}`, data);
    return res.data;
  },
  delete: async (id: string) => {
    const res = await apiClient.delete(`/customers/${id}`);
    return res.data;
  },
  getLedger: async (id: string) => {
    const res = await apiClient.get(`/customers/${id}/ledger`);
    return res.data;
  },
};

export const supplierService = {
  getAll: async (params?: { search?: string; page?: number; limit?: number }) => {
    const res = await apiClient.get('/suppliers', { params });
    return res.data;
  },
  getSuppliers: async (params?: any) => {
    const res = await apiClient.get('/suppliers', { params });
    return res.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/suppliers/${id}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post('/suppliers', data);
    return res.data;
  },
  createSupplier: async (data: any) => {
    const res = await apiClient.post('/suppliers', data);
    return res.data;
  },
  update: async (id: string, data: any) => {
    const res = await apiClient.put(`/suppliers/${id}`, data);
    return res.data;
  },
  delete: async (id: string) => {
    const res = await apiClient.delete(`/suppliers/${id}`);
    return res.data;
  },
  getLedger: async (id: string) => {
    const res = await apiClient.get(`/suppliers/${id}/ledger`);
    return res.data;
  },
};

export const productService = {
  getAll: async (params?: { search?: string; lowStock?: boolean; categoryId?: string; page?: number; limit?: number }) => {
    const res = await apiClient.get('/products', { params });
    return res.data;
  },
  getProducts: async (params?: any) => {
    const res = await apiClient.get('/products', { params });
    return res.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/products/${id}`);
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
  update: async (id: string, data: any) => {
    const res = await apiClient.put(`/products/${id}`, data);
    return res.data;
  },
  delete: async (id: string) => {
    const res = await apiClient.delete(`/products/${id}`);
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
  adjustStock: async (data: { productId: string; adjustmentType: 'ADD' | 'SUBTRACT' | 'SET'; quantity: number; notes?: string }) => {
    const res = await apiClient.post('/inventory/adjust', data);
    return res.data;
  },
  getStockMovements: async (productId?: string) => {
    const res = await apiClient.get('/inventory/movements', { params: { productId } });
    return res.data;
  },
};

export const invoiceService = {
  getAll: async (params?: { search?: string; status?: string; customerId?: string; page?: number; limit?: number }) => {
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
  getAll: async (params?: { search?: string; page?: number; limit?: number }) => {
    const res = await apiClient.get('/purchases', { params });
    return res.data;
  },
  getPurchases: async (params?: any) => {
    const res = await apiClient.get('/purchases', { params });
    return res.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/purchases/${id}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post('/purchases', data);
    return res.data;
  },
};

export const paymentService = {
  getAll: async (params?: { type?: string; partyType?: string; page?: number; limit?: number }) => {
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

export const reportService = {
  getDashboard: async () => {
    const res = await apiClient.get('/reports/dashboard');
    return res.data;
  },
  getSalesReport: async (from?: string, to?: string) => {
    const res = await apiClient.get('/reports/sales', { params: { from, to } });
    return res.data;
  },
  getOutstanding: async () => {
    const res = await apiClient.get('/reports/outstanding');
    return res.data;
  },
};
