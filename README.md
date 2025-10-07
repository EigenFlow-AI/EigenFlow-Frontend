# EigenFlow Demo

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-blue.svg)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-green.svg)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)

A comprehensive trading platform combining a modern React frontend with an intelligent Python backend. This full-stack application provides real-time margin analysis, AI-powered recommendations, and comprehensive financial monitoring for trading operations.

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
- **LangGraph Agent**: Advanced AI agent for complex trading decisions
- **Real-time Analysis**: Live margin monitoring with intelligent alerts

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
- **React Router DOM 7.9.3**: Modern routing with data loading

### **Backend Framework**

- **Python 3.11+**: Modern Python with async support
- **FastAPI**: High-performance async web framework
- **LangGraph**: Advanced AI agent framework
- **LangChain**: AI application development framework
- **PostgreSQL**: Robust relational database with async support

### **Styling & UI**

- **Tailwind CSS 4.1.13**: Utility-first CSS framework
- **shadcn/ui**: Modern component library with Radix UI primitives
- **Tailwind Animate**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons

### **Data Visualization**

- **Recharts 2.15.4**: Powerful charting library built on D3
- **shadcn Chart Components**: Integrated chart system with consistent theming

### **State & Interaction**

- **Zustand 5.0.8**: Lightweight state management
- **React Resizable Panels**: Flexible layout management
- **Vaul**: Smooth drawer components
- **React Markdown**: Rich text rendering with math support

### **AI & Machine Learning**

- **LangGraph**: Multi-agent AI workflows
- **LangChain**: LLM application framework
- **OpenAI Integration**: GPT models for intelligent analysis
- **Google GenAI**: Alternative AI provider support

### **Developer Experience**

- **ESLint**: Code quality and consistency
- **TypeScript ESLint**: TypeScript-specific linting rules
- **PostCSS**: CSS processing and optimization
- **Pytest**: Python testing framework

## 📁 Project Structure

```
EigenFlowDemo/
├── src/                     # Frontend React Application
│   ├── components/
│   │   ├── app/             # Application-specific components
│   │   │   ├── AIChatArea.tsx
│   │   │   ├── AlertCardDialog.tsx
│   │   │   ├── AlertMessagesDrawer.tsx
│   │   │   ├── MarginCheckCard.tsx
│   │   │   └── UserAvatar.tsx
│   │   ├── chat/            # Chat system components
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── FloatingChatWindow.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── ChatTypes.ts
│   │   ├── examples/        # Example components
│   │   │   └── MarkdownRendererExamples.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── AppLayout.tsx
│   │   │   ├── MobileBottomNav.tsx
│   │   │   └── index.ts
│   │   ├── lp-margin/       # LP margin components
│   │   │   ├── LPMarginTable.tsx
│   │   │   ├── MarginHealthCard.tsx
│   │   │   └── MarginTypes.ts
│   │   ├── margin-check/    # Margin check components
│   │   │   ├── MarginReportModal.tsx
│   │   │   └── StructuredReportRenderer.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── MonitorPage.tsx
│   │   │   ├── ConfigPage.tsx
│   │   │   ├── HealthCenter.tsx
│   │   │   └── HomePage.tsx
│   │   ├── router/          # Routing components
│   │   │   └── AppRouter.tsx
│   │   └── ui/              # shadcn/ui components
│   │       ├── chart.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── MarkdownRenderer.tsx
│   │       └── ...
│   ├── contexts/            # React contexts
│   ├── data/
│   │   └── mockData.ts      # Mock data for development
│   ├── hooks/
│   │   └── useNavigation.ts # Custom React hooks
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── services/
│   │   ├── api.tsx          # Main API service
│   │   └── marginCheckApi.ts # Margin check API
│   ├── stores/              # Zustand state management
│   │   ├── alertsStore.ts
│   │   ├── chatStore.ts
│   │   ├── marginCheckStore.ts
│   │   ├── navigationStore.ts
│   │   ├── uiStore.ts
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── utils/
│   │   └── download.ts      # Utility functions
│   └── assets/              # Static assets
│       ├── brand3-1.svg
│       └── *.json           # Sample API responses
├── eigenflow/               # Backend Python Application
│   ├── src/
│   │   ├── agent/           # AI Agent components
│   │   │   ├── configuration.py
│   │   │   ├── data_gateway.py
│   │   │   ├── graph.py
│   │   │   ├── margin_tools.py
│   │   │   ├── prompts.py
│   │   │   ├── schemas.py
│   │   │   ├── state.py
│   │   │   └── utils.py
│   │   ├── api/             # FastAPI application
│   │   │   ├── app.py
│   │   │   ├── graph.py
│   │   │   └── models.py
│   │   ├── db/              # Database layer
│   │   │   ├── checkpoints.py
│   │   │   ├── database.py
│   │   │   ├── memory_store.py
│   │   │   ├── models/
│   │   │   └── tortoise_config.py
│   │   ├── utils/
│   │   │   └── institution_mapping.py
│   │   └── main.py          # Application entry point
│   ├── alert_service/       # Alert service module
│   │   ├── config/
│   │   ├── routers/
│   │   └── schema/
│   ├── tests/               # Test files
│   ├── supabase/            # Supabase integration
│   ├── pyproject.toml       # Python dependencies
│   └── langgraph.json       # LangGraph configuration
├── public/                  # Static public assets
├── dist/                    # Production build output
└── package.json             # Node.js dependencies
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18+
- **Python** 3.11+
- **PostgreSQL** 13+ (for backend)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd EigenFlowDemo
   ```

