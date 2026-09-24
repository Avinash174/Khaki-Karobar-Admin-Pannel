# Khaki Karobari — Super Admin & Business Operations Panel

![Khaki Karobari](https://img.shields.io/badge/Brand-KHAKI%20%7C%20KrypTech%E2%84%A2-red)
![Next.js](https://img.shields.io/badge/Next.js-14%20App%20Router-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

The complete Super Admin & Multi-Tenant Business Management web application for **Khaki Karobari**, built by **Khaki KrypTech (India) Pvt. Ltd.**.

---

## 🚀 Key Highlights & Architecture

- **Next.js 14 App Router** with full TypeScript typing.
- **Brand Palette (White + Red + Black):**
  - Light mode: Ultra-clean white slate `#F8FAFC`, dark charcoal text `#0F172A`, brand red highlights `#DC2626`.
  - Dark mode: Multi-tiered dark slate `#090D16` canvas, `#121927` card surface, `#1A2333` elevated dialogs.
- **Dynamic 3-Way Theme Switcher:** `☀ Light` / `🌙 Dark` / `⚙ System` with persistent client-side storage.
- **Real Backend Integration:** Directly connects to Khaki Karobari Node.js/PostgreSQL backend on port `5001`.
- **Global Command Search (`⌘K`):** Instant search modal for actions, customers, invoices, and system settings.
- **Rich Recharts Visualizations:**
  - Dynamic Revenue Trend area chart with brand red gradients.
  - Sales vs. Purchases comparative bar charts.
- **Comprehensive Modals & Drawers:**
  - Create Invoice Drawer with multi-item live tax calculations.
  - Quick Add Customer and Quick Add Product modals.
  - View Invoice Modal with GST-compliant layout and direct WhatsApp dispatch.
- **Multi-Tenant Business Switcher & Mobile Slide-Over Drawer.**

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide React Icons
- **Visualizations:** Recharts
- **Font:** Google Inter (`next/font/google`)
- **State & Theme:** React Context + HTML `data-theme` / `class="dark"`

---

## 💻 Getting Started

### 1. Prerequisites
- Node.js 18+ or 20+
- Khaki Karobari Backend running on `http://localhost:5001`

### 2. Environment Variables
Create `.env.local` in the project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev -p 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
admin-pannel/
├── app/
│   ├── layout.tsx         # Root layout, Google Inter font, Theme Provider
│   ├── page.tsx           # Redesigned Super Admin Dashboard with real API data
│   └── globals.css        # Tailored design system, custom scrollbars, glassmorphism
├── components/
│   ├── AdminHeader.tsx    # Header with ⌘K search, business switcher, theme toggle
│   ├── AdminSidebar.tsx   # Desktop sidebar & mobile drawer with active indicator
│   ├── CommandPalette.tsx # Global ⌘K search and quick jump modal
│   ├── KpiCard.tsx        # High-impact metric cards with trend badges
│   ├── RevenueChart.tsx   # AreaChart for revenue trends
│   ├── SalesVsPurchasesChart.tsx # Comparative bar chart
│   ├── ActivityTimeline.tsx      # Live system audit log
│   ├── TopBusinessesTable.tsx    # Responsive multi-tenant business table
│   └── Modals/
│       ├── AddCustomerModal.tsx
│       ├── AddProductModal.tsx
│       ├── CreateInvoiceDrawer.tsx
│       └── ViewInvoiceModal.tsx
├── lib/
│   ├── api.ts             # Typed API client connected to backend
│   └── theme.tsx          # 3-way Theme context (Light, Dark, System)
└── tailwind.config.js     # Dark mode tokens and brand color palette
```

---

## 🛡️ License

Copyright © 2026 **Khaki KrypTech (India) Pvt. Ltd.** All Rights Reserved.
