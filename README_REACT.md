# Rwanda Tour - React Version

This is a React conversion of the original PHP "Rwanda in 7 Days - Signature Circuit (Premium)" website for Forever Young Tours.

## Project Structure

```
src/
├── components/
│   ├── Topbar.jsx          # Rotating ticker banner
│   ├── Header.jsx           # Navigation header
│   ├── Hero.jsx             # Hero section with tour snapshot
│   ├── Highlights.jsx       # Signature experience benefits
│   ├── Itinerary.jsx        # Day-by-day itinerary (7 days)
│   ├── Pricing.jsx          # Premium pricing and inclusions
│   ├── Reviews.jsx          # Traveler testimonials
│   ├── CTA.jsx              # Call-to-action booking section
│   └── Footer.jsx           # Footer with links and info
├── styles/
│   └── globals.css          # All styling (from original PHP)
├── App.jsx                  # Main app component
├── main.jsx                 # React entry point
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts

public/
├── images/                  # All original images (unchanged)
│   ├── logo.png
│   ├── placeholder.jpg
│   ├── image 1.png
│   ├── image 2.png
│   ├── image 3.png
│   ├── image 4.png
│   ├── city break.jpg
│   ├── adventure tours.jpg
│   ├── cultural exchange.jpg
│   └── [other images...]
```

## Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn package manager

### Install Dependencies

```bash
npm install
```

### Development Server

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

You can navigate through all sections using the navigation menu and scroll anchors.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The compiled files will be in the `dist/` folder, ready to be deployed.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Visual Design

✅ **Pixel-Perfect Match**: The React version maintains 100% visual parity with the original PHP website.

- All CSS styling is preserved exactly as it existed
- Layout, spacing, colors, and typography are identical
- Responsive design is fully maintained
- All images and assets use the same paths
- Animations and transitions are replicated

## Key Features

### Rotating Ticker
The topbar displays rotating messages that change every 4.2 seconds using React's `useState` and `useEffect` hooks.

### Mobile-Responsive Navigation
The hamburger menu (on screens <860px) toggles the navigation menu with state management.

### Smooth Scrolling
All navigation links use anchor links (`#overview`, `#highlights`, etc.) for smooth scrolling.

### CSS Animations
Scroll animations (slideUp, scaleIn) are maintained through CSS without needing additional JavaScript libraries.

### Fully Semantic HTML
The component structure mirrors the original PHP sections exactly.

## Component Breakdown

| Component | Purpose |
|-----------|---------|
| **Topbar** | Displays rotating event/tour announcements |
| **Header** | Main navigation with logo, menu links, and CTA button |
| **Hero** | Large hero section with tour overview and snapshot panel |
| **Highlights** | 4 key benefits with 4 feature cards |
| **Itinerary** | 7-day breakdown with images and descriptions |
| **Pricing** | Pricing details with inclusions/exclusions |
| **Reviews** | 3 testimonials with star ratings |
| **CTA** | Call-to-action section with booking buttons |
| **Footer** | Multi-column footer with links and copyright |

## Styling

All styles are in `src/styles/globals.css` and include:
- CSS variables for colors and spacing
- Responsive breakpoints (@media queries)
- Glassmorphism effects (backdrop filters)
- Gradient backgrounds and overlays
- Smooth transitions and animations
- Mobile-first responsive design

## Deployment

To deploy this React app:

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting:
   - Vercel (recommended for React)
   - Netlify
   - AWS S3 + CloudFront
   - Traditional web server (nginx, Apache)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Original PHP Version

The original PHP version (`index.php`) is still available in the root directory for reference. The React version is a complete feature-for-feature conversion with identical visual design.

## Notes

- All image paths remain unchanged (`public/images/`)
- The React app is fully self-contained and doesn't depend on the original PHP
- State management is minimal (only for interactive elements like menu toggles)
- No external UI libraries are used - pure React with CSS
- Fully compatible with modern build tools and CI/CD pipelines

## Support

For questions or issues with the React conversion, please refer to the original design specifications in the `UNIVERSAL-DESIGN-SYSTEM-DOCUMENTATION.txt` file.