2. **Install Frontend Dependencies**

   ```bash
   npm install
   ```

3. **Install Backend Dependencies**

   ```bash
   cd eigenflow
   pip install -e .
   ```

4. **Environment Setup**

   Create environment files for both frontend and backend:

   ```bash
   # Frontend (.env)
   VITE_API_URL=http://localhost:8001

   # Backend (eigenflow/.env)
   EIGENFLOW_EMAIL=your_email@example.com
   EIGENFLOW_PASSWORD=your_password
   EIGENFLOW_BROKER=your_broker_value
   DATABASE_URL=postgresql://username:password@localhost:5432/eigenflow
   ```

### Development

1. **Start Backend Server**

   ```bash
   cd eigenflow
   python src/main.py
   ```

   Backend will be available at: `http://localhost:8001`

2. **Start Frontend Development Server**

   ```bash
   npm run dev
   ```

   Frontend will be available at: `http://localhost:5174`

### Available Scripts

#### Frontend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

#### Backend Scripts

- `python src/main.py` - Start FastAPI server
- `pytest` - Run Python tests
- `make install` - Install dependencies (if Makefile available)

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

- Contextual chat interface with LangGraph agents
- Floating window for persistent access
- Margin analysis and recommendations
- Real-time AI-powered trading insights
- Multi-agent workflow support

### Backend API Features

- **Margin Check API**: Real-time LP margin analysis and risk assessment
- **AI Agent System**: LangGraph-powered intelligent trading assistant
- **Database Integration**: PostgreSQL with async ORM support
- **Alert Service**: Configurable alert management system
- **External API Integration**: EigenFlow API for real-time trading data
- **RESTful API**: FastAPI-based high-performance endpoints

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

### Frontend Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Preview locally**

   ```bash
   npm run preview
   ```

3. **Deploy** the `dist` folder to your hosting platform (Vercel, Netlify, etc.)

### Backend Deployment

1. **Build Python package**

   ```bash
   cd eigenflow
   pip install -e .
   ```

2. **Deploy to cloud platform**

   - **AWS**: Use Lambda, ECS, or EC2
   - **Google Cloud**: Use Cloud Run or App Engine
   - **Azure**: Use Container Instances or App Service
   - **Docker**: Use the provided Docker configuration

3. **Environment Variables**

   Ensure all required environment variables are set:

   - `EIGENFLOW_EMAIL`
   - `EIGENFLOW_PASSWORD`
   - `EIGENFLOW_BROKER`
   - `DATABASE_URL`

### Full-Stack Deployment

For production deployment, consider:

- Using Docker Compose for local development
- Setting up CI/CD pipelines
- Configuring load balancers for high availability
- Implementing proper logging and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and confidential.

## 🔗 Related Technologies

### Frontend

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Recharts Documentation](https://recharts.org/en-US/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

### Backend

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [LangChain Documentation](https://python.langchain.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Python AsyncIO](https://docs.python.org/3/library/asyncio.html)

### AI & Machine Learning

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Generative AI](https://ai.google.dev/docs)
- [LangChain Agents](https://python.langchain.com/docs/modules/agents/)

---

Built with ❤️ for modern trading operations and AI-powered financial analysis
