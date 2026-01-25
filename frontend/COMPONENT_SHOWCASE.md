# Component Showcase - ADE Frontend

## Color Palette Reference

### Primary Colors (Used throughout)
```css
Amber:    #F59E0B  /* Main CTAs, buttons, highlights */
Teal:     #14B8A6  /* Secondary actions, success states */
Cyan:     #06B6D4  /* Accents, info states */
```

### Gradients
```tsx
// Primary Button Gradient
className="bg-gradient-to-r from-amber-500 to-amber-600"

// Glow Effect Gradient (appears on hover)
className="bg-gradient-to-r from-amber-500 via-teal-500 to-cyan-500"

// Background Gradient
className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
```

---

## Reusable Components

### 1. Glassmorphism Card

**Usage**: Feature cards, pricing cards, forms, stats

```tsx
<div className="group relative">
  {/* Glow effect (appears on hover) */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

  {/* Card content */}
  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
    <h3 className="text-white text-xl font-bold">Card Title</h3>
    <p className="text-white/70">Card description</p>
  </div>
</div>
```

**Where Used**:
- AnaSayfa: Feature cards, pricing cards
- GirisYap: Login form card
- KayitOl: Sign up form card
- Dashboard: Stats cards, activity feed

---

### 2. Primary Button (CTA)

**Usage**: Main actions, form submissions

```tsx
<button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
  Button Text
  <ArrowRight className="w-5 h-5" />
</button>
```

**Features**:
- Gradient background (amber)
- Glowing shadow on hover
- Scale animation (105%)
- Disabled state handling
- Icon support

**Where Used**:
- AnaSayfa: "Ücretsiz Başla", pricing "Başla"
- GirisYap: "Giriş Yap"
- KayitOl: "Hesap Oluştur"
- Dashboard: Quick action buttons

---

### 3. Secondary Button

**Usage**: Alternative actions, cancel buttons

```tsx
<button className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl font-semibold hover:bg-white/15 transition-all duration-300">
  Secondary Action
</button>
```

**Features**:
- Transparent background
- Border with opacity
- Subtle hover effect
- Matches glassmorphism theme

**Where Used**:
- AnaSayfa: "Demo İzle"
- Dashboard: Secondary actions

---

### 4. Input Field

**Usage**: Forms (login, sign up, search)

```tsx
<div className="relative">
  {/* Icon */}
  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />

  {/* Input */}
  <input
    type="email"
    placeholder="Email adresiniz"
    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all disabled:opacity-50"
  />
</div>
```

**Features**:
- Left icon support
- Glassmorphism background
- Focus ring animation
- Disabled state
- Placeholder styling

**Where Used**:
- GirisYap: Email, password
- KayitOl: All form fields
- Dashboard: Search bar

---

### 5. Password Input with Toggle

**Usage**: Secure password entry

```tsx
<div className="relative">
  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />

  <input
    type={showPassword ? 'text' : 'password'}
    placeholder="••••••••"
    className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
  >
    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  </button>
</div>
```

**Features**:
- Show/hide toggle
- Icon indicators
- Security by default
- Accessible button

**Where Used**:
- GirisYap: Password field
- KayitOl: Password field

---

### 6. Password Strength Indicator

**Usage**: Sign up password validation

```tsx
{/* Progress bar */}
<div className="flex items-center gap-2">
  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
    <div
      className={`h-full transition-all duration-300 ${
        strength <= 1 ? 'bg-red-500' :
        strength <= 3 ? 'bg-amber-500' :
        'bg-teal-500'
      }`}
      style={{ width: `${(strength / 5) * 100}%` }}
    />
  </div>
  <span className="text-xs text-white/60">
    {strength <= 1 ? 'Zayıf' : strength <= 3 ? 'Orta' : 'Güçlü'}
  </span>
</div>
```

**Features**:
- 5-level strength calculation
- Color-coded (red/amber/teal)
- Animated width transition
- Text indicator

**Where Used**:
- KayitOl: Below password field

---

