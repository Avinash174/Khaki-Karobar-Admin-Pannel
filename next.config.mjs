/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  async redirects() {
    return [
      { source: '/admin', destination: '/admin/dashboard', permanent: false },
      { source: '/dashboard', destination: '/admin/dashboard', permanent: false },
      { source: '/invoices', destination: '/admin/sales/invoices', permanent: false },
      { source: '/customers', destination: '/admin/customers', permanent: false },
      { source: '/products', destination: '/admin/products', permanent: false },
      { source: '/payments', destination: '/admin/payments', permanent: false },
      { source: '/accounting', destination: '/admin/accounting/ledger', permanent: false },
      { source: '/gst', destination: '/admin/reports/gst', permanent: false },
    ];
  },
};

export default nextConfig;
