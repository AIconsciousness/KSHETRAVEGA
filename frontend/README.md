# KSHETRAVEGA Digital Farming Platform - Frontend

## 🚀 Project Overview

KSHETRAVEGA is a revolutionary digital farming platform designed to eliminate middlemen, connect farmers directly with buyers, integrate logistics, and incorporate advanced agricultural technology. The platform features marketplace functionality, transport booking, AI-powered crop advisory, and comprehensive agricultural services.

## 🎨 Design Philosophy

- **Modern Agricultural Aesthetic**: Earth tones with vibrant green accents
- **Professional UI/UX**: Clean, intuitive interface optimized for rural connectivity
- **Mobile-First Responsive**: Optimized for smartphones and tablets
- **Accessibility**: Multi-language support (Hindi, English, regional languages)
- **Performance**: Optimized for low-bandwidth connections

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Custom Components
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router v6
- **Authentication**: JWT with secure token management
- **Maps Integration**: Google Maps API / Mapbox
- **Real-time Features**: Socket.io for live updates
- **Charts**: Recharts for analytics
- **Icons**: Lucide React + Custom Agricultural Icons

## 🎯 Color Palette

```css
Primary Green: #2E7D32
Secondary Green: #4CAF50
Light Green: #81C784
Accent Orange: #FF8F00
Warm Brown: #5D4037
Neutral Gray: #F5F5F5
Text Dark: #212121
Text Light: #757575
Success: #4CAF50
Warning: #FF9800
Error: #F44336
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx        # Button component with variants
│   │   ├── Input.tsx         # Input field component
│   │   ├── Card.tsx          # Card container component
│   │   ├── Select.tsx        # Select dropdown component
│   │   ├── ProductCard.tsx   # Product display component
│   │   └── index.ts          # Component exports
│   ├── forms/                # Form components
│   │   ├── ProductForm.tsx   # Product creation/editing form
│   │   ├── CheckoutForm.tsx  # Multi-step checkout form
│   │   └── index.ts          # Form exports
│   ├── layout/               # Layout components
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   ├── Header.tsx        # Dashboard header
│   │   ├── DashboardLayout.tsx # Main dashboard layout
│   │   └── index.ts          # Layout exports
│   ├── cart/                 # Shopping cart components
│   │   ├── ShoppingCart.tsx  # Slide-out shopping cart
│   │   └── index.ts          # Cart exports
│   ├── profile/              # User profile components
│   │   ├── UserProfile.tsx   # User profile management
│   │   └── index.ts          # Profile exports
│   ├── settings/             # User settings components
│   │   ├── UserSettings.tsx  # User preferences & settings
│   │   └── index.ts          # Settings exports
│   ├── notifications/        # Notification components
│   │   ├── NotificationCenter.tsx # Notification management
│   │   └── index.ts          # Notification exports
│   ├── support/              # Support components
│   │   ├── HelpSupportCenter.tsx # Help & support center
│   │   └── index.ts          # Support exports
│   └── index.ts              # Main component exports
├── pages/
│   ├── auth/                 # Authentication pages
│   │   ├── LoginPage.tsx     # User login
│   │   ├── FarmerRegistrationPage.tsx # Farmer registration
│   │   ├── BuyerRegistrationPage.tsx  # Buyer registration
│   │   ├── ForgotPasswordPage.tsx     # Password recovery
│   │   └── index.ts          # Auth exports
│   ├── dashboard/            # Dashboard pages
│   │   ├── FarmerDashboard.tsx       # Farmer dashboard
│   │   ├── BuyerDashboard.tsx        # Buyer dashboard
│   │   ├── AdminDashboard.tsx        # Admin dashboard
│   │   ├── TransporterDashboard.tsx  # Transporter dashboard
│   │   └── index.ts          # Dashboard exports
│   ├── products/             # Product management pages
│   │   ├── ProductListing.tsx        # Product catalog
│   │   ├── ProductDetail.tsx         # Product details
│   │   └── index.ts          # Product exports
│   ├── orders/               # Order management pages
│   │   ├── OrderManagement.tsx       # Order tracking & management
│   │   └── index.ts          # Order exports
│   ├── profile/              # User profile pages
│   │   ├── ProfilePage.tsx   # User profile management
│   │   └── index.ts          # Profile exports
│   ├── settings/             # User settings pages
│   │   ├── SettingsPage.tsx  # User preferences & settings
│   │   └── index.ts          # Settings exports
│   ├── notifications/        # Notification pages
│   │   ├── NotificationsPage.tsx # Notification management
│   │   └── index.ts          # Notification exports
│   ├── support/              # Support pages
│   │   ├── SupportPage.tsx   # Help & support center
│   │   └── index.ts          # Support exports
│   └── index.ts              # Main page exports
├── hooks/                    # Custom React hooks
├── services/                 # API services
├── store/                    # Redux store
├── utils/                    # Utility functions
│   └── cn.ts                # Class name utility
├── types/                    # TypeScript type definitions
├── assets/                   # Static assets
├── styles/                   # Global styles
│   └── globals.css          # Tailwind CSS & custom styles
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
└── index.html                # HTML template
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd achhadam-frontend
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
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🏠 Dashboard System

The platform includes comprehensive role-based dashboards for different user types:

### Farmer Dashboard
- **Farm Management**: Track farm size, crops, and production
- **Order Management**: Monitor active and completed orders
- **Weather Updates**: Real-time weather information and forecasts
- **Market Insights**: Crop prices and market trends
- **Task Management**: Farming tasks and schedules

### Buyer Dashboard
- **Purchase Tracking**: Monitor order status and deliveries
- **Supplier Management**: Find and rate suppliers
- **Market Analysis**: Price trends and supply information
- **Order History**: Complete purchase records

### Admin Dashboard
- **System Overview**: Platform performance metrics
- **User Management**: Monitor user registrations and activities
- **Platform Analytics**: Revenue, orders, and user statistics
- **System Health**: Performance monitoring and alerts
- **Approval Management**: Pending verifications and approvals

### Transporter Dashboard
- **Delivery Tracking**: Active deliveries and route optimization
- **Vehicle Management**: Fleet status and maintenance
- **Performance Metrics**: On-time delivery rates and ratings
- **Schedule Management**: Upcoming deliveries and routes

## 🧩 UI Components

### Button Component
```tsx
import { Button } from './components/ui/Button';

