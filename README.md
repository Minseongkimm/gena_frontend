# Dashboard Management System

A Next.js-based web application for managing dashboards and charts. Provides real-time data visualization and intuitive user interface.

## 🚀 Live Demo
**Deployed Site**: https://gena-frontend-minseong.vercel.app/

## 🛠 Tech Stack
- **Frontend**: Next.js 15.3.5, React 19
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **State Management**: React Hooks (Custom Hooks)
- **API**: JSON Server (Mock API)
- **Deployment**: Vercel

## 📦 Installation
### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# 1. Clone the repository
git clone https://github.com/Minseongkimm/gena_frontend
cd gena_frontend_minseong

# 2. Install dependencies
npm install
```

## 🚀 How to Run

### Development Mode
```bash
# 1. Start API server (new terminal)
npm run api

# 2. Start development server (another terminal)
npm run dev
```

### Production Mode
```bash
# 1. Build for production
npm run build

# 2. Start production server
npm run start
```

## ✅ Completed Features

### 🎯 Core Features

- [x] **Create New Dashboard**
  - Input dashboard name and description
  - Real-time creation and list update
- [x] **Add Charts to Dashboard with Configuration**
  - Support for Bar Chart, Line Chart, Number Chart
  - Chart title and data input
  - Real-time chart creation and dashboard update
- [x] **Save and Load Dashboards**
  - Dashboard selection and chart list display
  - Real-time chart data loading
  - Chart editing and update functionality

### 🌟 Nice to Have Features

- [ ] Drag and drop chart reordering
- [ ] Dashboard name editing or deletion
- [x] **Mobile-friendly Responsive Layout**
  - Mobile/tablet/desktop optimization
  - Responsive grid layout
  - Touch-friendly interface
- [x] **Docker Containerization or Deployed Demo**
  - Automatic deployment via Vercel
  - HTTPS security applied
  - Fast loading via CDN

### 🎨 UI/UX
- [x] **Modern Design**
  - Clean and intuitive interface
  - Green to blue primary color scheme for brand identity
  - Chart colors utilizing primary color palette
  - Smooth animation effects
- [x] **Real-time Data Updates**
  - Immediate reflection of chart creation/modification
  - Data persistence in db.json for data retention across refresh and future visits <- DB connection required in production

## 📁 Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── common/           # Common UI components
│   ├── dashboard/        # Dashboard related components
│   └── chart/            # Chart related components
├── hooks/                # Custom React hooks
│   ├── useDashboardList.js
│   ├── useDashboard.js
│   ├── useDashboardCharts.js
│   └── useDashboardActions.js
├── lib/                  # Utility functions
└── __tests__/           # Test files
    ├── hooks/           # Hook tests
    └── scenarios/       # Integration tests
```

## 🔧 API Endpoints

### Dashboards
- `GET /dashboards` - Get all dashboards
- `POST /dashboards` - Create new dashboard
- `GET /dashboards/:id` - Get dashboard by ID
- `PUT /dashboards/:id` - Update dashboard
- `DELETE /dashboards/:id` - Delete dashboard

### Charts
- `GET /charts` - Get all charts
- `POST /charts` - Create new chart
- `GET /charts/:id` - Get chart by ID
- `PUT /charts/:id` - Update chart
- `DELETE /charts/:id` - Delete chart

### Chart Data
- `GET /chartData` - Get all chart data
- `PUT /chartData` - Update chart data