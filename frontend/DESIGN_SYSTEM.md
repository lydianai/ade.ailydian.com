# ADE Muhasebe - Design System Documentation

## Overview
Professional accounting and tax management system for Turkish users. Clean, trustworthy, and business-focused design.

## Colors

### Primary (Blue)
- **Primary-700**: `#1E40AF` - Main brand color, buttons, links
- **Primary-600**: `#2563eb` - Hover states
- **Primary-500**: `#3b82f6` - Active states
- **Primary-100**: `#dbeafe` - Backgrounds
- **Primary-50**: `#eff6ff` - Light backgrounds

### Secondary (Emerald)
- **Secondary-500**: `#10B981` - Success states, positive actions
- **Secondary-600**: `#059669` - Hover states
- **Secondary-100**: `#d1fae5` - Success backgrounds

### Accent (Amber)
- **Accent-500**: `#F59E0B` - Highlights, warnings
- **Accent-600**: `#d97706` - Hover states
- **Accent-100**: `#fef3c7` - Warning backgrounds

### Danger (Red)
- **Danger-500**: `#EF4444` - Errors, destructive actions
- **Danger-600**: `#dc2626` - Hover states
- **Danger-100**: `#fee2e2` - Error backgrounds

### Neutral (Gray)
- Gray scale from 50 to 900 for text, borders, backgrounds

## Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, sans-serif

### Font Weights
- **Light**: 300 (rarely used)
- **Regular**: 400 (body text)
- **Medium**: 500 (emphasis)
- **Semibold**: 600 (headings, labels)
- **Bold**: 700 (primary headings)
- **Extrabold**: 800 (hero text)

### Font Sizes
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)

## Components

### Button
**Location**: `/src/components/Button.tsx`

**Variants**:
- `primary` - Blue background, white text
- `secondary` - Emerald background, white text
- `danger` - Red background, white text
- `outline` - Transparent with border
- `ghost` - Transparent, no border

**Sizes**: `sm`, `md`, `lg`

**Props**:
- `isLoading` - Shows spinner
- `leftIcon` / `rightIcon` - Lucide icons
- `fullWidth` - Takes full width

**Usage**:
```tsx
<Button variant="primary" size="lg" leftIcon={Plus}>
  Yeni Fatura
</Button>
```

### Input
**Location**: `/src/components/Input.tsx`

**Features**:
- Label support
- Error states with validation
- Helper text
- Left/right icons
- Password visibility toggle
- Accessible (ARIA labels)

**Usage**:
```tsx
<Input
  label="E-posta Adresi"
  type="email"
  leftIcon={Mail}
  error={errors.email}
  required
/>
```

### Card
**Location**: `/src/components/Card.tsx`

**Props**:
- `hover` - Adds hover animation
- `padding` - none, sm, md, lg
- `shadow` - none, sm, md, lg

**Usage**:
```tsx
<Card hover padding="lg" shadow="md">
  Content here
</Card>
```

### Badge
**Location**: `/src/components/Badge.tsx`

**Variants**: primary, secondary, success, warning, danger, info, gray

**Sizes**: sm, md, lg

**Props**: `dot` - Shows status dot

**Usage**:
```tsx
<Badge variant="success" dot>Aktif</Badge>
```

### Alert
**Location**: `/src/components/Alert.tsx`

**Variants**: success, error, warning, info

**Features**:
- Auto icons based on variant
- Closeable
- Title and body content
- Animated entrance/exit

**Usage**:
```tsx
<Alert variant="error" title="Hata" onClose={handleClose}>
  İşlem başarısız oldu
</Alert>
```

### Modal
**Location**: `/src/components/Modal.tsx`

**Features**:
- Backdrop blur
- ESC to close
- Body scroll lock
- Size variants (sm, md, lg, xl)
- Animated

**Usage**:
```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Modal Başlığı">
  Modal content
</Modal>
```

### Tabs
**Location**: `/src/components/Tabs.tsx`

**Features**:
- Animated active indicator
- Icon support
- Accessible keyboard navigation

**Usage**:
```tsx
<Tabs
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <Content1 /> },
    { id: 'tab2', label: 'Tab 2', content: <Content2 /> },
  ]}
/>
```

## Pages

### AnaSayfa (Landing)
**Path**: `/`
**File**: `/src/pages/AnaSayfa.tsx`

**Sections**:
- Hero with gradient background
- Stats (4 metrics)
- Features (3 columns)
- Benefits with icons
- CTA section
- Footer

