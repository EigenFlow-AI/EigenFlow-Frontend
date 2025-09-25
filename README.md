# EigenFlow Demo

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-blue.svg)](https://tailwindcss.com/)

A modern trading dashboard application built with React, TypeScript, and cutting-edge web technologies. This application provides comprehensive financial analytics, real-time monitoring, and interactive charting capabilities for trading operations.

## 🚀 Features

### 📊 **Dashboard & Analytics**

- **Interactive Charts**: Multiple chart types using Recharts with shadcn/ui chart components
  - Area charts for equity tracking
  - Bar charts for deposit/withdrawal analysis
  - Line charts for monthly trends
  - Treemap visualization for volume analysis
- **Real-time Data Visualization**: Book fund performance, Net PNL tracking, and volume analytics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🖥️ **Trading Interface**

- **Monitor Page**: Real-time trading positions and alerts management
- **Config Page**: Account configuration and symbol mapping
- **Health Center**: System health monitoring and diagnostics

### 🤖 **AI Integration**

- **AI Chat Interface**: Intelligent trading assistant with contextual responses
- **Floating Chat Window**: Persistent AI support across all pages
- **Margin Check AI**: Automated margin analysis and recommendations

### 🔔 **Alert System**

- **Dynamic Alert Management**: Add, remove, and toggle alerts across different modules
- **Alert Types**: Configuration alerts, mapping error alerts, position alerts
- **Visual Indicators**: Color-coded alert cards with status management

### 🎨 **Modern UI/UX**

- **shadcn/ui Components**: Consistent, accessible design system
- **Dark/Light Mode**: System-aware theme switching
- **Responsive Layout**: Mobile-first design with adaptive layouts
- **Interactive Elements**: Dropdown menus, modals, and drawers

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 19.1.1**: Latest React with concurrent features
- **TypeScript 5.8.3**: Type-safe development
- **Vite 7.1.2**: Lightning-fast build tool and dev server

### **Styling & UI**

- **Tailwind CSS 4.1.13**: Utility-first CSS framework
- **shadcn/ui**: Modern component library with Radix UI primitives
- **Tailwind Animate**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons

### **Data Visualization**

- **Recharts 2.15.4**: Powerful charting library built on D3
- **shadcn Chart Components**: Integrated chart system with consistent theming

### **State & Interaction**

- **React Hooks**: Modern state management with useState, useEffect
- **React Resizable Panels**: Flexible layout management
- **Vaul**: Smooth drawer components

### **Developer Experience**

- **ESLint**: Code quality and consistency
- **TypeScript ESLint**: TypeScript-specific linting rules
- **PostCSS**: CSS processing and optimization

## 📁 Project Structure

```
src/
├── components/
│   ├── app/                 # Application-specific components
│   │   ├── AIChatArea.tsx   # AI chat interface
│   │   ├── AlertCardDialog.tsx
│   │   ├── MarginCheckCard.tsx
│   │   └── UserAvatar.tsx
│   ├── chat/                # Chat system components
│   │   ├── ChatInterface.tsx
│   │   ├── FloatingChatWindow.tsx
│   │   └── ChatMessage.tsx
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileBottomNav.tsx
│   ├── lp-margin/           # LP margin components
│   │   ├── LPMarginTable.tsx
│   │   └── MarginHealthCard.tsx
│   ├── pages/               # Page components
│   │   ├── DashboardPage.tsx
│   │   ├── MonitorPage.tsx
│   │   ├── ConfigPage.tsx
│   │   └── HealthCenter.tsx
│   └── ui/                  # shadcn/ui components
│       ├── chart.tsx        # Chart components
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── data/
│   └── mockData.ts          # Mock data for development
├── lib/
│   └── utils.ts             # Utility functions
├── services/
│   └── marginCheckApi.ts    # API service layer
├── types/
│   └── index.ts             # TypeScript type definitions
└── assets/                  # Static assets
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd EigenFlowDemo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5174
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📊 Key Components

### Dashboard Charts

The dashboard features multiple interactive chart types:

- **Book Fund Performance**: Multi-chart analysis with equity, net deposits, and volume
- **Net PNL Display**: Large metric display with filtering options
- **Deposit/Withdrawal Analysis**: Horizontal and vertical bar charts
- **Monthly Trends**: Line charts with multiple data series
- **Volume Treemap**: Hierarchical data visualization

### Alert Management

Dynamic alert system with:

- Real-time alert creation and management
- Type-specific styling and information
- Status toggling (active/paused)
- Integration across multiple pages

### AI Chat Integration

- Contextual chat interface
- Floating window for persistent access
- Margin analysis and recommendations

## 🎨 Design System

The application uses a consistent design system based on:

- **Color Palette**: CSS custom properties for easy theming
- **Typography**: Consistent font hierarchy and spacing
- **Components**: Reusable UI components with variants
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: ARIA labels and keyboard navigation support

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS 4.1.13 with custom configuration for:

- Custom color schemes
- Component-specific utilities
- Responsive design patterns
- Animation presets

### TypeScript Configuration

Strict TypeScript setup with:

- Path mapping for clean imports (`@/components/*`)
- Strict type checking
- Modern ES modules support

## 🚀 Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Preview locally**

   ```bash
   npm run preview
   ```

3. **Deploy** the `dist` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and confidential.

## 🔗 Related Technologies

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Recharts Documentation](https://recharts.org/en-US/)

---

Built with ❤️ for modern trading operations
