import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { useFluentBreakpoint, fluentMediaQueries } from '../hooks/useFluentBreakpoint';

/**
 * Demo component showing how to use FluentUI-aligned responsive breakpoints
 */
const useResponsiveDemoStyles = makeStyles({
  container: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusSmall,
    
    // Using FluentUI-aligned media queries
    [fluentMediaQueries.mobile]: {
      padding: tokens.spacingVerticalS,
      fontSize: tokens.fontSizeBase200,
    },
    
    [fluentMediaQueries.tablet]: {
      padding: tokens.spacingVerticalM,
      fontSize: tokens.fontSizeBase300,
    },
    
    [fluentMediaQueries.desktop]: {
      padding: tokens.spacingVerticalL,
      fontSize: tokens.fontSizeBase400,
    },
  },
  
  info: {
    marginTop: tokens.spacingVerticalS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
});

export const ResponsiveDemo: React.FC = () => {
  const styles = useResponsiveDemoStyles();
  const breakpoint = useFluentBreakpoint();
  
  return (
    <div className={styles.container}>
      <h3>FluentUI Responsive Breakpoints Demo</h3>
      <div className={styles.info}>
        <strong>Current Breakpoint:</strong> {breakpoint.currentBreakpoint}<br/>
        <strong>Window Width:</strong> {breakpoint.windowWidth}px<br/>
        <strong>Is Mobile:</strong> {breakpoint.isMobile ? 'Yes' : 'No'}<br/>
        <strong>Is Desktop:</strong> {breakpoint.isDesktop ? 'Yes' : 'No'}<br/>
      </div>
      
      <p>
        This component uses FluentUI-aligned breakpoints:
        <br/>• Small: &lt;480px (mobile)
        <br/>• Medium: 480-639px (large mobile)  
        <br/>• Large: 640-1023px (tablet)
        <br/>• XLarge: 1024-1365px (desktop)
        <br/>• XXLarge: &gt;1366px (large desktop)
      </p>
      
      {breakpoint.isMobile && (
        <p style={{ color: tokens.colorPaletteBlueForeground2 }}>
          📱 Mobile experience optimized
        </p>
      )}
      
      {breakpoint.isDesktop && (
        <p style={{ color: tokens.colorPaletteGreenForeground2 }}>
          🖥️ Desktop experience with full features
        </p>
      )}
    </div>
  );
};

export default ResponsiveDemo;
