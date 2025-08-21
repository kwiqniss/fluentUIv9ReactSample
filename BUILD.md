# Build Guide

## Quick Start

### Development Server
```bash
npm start
```
This starts the development server at http://localhost:3000 with hot reloading.

### Production Build
```bash
npm run build
```
This creates an optimized production build in the `dist` folder.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with hot reloading |
| `npm run build` | Create production build |
| `npm run dev` | Start dev server and open in browser |
| `npm run type-check` | Run TypeScript type checking without building |
| `npm run clean` | Clean build artifacts and cache |

## Build Output

The production build creates:
- `dist/bundle.js` - Minified JavaScript bundle (~599KB)
- `dist/index.html` - Main HTML file
- Source maps for debugging

## Troubleshooting

### Module Resolution Errors
If you see errors like "Cannot find module './components/DateTimeTab'":

1. **Clean and rebuild:**
   ```bash
   npm run clean
   npm install
   npm run build
   ```

2. **Type check separately:**
   ```bash
   npm run type-check
   ```

3. **Clear VS Code TypeScript cache:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "TypeScript: Restart TS Server"
   - Press Enter

### Build Performance
The build produces warnings about bundle size. This is normal for a FluentUI application. To optimize:

1. **Enable code splitting** (for larger applications)
2. **Tree shaking** is already enabled in production mode
3. **Lazy loading** can be implemented for tabs if needed

### Development vs Production
- **Development:** Uses `webpack serve` with hot reloading and source maps
- **Production:** Creates minified, optimized bundles with tree shaking

## File Structure After Build

```
dist/
├── bundle.js          # Minified application bundle
├── bundle.js.map     # Source map for debugging  
└── index.html        # Entry HTML file
```

## Deployment

The `dist` folder contains everything needed for deployment:
1. Copy all files from `dist/` to your web server
2. Configure your server to serve `index.html` for all routes (SPA)
3. Ensure proper MIME types for `.js` and `.map` files

## Build Configuration

The build uses:
- **TypeScript:** For type safety and modern JS features
- **Webpack 5:** Module bundling and optimization
- **ts-loader:** TypeScript compilation with transpileOnly for faster builds
- **Production optimizations:** Minification, tree shaking, code splitting

## Environment Variables

You can set environment-specific variables:
- `NODE_ENV=production` (automatically set by webpack)
- Custom variables can be added to webpack configuration

## Performance Notes

The current bundle size (~599KB) includes:
- React 18 runtime
- FluentUI v9 components
- Application code

This is typical for FluentUI applications and provides excellent user experience with Microsoft's design system.
