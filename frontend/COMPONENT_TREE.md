# ADE Muhasebe - Component Tree

## Component Hierarchy

```
App.tsx (Router)
│
├── AnaSayfa (/)
│   ├── Navigation Bar
│   │   └── Button (Giriş Yap, Ücretsiz Başla)
│   ├── Hero Section
│   │   ├── Heading
│   │   ├── Subtitle
│   │   └── Button (CTAs)
│   ├── Stats Section
│   │   └── 4 × Stat Cards
│   ├── Features Section
│   │   └── 3 × Card (Feature Cards)
│   ├── Benefits Section
│   │   ├── 6 × Benefit Items
│   │   └── 4 × Card (Small Feature Cards)
│   ├── CTA Section
│   │   └── Button
│   └── Footer
│
├── GirisYap (/giris-yap)
│   ├── Branding Side (Desktop)
│   │   ├── Logo
│   │   ├── Heading
│   │   └── Feature List
│   ├── Form Side
│   │   ├── Card (Form Container)
│   │   │   ├── Input (Email)
│   │   │   ├── Input (Password)
│   │   │   ├── Checkbox (Remember Me)
│   │   │   └── Button (Submit)
│   │   └── Alert (Error Messages)
│   └── Links (Sign Up, Forgot Password)
│
├── KayitOl (/kayit-ol)
│   ├── Branding Side (Desktop)
│   │   ├── Logo
│   │   ├── Heading
│   │   └── Feature List
│   ├── Form Side
│   │   ├── Card (Form Container)
│   │   │   ├── Section: Personal Info
│   │   │   │   ├── Input (Ad)
│   │   │   │   ├── Input (Soyad)
│   │   │   │   ├── Input (Email)
│   │   │   │   └── Input (Telefon)
│   │   │   ├── Section: Business Info
│   │   │   │   └── Input (İşletme Adı)
│   │   │   ├── Section: Security
│   │   │   │   ├── Input (Şifre)
│   │   │   │   ├── Password Strength Indicator
│   │   │   │   └── Input (Şifre Tekrar)
│   │   │   ├── Checkbox (KVKK)
│   │   │   └── Button (Submit)
│   │   └── Alert (Error Messages)
│   └── Link (Login)
│
└── Dashboard (/panel) [Protected]
    ├── Sidebar
    │   ├── Logo
    │   ├── Navigation Items
    │   └── User Section
    │       ├── User Avatar
    │       ├── Settings Button
    │       └── Logout Button
    ├── Top Navigation
    │   ├── Hamburger Menu (Mobile)
    │   ├── Search Input
    │   ├── Notification Button
    │   └── User Dropdown Menu
    ├── Main Content
    │   ├── Welcome Section
    │   ├── Stats Grid
    │   │   └── 4 × Card (Stat Cards)
    │   │       ├── Icon
    │   │       ├── Title
    │   │       ├── Value
    │   │       └── Badge (Change)
    │   ├── Content Grid
    │   │   ├── Recent Invoices (2/3 width)
    │   │   │   ├── Card
    │   │   │   └── Table
    │   │   │       ├── Header Row
    │   │   │       └── Data Rows
    │   │   │           ├── Invoice Data
    │   │   │           ├── Badge (Status)
    │   │   │           └── Action Buttons
    │   │   └── Sidebar (1/3 width)
    │   │       ├── Card (Quick Actions)
    │   │       │   └── 3 × Button
    │   │       └── Card (Tax Calendar)
    │   │           └── 4 × Calendar Items
    │   └── Mobile Sidebar Overlay
    │
    └── Musteriler (/panel/musteriler) [Protected]
        ├── Same Sidebar
        ├── Same Top Navigation
        └── Main Content
            ├── Header
            │   ├── Title
            │   └── Button (New Customer)
            ├── Search & Filter Bar
            │   ├── Card
            │   │   ├── Input (Search)
            │   │   └── Button (Filter)
            └── Customer Grid
                └── N × Card (Customer Cards)
                    ├── Customer Icon
                    ├── Name
                    ├── Badge (Status)
                    ├── Contact Details
                    │   ├── Person Icon + Name
                    │   ├── Email Icon + Email
                    │   ├── Phone Icon + Phone
                    │   └── Location Icon + Address
                    ├── Stats
                    │   ├── Invoice Count
                    │   └── Total Amount
                    └── Action Buttons
                        ├── Button (View)
                        ├── Edit Icon Button
                        └── Delete Icon Button
```