### GirisYap (Login)
**Path**: `/giris-yap`
**File**: `/src/pages/GirisYap.tsx`

**Features**:
- Split layout (branding + form)
- Email/password validation
- "Remember me" checkbox
- "Forgot password" link
- Error handling with Alert

### KayitOl (Sign Up)
**Path**: `/kayit-ol`
**File**: `/src/pages/KayitOl.tsx`

**Features**:
- Multi-section form (Personal, Business, Security)
- Real-time password strength indicator
- KVKK consent checkbox
- Comprehensive validation
- Error messages per field

### Dashboard
**Path**: `/panel`
**File**: `/src/pages/Dashboard.tsx`

**Features**:
- Collapsible sidebar (mobile responsive)
- Top navigation with search
- 4 stat cards
- Recent invoices table
- Quick actions sidebar
- Tax calendar widget

### Musteriler (Customers)
**Path**: `/panel/musteriler`
**File**: `/src/pages/Musteriler.tsx`

**Features**:
- Grid layout with cards
- Search functionality
- Customer details in cards
- Stats per customer
- Actions (view, edit, delete)

## Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Accessibility

### ARIA Labels
All interactive elements have proper ARIA labels in Turkish.

### Keyboard Navigation
- Tab navigation works throughout
- ESC closes modals and dropdowns
- Enter submits forms

### Focus States
All interactive elements have visible focus rings using:
```css
focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
```

### Screen Readers
- Semantic HTML elements
- Proper heading hierarchy
- Alt text on images
- Status messages announced

## Animations

### Framer Motion
Used for smooth, professional animations:
- Page transitions
- Modal entrance/exit
- Card hover effects
- Tab switching

### Principles
- Subtle and professional (no flashy effects)
- Fast (200-300ms duration)
- Reduced motion support (respects prefers-reduced-motion)

## Icons

**Library**: Lucide React

**Common Icons**:
- `Calculator` - Logo, branding
- `FileText` - Invoices
- `Users` - Customers
- `TrendingUp/Down` - Statistics
- `AlertCircle` - Warnings
- `CheckCircle` - Success

## State Management

### Zustand Store
**Location**: `/src/contexts/AuthContext.tsx`

**State**:
```tsx
{
  kullanici: User | null,
  yukleniyor: boolean,
  hata: string | null
}
```

**Actions**:
- `kayitOl(data)` - Register user
- `girisYap(data)` - Login user
- `cikisYap()` - Logout user
- `profilYukle()` - Load profile
- `hatayiTemizle()` - Clear errors

## API Integration

### Base URL
`http://localhost:3000/api/v1`

### Endpoints
- `POST /auth/kayit-ol` - Register
- `POST /auth/giris-yap` - Login
- `POST /auth/cikis-yap` - Logout
- `GET /auth/profil` - Get profile (requires Bearer token)

### Authentication
Bearer token stored in localStorage:
```tsx
localStorage.setItem('accessToken', token);
```

## Best Practices

### Component Structure
1. Imports (React, libraries, components)
2. Types/Interfaces
3. Component definition
4. State declarations
5. Effects
6. Event handlers
7. Render logic
8. Export

### Naming Conventions
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case (via Tailwind)

### File Organization
```
src/
  ├── api/          # API client and endpoints
  ├── components/   # Reusable components
  ├── contexts/     # Zustand stores
  ├── pages/        # Route pages
  ├── styles/       # Global styles
  └── utils/        # Helper functions
```

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Component composition over inheritance
- Keep components under 300 lines

## Performance

### Optimizations
- Lazy loading for routes (future)
- Image optimization
- Code splitting
- Memoization where needed
- Debounced search inputs

### Bundle Size
Current setup optimized for:
- Initial load: < 200KB (gzipped)
- Time to Interactive: < 3s (on 3G)

## Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- iOS Safari: Last 2 versions
- Android Chrome: Last 2 versions

## Development

### Start Dev Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Turkish Language

All UI text is in Turkish:
- Labels, buttons, headings
- Error messages
- Success messages
- Placeholder text
- Navigation items

### Common Terms
- Giriş Yap - Login
- Kayıt Ol - Sign Up
- Çıkış Yap - Logout
- Müşteri - Customer
- Fatura - Invoice
- Vergi - Tax
- SGK - Social Security
- Bekleyen - Pending
- Ödendi - Paid
- Gecikmiş - Overdue

---

**Last Updated**: January 22, 2025
**Version**: 1.0.0