### 7. Error Alert

**Usage**: Form validation errors, API errors

```tsx
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
  role="alert"
  aria-live="polite"
>
  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
  <p className="text-red-400 text-sm">{errorMessage}</p>
</motion.div>
```

**Features**:
- Animated entrance
- Icon + message layout
- Accessible (ARIA)
- Red color scheme

**Where Used**:
- GirisYap: Login errors
- KayitOl: Validation errors

---

### 8. Loading Button State

**Usage**: Async actions (submit, save)

```tsx
<button disabled={loading}>
  {loading ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin" />
      Loading...
    </>
  ) : (
    <>
      Submit
      <ArrowRight className="w-5 h-5" />
    </>
  )}
</button>
```

**Features**:
- Spinning loader icon
- Disabled during loading
- Text change
- Icon swap

**Where Used**:
- GirisYap: "Giriş Yapılıyor..."
- KayitOl: "Hesap Oluşturuluyor..."

---

### 9. Stat Card (Dashboard)

**Usage**: Display metrics with trends

```tsx
<div className="group relative">
  {/* Glow */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all">
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
        <DollarSign className="w-6 h-6 text-white" />
      </div>

      {/* Trend */}
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-teal-500/20 text-teal-400">
        <ArrowUp className="w-4 h-4" />
        <span className="text-sm font-semibold">+12.5%</span>
      </div>
    </div>

    {/* Data */}
    <h3 className="text-white/70 text-sm mb-1">Toplam Gelir</h3>
    <p className="text-3xl font-bold text-white tracking-tight">₺124,550</p>
  </div>
</div>
```

**Features**:
- Icon with gradient background
- Trend indicator (up/down)
- Large value display
- Hover glow effect

**Where Used**:
- Dashboard: 4 stat cards (revenue, customers, invoices, pending)

---

### 10. Activity Feed Item

**Usage**: Recent actions, notifications

```tsx
<div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
  {/* Icon */}
  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
    <FileText className="w-5 h-5 text-white" />
  </div>

  {/* Content */}
  <div className="flex-1 min-w-0">
    <p className="text-white font-medium text-sm mb-0.5">
      Yeni Fatura Oluşturuldu
    </p>
    <p className="text-white/60 text-xs">
      Acme Corp. - #INV-2024-0142
    </p>
  </div>

  {/* Time */}
  <span className="text-white/40 text-xs flex-shrink-0">
    5 dk önce
  </span>
</div>
```

**Features**:
- Color-coded icons
- Two-line content
- Timestamp
- Hover effect

**Where Used**:
- Dashboard: Recent activity section

---

### 11. Pricing Card

**Usage**: Subscription plans

```tsx
<div className="group relative">
  {/* Popular badge (conditional) */}
  {popular && (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
        <Star className="w-4 h-4" fill="currentColor" />
        Popüler
      </div>
    </div>
  )}

  {/* Glow */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all" />

  <div className="relative backdrop-blur-xl border rounded-2xl p-8 bg-white/20">
    {/* Plan name */}
    <h3 className="text-2xl font-bold text-white mb-2">Profesyonel</h3>

    {/* Price */}
    <div className="mb-6">
      <span className="text-5xl font-bold text-white">₺599</span>
      <span className="text-white/60 ml-2">/ay</span>
    </div>

    {/* Features */}
    <ul className="space-y-4 mb-8">
      {features.map((feature) => (
        <li className="flex items-start gap-3">
          <Check className="w-5 h-5 text-teal-400 flex-shrink-0" />
          <span className="text-white/80">{feature}</span>
        </li>
      ))}
    </ul>

    {/* CTA */}
    <button className="w-full py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-2xl hover:scale-105 transition-all">
      Başla
    </button>
  </div>
</div>
```

**Features**:
- Popular badge
- Price display
- Feature checklist
- Full-width CTA
- Enhanced glow for popular

**Where Used**:
- AnaSayfa: 3 pricing tiers

---

### 12. Sidebar Navigation