<Button variant="primary" size="lg">
  Click Me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`
**Sizes**: `sm`, `md`, `lg`, `xl`

### Input Component
```tsx
import { Input } from './components/ui/Input';

<Input 
  label="Email"
  placeholder="Enter your email"
  error="Invalid email"
/>
```

### Card Component
```tsx
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### Select Component
```tsx
import { Select } from './components/ui/Select';

<Select
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  placeholder="Select an option"
  searchable
/>
```

## 🎨 Custom CSS Classes

### Button Classes
- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.btn-outline` - Outline button styling

### Card Classes
- `.card` - Basic card styling
- `.card-hover` - Card with hover effects

### Form Classes
- `.form-group` - Form group container
- `.form-label` - Form label styling
- `.form-error` - Error message styling

### Navigation Classes
- `.nav-link` - Navigation link styling
- `.nav-link-active` - Active navigation link

### Utility Classes
- `.animate-fade-in` - Fade in animation
- `.animate-slide-up` - Slide up animation
- `.bg-gradient-agricultural` - Agricultural gradient background

## 🔧 Configuration Files

### Tailwind CSS
- `tailwind.config.js` - Custom theme with agricultural colors
- `postcss.config.js` - PostCSS configuration

### TypeScript
- `tsconfig.json` - TypeScript configuration
- `tsconfig.app.json` - App-specific TypeScript config
- `tsconfig.node.json` - Node-specific TypeScript config

### Vite
- `vite.config.ts` - Vite build configuration

## 📱 Responsive Design

The platform is built with a mobile-first approach:

- **Mobile**: Optimized for smartphones with touch-friendly interfaces
- **Tablet**: Responsive layouts for tablet devices
- **Desktop**: Full-featured desktop experience

## 🌐 Multi-Language Support

- Hindi (हिंदी) - Primary Indian language
- English - International communication
- Regional languages support planned

## 🚀 Development Workflow

1. **Feature Development**: Create feature branches from main
2. **Component Development**: Build reusable UI components
3. **Testing**: Ensure components work across devices
4. **Documentation**: Update component documentation
5. **Code Review**: Submit pull requests for review

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for the agricultural community**
