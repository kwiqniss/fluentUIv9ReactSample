# Debugging Guide

## Quick Start - Debug in Browser

### Method 1: Browser DevTools (Easiest)
1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Open the application:** http://localhost:3000

3. **Open Chrome/Edge DevTools:**
   - Press `F12` or `Ctrl+Shift+I`
   - Go to **Sources** tab
   - Your TypeScript files will be available under `webpack://` > `src/`

4. **Set breakpoints:**
   - Click on line numbers in your source files
   - Breakpoints will pause execution when hit

### Method 2: VS Code Browser Debugging
1. **Install VS Code Extensions:**
   - "Debugger for Chrome" (if using Chrome)
   - "Debugger for Microsoft Edge" (if using Edge)

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Launch debugger in VS Code:**
   - Press `F5` or go to **Run and Debug** panel
   - Select "Launch Chrome" or "Launch Edge"
   - VS Code will open a new browser window with debugging attached

4. **Set breakpoints in VS Code:**
   - Click on the left margin of any line in your `.tsx` files
   - Red dots indicate active breakpoints

## Debugging Different Scenarios

### 🎯 Debug React Components
```typescript
// Add to any component for debugging
useEffect(() => {
  console.log('Component mounted');
  debugger; // This will pause execution
}, []);

// Debug props and state
console.log('Current state:', { textValue, emailValue });
```

### 🔍 Debug FluentUI Components
```typescript
// Debug FluentUI event handlers
const handleInputChange = (e) => {
  debugger; // Pause here
  console.log('Input event:', e);
  console.log('Target value:', e.target.value);
  setTextValue(e.target.value);
};
```

### 🎪 Debug Focus Management
```typescript
// Debug focus events
const handleOpenDialog = () => {
  debugger; // Pause here
  console.log('Currently focused:', document.activeElement);
  lastFocusedElement.current = document.activeElement as HTMLElement;
  setIsDialogOpen(true);
};
```

### 📊 Debug Dialog State
```typescript
// Add to dialog component
useEffect(() => {
  console.log('Dialog state changed:', isDialogOpen);
  if (isDialogOpen) {
    debugger; // Pause when dialog opens
  }
}, [isDialogOpen]);
```

## VS Code Debugging Features

### Setting Breakpoints
- **Line Breakpoints:** Click line numbers
- **Conditional Breakpoints:** Right-click breakpoint → "Edit Breakpoint"
- **Logpoints:** Add console.log without modifying code

### Debug Console
- Evaluate expressions: `textValue`, `document.activeElement`
- Call functions: `addMessage("Debug message")`
- Inspect objects: `JSON.stringify(state, null, 2)`

### Watch Variables
- Add variables to **Watch** panel
- Monitor state changes in real-time
- Examples: `selectedTab`, `isDialogOpen`, `messages.length`

## Browser-Specific Debugging

### Chrome DevTools
1. **Application Tab:** Inspect local storage, cookies
2. **Network Tab:** Monitor API calls
3. **Performance Tab:** Analyze rendering performance
4. **Lighthouse Tab:** Performance audits

### React Developer Tools
1. **Install Extension:** React Developer Tools for Chrome/Edge
2. **Components Tab:** Inspect React component tree
3. **Profiler Tab:** Performance profiling

## Debug Commands

### Available NPM Scripts
```bash
# Development with enhanced source maps
npm run start:debug

# Build with debug info
npm run build:debug

# Type checking only
npm run type-check
```

## Common Debugging Scenarios

### 1. Component Not Rendering
```typescript
// Check if component is being imported/used
console.log('BasicInputsTab rendering');

// Check props
console.log('Props received:', props);

// Check conditional rendering
console.log('Should render:', selectedTab === 'basic');
```

### 2. Event Handlers Not Working
```typescript
// Verify event binding
<Button onClick={(e) => {
  console.log('Button clicked:', e);
  debugger;
  handleSubmit();
}}>
```

### 3. State Updates Not Reflecting
```typescript
// Debug state updates
const [textValue, setTextValue] = useState('');

const updateText = (newValue) => {
  console.log('Old value:', textValue);
  console.log('New value:', newValue);
  setTextValue(newValue);
};

// Check if re-render happens
useEffect(() => {
  console.log('Text value changed:', textValue);
}, [textValue]);
```

### 4. FluentUI Components Issues
```typescript
// Check FluentUI theme
console.log('Theme:', useTheme());

// Debug component props
<Input 
  {...props}
  ref={(ref) => {
    console.log('Input ref:', ref);
    return ref;
  }}
/>
```

## Advanced Debugging

### Network Debugging
- Monitor bundle loading in Network tab
- Check for failed resource loads
- Analyze bundle size and loading times

### Memory Debugging
- Use Chrome Memory tab for memory leaks
- Monitor component unmounting
- Check for event listener cleanup

### Performance Debugging
- Use React DevTools Profiler
- Monitor re-render causes
- Check for unnecessary re-renders

## Troubleshooting

### Source Maps Not Working
1. Ensure development server is running: `npm start`
2. Check webpack.config.js has `devtool: 'eval-source-map'`
3. Clear browser cache (`Ctrl+Shift+Delete`)

### Breakpoints Not Hitting
1. Verify source maps are loaded (Sources tab should show TypeScript files)
2. Try refreshing the page after setting breakpoints
3. Use `debugger;` statements as fallback

### VS Code Debug Not Connecting
1. Ensure development server is running on port 3000
2. Check if another VS Code instance is debugging
3. Try "Attach to Chrome" configuration

## Debug Tips

1. **Use Console Strategically:** Place logs before/after state changes
2. **Breakpoint Conditions:** Set breakpoints only when certain conditions are met
3. **Component Lifecycle:** Debug mount/unmount cycles
4. **Props vs State:** Distinguish between prop changes and state updates
5. **Event Bubbling:** Understand event propagation in React

## Example Debug Session

```typescript
// 1. Set breakpoint in BasicInputsTab.tsx
const handleOpenDialog = () => {
  debugger; // VS Code will pause here
  
  // 2. In debug console, inspect:
  // - document.activeElement
  // - lastFocusedElement.current
  // - isDialogOpen
  
  lastFocusedElement.current = document.activeElement as HTMLElement;
  setIsDialogOpen(true); // Step over to see state change
};
```

Happy debugging! 🐛🔍