**Usage**: Dashboard menu

```tsx
<aside className="fixed left-0 top-0 h-full w-64 bg-white/5 backdrop-blur-xl border-r border-white/10">
  <div className="flex flex-col h-full p-6">
    {/* Logo */}
    <div className="flex items-center gap-2 mb-8">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-bold text-white">ADE</span>
    </div>

    {/* Nav items */}
    <nav className="flex-1 space-y-2">
      {navItems.map((item) => (
        <Link
          to={item.path}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            item.active
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>

    {/* User profile */}
    <div className="pt-6 border-t border-white/10">
      {/* Profile info & logout */}
    </div>
  </div>
</aside>
```

**Features**:
- Fixed positioning
- Logo section
- Active state highlighting
- User profile at bottom
- Glassmorphism background

**Where Used**:
- Dashboard: Main navigation

---

### 13. Mobile Hamburger Menu

**Usage**: Responsive navigation toggle

```tsx
{/* Button */}
<button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
>
  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
</button>

{/* Sidebar with conditional transform */}
<aside className={`fixed left-0 top-0 h-full w-64 transition-transform duration-300 ${
  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
} lg:translate-x-0`}>
  {/* Sidebar content */}
</aside>

{/* Overlay */}
{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}
```

**Features**:
- Animated slide-in
- Backdrop overlay
- Click outside to close
- Hidden on desktop (lg+)

**Where Used**:
- Dashboard: Mobile menu

---

### 14. Animated Background Mesh

**Usage**: Page backgrounds

```tsx
{/* Container */}
<div className="fixed inset-0 opacity-30">
  <div className="absolute top-0 -left-4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
  <div className="absolute top-0 -right-4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
  <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
</div>

{/* CSS */}
<style>{`
  @keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-4000 { animation-delay: 4s; }
`}</style>
```

**Features**:
- 3 colored blobs
- Floating animation (7s)
- Staggered delays
- Blend mode for color mixing

**Where Used**:
- All pages: Background decoration

---

## Framer Motion Patterns

### Fade In Up
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

<motion.div variants={fadeInUp} initial="initial" animate="animate">
  Content
</motion.div>
```

### Scale In
```tsx
const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4 }
};
```

### Stagger Children
```tsx
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

<motion.div variants={staggerContainer} initial="initial" animate="animate">
  {items.map((item) => (
    <motion.div variants={fadeInUp}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Conditional Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Appears when scrolled into view
</motion.div>
```

---

## Icon Usage Patterns

### With Text
```tsx
<button className="flex items-center gap-2">
  <Sparkles className="w-5 h-5" />
  Button Text
</button>
```

### In Circle
```tsx
<div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
  <Icon className="w-6 h-6 text-white" />
</div>
```

### As Input Prefix
```tsx
<div className="relative">
  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
  <input className="pl-12 ..." />
</div>
```

---

## Layout Patterns

### Section Container
```tsx
<section className="py-32 px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Responsive Grid
```tsx
{/* 1 col mobile, 2 tablet, 3 desktop */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => <Card key={item.id} {...item} />)}
</div>
```

### Centered Content
```tsx
<div className="min-h-screen flex items-center justify-center p-6">
  <div className="w-full max-w-md">
    {/* Centered content */}
  </div>
</div>
```

---

## Accessibility Checklist

- [ ] All buttons have aria-label
- [ ] Form inputs have associated labels
- [ ] Error messages use aria-live="polite"
- [ ] Focus indicators visible (ring-2)
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Interactive elements are focusable
- [ ] Images have alt text (if added)

---

## Performance Tips

1. **Use GPU acceleration**: `transform` and `opacity` for animations
2. **Limit backdrop-blur**: Only on necessary elements
3. **Memoize expensive components**: Use React.memo if needed
4. **Lazy load images**: Add loading="lazy" when applicable
5. **Code split routes**: React Router handles this automatically

---

**Reference**: See `DESIGN_SYSTEM.md` for complete guidelines
**Examples**: Check each page file for implementation details
