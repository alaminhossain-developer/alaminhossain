# Md. Al Amin Hossain - Premium Developer Portfolio

A high-performance, fully animated developer portfolio website built with Next.js, React, TypeScript, and GSAP.

**Domain:** https://alaminhossain.me

## 🚀 Features

### Design & UX
- ✅ Premium dark design system (near-black navy with cyan accents)
- ✅ Fully responsive mobile-first design
- ✅ Custom animated cursor (disabled on touch devices)
- ✅ Smooth scroll progress indicator
- ✅ Parallax scrolling with multiple depth layers
- ✅ Glass morphism cards and effects
- ✅ Smooth anchor navigation

### Sections
1. **Navigation** - Floating minimal nav + mobile menu
2. **Hero** - Asymmetric editorial layout with parallax
3. **Statement** - Large typography reveals
4. **Metrics** - Key statistics dashboard
5. **Services** - Horizontal scroll pinned section
6. **Featured Work** - Project case studies with alternating layouts
7. **Technology** - Interactive orbital skill visualization
8. **About** - Editorial profile + competencies
9. **Experience** - Animated vertical timeline
10. **Process** - Workflow methodology (horizontal scroll)
11. **Performance** - Technical metrics display
12. **Contact** - Contact form + direct links
13. **Footer** - Minimal footer with scroll-to-top

### Performance & SEO
- ✅ GSAP + ScrollTrigger animations (optimized)
- ✅ Framer Motion ready for component animations
- ✅ Image lazy loading and optimization
- ✅ Code splitting and dynamic imports
- ✅ Reduced motion support (accessibility)
- ✅ Comprehensive SEO metadata
- ✅ JSON-LD structured data
- ✅ Sitemap.xml generation
- ✅ robots.txt configuration
- ✅ Open Graph / Twitter cards
- ✅ PWA manifest.json

### Technology Stack
- **Framework:** Next.js 16.3.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP + ScrollTrigger
- **Motion:** Framer Motion
- **Smooth Scroll:** Lenis
- **Icons:** Lucide React
- **Package Manager:** npm

## 📋 Prerequisites

- Node.js 18+ (preferably 20+)
- npm 9+ or yarn 4+

## 🛠️ Installation

1. **Clone the repository:**
```bash
cd c:\Users\Al Amin Hossain\Documents\vs code\portfulio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env.local
```

4. **Update configuration files:**
   - Edit `lib/data.ts` with your actual projects, services, and experience
   - Update social links in components (LinkedIn, GitHub, etc.)
   - Replace email addresses with your contact info

## 🚀 Development

**Start development server:**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📦 Building for Production

**Build the project:**
```bash
npm run build
```

**Run production server:**
```bash
npm start
```

## 📁 Project Structure