## Reusable Components Used

### Button
- **Used in**: All pages
- **Instances**: ~30+
- **Variants**: primary, secondary, outline, ghost, danger

### Input
- **Used in**: GirisYap, KayitOl
- **Instances**: ~10
- **Features**: Labels, errors, icons, password toggle

### Card
- **Used in**: All pages
- **Instances**: ~50+
- **Use cases**: Stat cards, feature cards, form containers, customer cards

### Badge
- **Used in**: Dashboard, Musteriler
- **Instances**: ~20+
- **Use cases**: Status indicators, change indicators

### Alert
- **Used in**: GirisYap, KayitOl
- **Instances**: ~2
- **Use cases**: Error messages, success messages

### Modal
- **Ready for use**: Not currently used but available
- **Future use**: Confirmation dialogs, detail views, forms

### Tabs
- **Ready for use**: Not currently used but available
- **Future use**: Settings page, report filters, invoice types

## Page Component Breakdown

### AnaSayfa
- **Lines of code**: ~500
- **Components used**: Button, Card, Badge
- **Sections**: 7
- **Animations**: Framer Motion on scroll

### GirisYap
- **Lines of code**: ~280
- **Components used**: Button, Input, Card, Alert
- **Form fields**: 2
- **Validation**: Real-time

### KayitOl
- **Lines of code**: ~480
- **Components used**: Button, Input, Card, Alert
- **Form fields**: 7
- **Sections**: 3
- **Special features**: Password strength indicator

### Dashboard
- **Lines of code**: ~620
- **Components used**: Button, Card, Badge
- **Sections**: 6
- **Data displays**: Stats, table, calendar
- **Special features**: Collapsible sidebar, user menu

### Musteriler
- **Lines of code**: ~490
- **Components used**: Button, Card, Badge, Input
- **Data display**: Grid of cards
- **Special features**: Real-time search, empty state

## Total Statistics

- **Total Components**: 7 reusable + 5 pages = 12 files
- **Total Lines of Code**: ~3,500+
- **Button instances**: 30+
- **Card instances**: 50+
- **Input instances**: 10+
- **Badge instances**: 20+
- **Icons used**: 40+ different icons
- **Color variants**: 5 primary palettes
- **Responsive breakpoints**: 4 (sm, md, lg, xl)
- **Animations**: ~20 different animation configs

## Design Tokens

### Colors (from Tailwind config)
- Primary: 10 shades
- Secondary: 10 shades
- Accent: 10 shades
- Danger: 10 shades
- Gray: 10 shades
**Total**: 50 color tokens

### Typography
- Font sizes: 12
- Font weights: 6
- Line heights: Auto calculated
**Total**: ~20 typography tokens

### Spacing
- Using Tailwind's default scale
- Custom gaps: 4, 6, 8
**Total**: ~40 spacing tokens

### Shadows
- Card shadow
- Hover shadow
- Soft shadow
**Total**: 3 shadow tokens

### Animations
- fadeIn
- slideUp
- slideDown
- Framer Motion configs
**Total**: 10+ animation patterns

## State Management

### Zustand Store (AuthContext)
```
State:
- kullanici: User | null
- yukleniyor: boolean
- hata: string | null

Actions:
- kayitOl()
- girisYap()
- cikisYap()
- profilYukle()
- hatayiTemizle()
```

### Local State (per component)
- Form data
- UI state (modals, menus)
- Search queries
- Filter states

## Routing

```
Public Routes:
  / → AnaSayfa
  /giris-yap → GirisYap
  /kayit-ol → KayitOl

Protected Routes:
  /panel → Dashboard
  /panel/musteriler → Musteriler
  
(More protected routes can be added)
```

## Accessibility Features

- ARIA labels: ~100+ instances
- Focus states: All interactive elements
- Keyboard navigation: Full support
- Screen reader support: Semantic HTML
- Alt text: All images (when added)
- Form labels: All inputs
- Error announcements: Via ARIA

---

**Component Tree Version**: 1.0.0
**Last Updated**: January 22, 2025