```
portfulio/
├── app/
│   ├── layout.tsx              # Root layout with metadata & SEO
│   ├── page.tsx                # Main page (all sections)
│   ├── globals.css             # Global styles & animations
│   ├── sitemap.ts              # Dynamic sitemap generation
│   └── ...
├── components/
│   ├── navigation/
│   │   └── Navigation.tsx       # Header navigation
│   ├── hero/
│   │   └── Hero.tsx            # Hero section with parallax
│   ├── sections/
│   │   ├── Statement.tsx        # Statement section
│   │   ├── Services.tsx         # Horizontal scroll services
│   │   ├── FeaturedWork.tsx     # Project showcase
│   │   ├── Skills.tsx           # Technology orbital map
│   │   ├── About.tsx            # About section + timeline
│   │   ├── Process.tsx          # Workflow methodology
│   │   ├── Contact.tsx          # Contact form
│   │   └── Footer.tsx           # Footer
│   ├── cursor/
│   │   └── CustomCursor.tsx     # Custom cursor component
│   └── scroll/
│       ├── ScrollProgress.tsx    # Progress bar
│       └── SmoothScroll.tsx      # Lenis smooth scroll
├── lib/
│   ├── data.ts                 # All content (projects, services, etc)
│   ├── animations.ts           # GSAP animation utilities
│   └── utils.ts                # Helper functions
├── public/
│   ├── robots.txt              # SEO robots file
│   └── manifest.json           # PWA manifest
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

## 🎨 Customization

### Update Content
Edit `lib/data.ts` to update:
- Projects and case studies
- Services offered
- Work experience
- Skills and technologies
- Testimonials
- Metrics

### Update Styling
- **Colors:** Edit `tailwind.config.ts` for the color system
- **Typography:** Modify font sizes in `tailwind.config.ts`
- **Global Styles:** Update `app/globals.css`

### Update Navigation Links
- Update social links in `components/sections/Contact.tsx`
- Update email address to your contact email
- Update LinkedIn and GitHub URLs

### Add Project Images
1. Create directory: `public/images/projects/`
2. Add your project images (use WebP/AVIF for best performance)
3. Update image paths in `lib/data.ts`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

2. **Connect to Vercel:**
   - Visit https://vercel.com
   - Import your GitHub repository
   - Set environment variables (if needed)
   - Deploy with one click

### Deploy to Other Platforms

**Build for deployment:**
```bash
npm run build
npm start
```

## 📊 Performance Optimizations

- **Image Optimization:** Automatic WebP/AVIF conversion
- **Code Splitting:** Automatic chunk splitting for GSAP and vendors
- **Font Loading:** Google Fonts with variable fonts
- **CSS:** Tailwind CSS tree-shaking (only used styles included)
- **JavaScript:** Minified and split into optimal chunks
- **Caching:** Strategic cache headers for static assets
- **Reduced Motion:** Respects `prefers-reduced-motion` media query

## ♿ Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where needed
- High contrast text
- Focus states on interactive elements
- Alternative text for images (via next/image)
- Reduced motion support

## 🔐 Security

- HTTPS enforcement (Strict-Transport-Security)
- XSS protection headers
- Clickjacking protection (X-Frame-Options)
- Content-Type sniffing protection
- Referrer policy

## 📝 SEO Features

- Automatic sitemap generation
- robots.txt configuration
- JSON-LD structured data (Person + WebSite schema)
- Open Graph meta tags
- Twitter Card meta tags
- Canonical URLs
- Meta descriptions
- Keyword optimization
- Mobile-friendly design

## 🎯 Best Practices

- **Performance:** Images are lazy-loaded and optimized
- **Code Quality:** TypeScript for type safety
- **Maintainability:** Reusable components and utilities
- **Animations:** Hardware-accelerated transforms only
- **Responsiveness:** Mobile-first approach
- **Scalability:** Modular component structure

## 📚 Animation Libraries

### GSAP
- ScrollTrigger plugin for scroll animations
- Create parallax effects
- Staggered animations
- Counter animations

### Framer Motion
- Ready to use for component-level animations
- Card hover effects
- Transition animations

### Lenis
- Smooth scrolling implementation
- Momentum-based scrolling

## 🐛 Troubleshooting

### Custom cursor not showing
- Check if device is touch-enabled (custom cursor is disabled on touch)
- Verify browser console for errors
- Clear browser cache

### Animations not smooth
- Ensure GSAP is properly registered with ScrollTrigger
- Check `prefers-reduced-motion` setting
- Reduce number of parallax layers if needed

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## 📞 Support

For issues or questions:
- Email: contact@alaminhossain.me
- LinkedIn: [Profile URL]
- GitHub: [Profile URL]

## 📄 License

This portfolio is built specifically for Md. Al Amin Hossain.
Personal use only. Not for distribution or resale.

## 🙏 Credits

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Animations:** GSAP, Framer Motion
- **Smooth Scroll:** Lenis
- **Icons:** Lucide React

---

**Last Updated:** September 2026
**Version:** 1.0.0
