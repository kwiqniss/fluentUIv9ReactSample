import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Tab,
  TabList,
  TabValue,
  Body1,
  Caption1,
  SelectTabEvent,
  SelectTabData,
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Dropdown,
  Option,
  Field,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Button,
} from '@fluentui/react-components';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import BasicInputsTab from './components/BasicInputsTab/BasicInputsTab';
import DateTimeTab from './components/DateTimeTab/DateTimeTab';
import SelectionTab from './components/SelectionTab/SelectionTab';
import AdvancedTab from './components/AdvancedTab/AdvancedTab';
import ComponentShowcaseTab from './components/ComponentShowcaseTab/ComponentShowcaseTab';
import { sharedStyles } from './sharedStyles';
import { appStyles } from './appStyles';
import { getTabOverflowConfigPx } from './utils/remHelpers';
import appStrings from './app.resx';
import tabStrings from './tabs.resx';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const styles = {
    ...sharedStyles(),
    ...appStyles(),
  };

  // Tab overflow management with state locking
  const tabListRef = useRef<HTMLDivElement>(null);
  const [visibleTabs, setVisibleTabs] = useState<string[]>([]);
  const [overflowTabs, setOverflowTabs] = useState<string[]>([]);
  const [moreButtonVisible, setMoreButtonVisible] = useState(false);
  const lastContainerWidthRef = useRef<number>(0); // Track last width to prevent unnecessary recalcs

  // All tabs definition
  const allTabs = [
    { value: 'basic', label: tabStrings.basic },
    { value: 'datetime', label: tabStrings.datetime },
    { value: 'selection', label: tabStrings.selection },
    { value: 'advanced', label: tabStrings.advanced },
    { value: 'showcase', label: 'Components' }
  ];

  // Extract tab from URL search params or default to 'basic'
  const getTabFromUrl = (): TabValue => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    const validTabs = ['basic', 'datetime', 'selection', 'advanced', 'showcase'];
    return (tab && validTabs.includes(tab)) ? tab : 'basic';
  };

  const [selectedTab, setSelectedTab] = useState<TabValue>(getTabFromUrl());

  // Update selected tab when URL changes (browser back/forward)
  useEffect(() => {
    const urlTab = getTabFromUrl();
    if (urlTab !== selectedTab) {
      setSelectedTab(urlTab);
    }
  }, [location.search]);

  // Theme management
  const themes = {
    'web-light': { name: 'Web Light', theme: webLightTheme },
    'web-dark': { name: 'Web Dark', theme: webDarkTheme },
    'teams-light': { name: 'Teams Light', theme: teamsLightTheme },
    'teams-dark': { name: 'Teams Dark', theme: teamsDarkTheme },
    'teams-high-contrast': { name: 'High Contrast', theme: teamsHighContrastTheme },
  };

  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>(() => {
    // Load theme from localStorage or default to 'web-light'
    const savedTheme = localStorage.getItem('fluentui-demo-theme') as keyof typeof themes;
    return (savedTheme && savedTheme in themes) ? savedTheme : 'web-light';
  });

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('fluentui-demo-theme', selectedTheme);
  }, [selectedTheme]);

  // Initialize URL with default tab if no tab parameter exists
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get('tab')) {
      navigate(`?tab=basic`, { replace: true });
    }
  }, []);

  // Tab overflow calculation with lock mechanism to prevent bouncing
  const calculateTabOverflow = useCallback(() => {
    if (!tabListRef.current) return;
    
    const container = tabListRef.current;
    const containerWidth = container.offsetWidth;
    
    // Get configuration values converted to pixels
    const { showThresholdPx, moreButtonWidthPx, bufferPx } = getTabOverflowConfigPx();
    
    // Get all tab elements - but only when More button is NOT visible to avoid feedback loop
    const tabElements = container.querySelectorAll('[role="tab"]');
    let totalTabsWidth = 0;
    
    // Calculate total width - this is the critical measurement
    allTabs.forEach((tab, index) => {
      if (tabElements[index]) {
        const tabWidth = (tabElements[index] as HTMLElement).offsetWidth;
        totalTabsWidth += tabWidth;
      }
    });
    
    // CRITICAL: Once More button is visible, NEVER recalculate or change state
    // Only recalculate if More is hidden AND we have a significant size change
    if (moreButtonVisible) {
      // More button is visible - absolutely NO changes allowed
      // Just return without doing anything to prevent bouncing
      return;
    }
    
    // More button is currently hidden - check if we need to show it
    if (totalTabsWidth > containerWidth - showThresholdPx) {
      // We need to show More button - calculate which tabs to show
      // Reserve space for More button plus buffer
      const availableWidthForTabs = containerWidth - moreButtonWidthPx - bufferPx;
      let currentWidth = 0;
      const visible: string[] = [];
      const overflow: string[] = [];
      
      allTabs.forEach((tab, index) => {
        if (tabElements[index]) {
          const tabWidth = (tabElements[index] as HTMLElement).offsetWidth;
          if (currentWidth + tabWidth <= availableWidthForTabs && visible.length > 0) {
            visible.push(tab.value);
            currentWidth += tabWidth;
          } else if (visible.length === 0) {
            // Always show first tab
            visible.push(tab.value);
            currentWidth += tabWidth;
          } else {
            overflow.push(tab.value);
          }
        }
      });
      
      // Only show More if we actually have overflow tabs
      if (overflow.length > 0) {
        setVisibleTabs(visible);
        setOverflowTabs(overflow);
        setMoreButtonVisible(true);
        // IMPORTANT: Once we set More to visible, we will never change it again
      } else {
        // All tabs fit, show them all
        setVisibleTabs(allTabs.map(tab => tab.value));
        setOverflowTabs([]);
        setMoreButtonVisible(false);
      }
    } else {
      // All tabs fit comfortably
      setVisibleTabs(allTabs.map(tab => tab.value));
      setOverflowTabs([]);
      setMoreButtonVisible(false);
    }
  }, [allTabs, moreButtonVisible]);

  // Handle window resize with proper More button reset logic and tab hiding
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!tabListRef.current) return;
        
        const container = tabListRef.current;
        const containerWidth = container.offsetWidth;
        
        // Get configuration values converted to pixels
        const { generousBufferPx, moreButtonWidthPx, bufferPx } = getTabOverflowConfigPx();
        
        if (moreButtonVisible) {
          // More button is visible - we need to handle two scenarios:
          // 1. Check if we can expand back to all tabs
          // 2. Recalculate which tabs to show to prevent overlap
          
          const tabElements = container.querySelectorAll('[role="tab"]');
          let totalTabsWidth = 0;
          
          // Calculate total width of all tabs
          allTabs.forEach((tab, index) => {
            if (tabElements[index]) {
              const tabWidth = (tabElements[index] as HTMLElement).offsetWidth;
              totalTabsWidth += tabWidth;
            }
          });
          
          // Check if we can expand back to show all tabs
          if (totalTabsWidth <= containerWidth - generousBufferPx) {
            // Enough space now - reset More button and show all tabs
            setMoreButtonVisible(false);
            setVisibleTabs(allTabs.map(tab => tab.value));
            setOverflowTabs([]);
          } else {
            // Not enough space for all tabs - recalculate which tabs to show
            // to prevent overlap with More button
            const availableWidthForTabs = containerWidth - moreButtonWidthPx - bufferPx;
            let currentWidth = 0;
            const visible: string[] = [];
            const overflow: string[] = [];
            
            allTabs.forEach((tab, index) => {
              if (tabElements[index]) {
                const tabWidth = (tabElements[index] as HTMLElement).offsetWidth;
                if (currentWidth + tabWidth <= availableWidthForTabs && visible.length > 0) {
                  visible.push(tab.value);
                  currentWidth += tabWidth;
                } else if (visible.length === 0) {
                  // Always show first tab
                  visible.push(tab.value);
                  currentWidth += tabWidth;
                } else {
                  overflow.push(tab.value);
                }
              }
            });
            
            // Update the visible/overflow tabs to prevent overlap
            if (overflow.length > 0) {
              setVisibleTabs(visible);
              setOverflowTabs(overflow);
            }
          }
        } else {
          // More button is hidden - normal calculation
          calculateTabOverflow();
        }
        
        lastContainerWidthRef.current = containerWidth;
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    // Initial calculation with delay to ensure DOM is ready
    resizeTimeout = setTimeout(() => {
      calculateTabOverflow();
      if (tabListRef.current) {
        lastContainerWidthRef.current = tabListRef.current.offsetWidth;
      }
    }, 200);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [calculateTabOverflow, moreButtonVisible, allTabs]);

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    const newTab = data.value;
    setSelectedTab(newTab);
    // Update URL with new tab parameter
    navigate(`?tab=${newTab}`, { replace: false });
  };

  const onThemeChange = (event: any, data: any) => {
    if (data.optionValue && data.optionValue in themes) {
      setSelectedTheme(data.optionValue as keyof typeof themes);
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'basic':
        return <BasicInputsTab />;
      case 'datetime':
        return <DateTimeTab />;
      case 'selection':
        return <SelectionTab />;
      case 'advanced':
        return <AdvancedTab />;
      case 'showcase':
        return <ComponentShowcaseTab />;
      default:
        return <BasicInputsTab />;
    }
  };

  return (
    <FluentProvider theme={themes[selectedTheme].theme}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <Body1 as="h1">{appStrings.title}</Body1>
          <Caption1>{appStrings.subtitle}</Caption1>
        </div>

        <div className={styles.tabBarContainer}>
          <div className={styles.tabListContainer} ref={tabListRef}>
            <TabList selectedValue={selectedTab} onTabSelect={onTabSelect}>
              {allTabs
                .filter(tab => visibleTabs.includes(tab.value))
                .map(tab => (
                  <Tab key={tab.value} value={tab.value}>
                    {tab.label}
                  </Tab>
                ))}
            </TabList>
            
            {overflowTabs.length > 0 && (
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Button
                    appearance="subtle"
                    icon={<MoreHorizontalRegular />}
                    className={styles.moreButton}
                  >
                    More
                  </Button>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    {allTabs
                      .filter(tab => overflowTabs.includes(tab.value))
                      .map(tab => (
                        <MenuItem
                          key={tab.value}
                          onClick={() => onTabSelect({} as SelectTabEvent, { value: tab.value } as SelectTabData)}
                        >
                          {tab.label}
                        </MenuItem>
                      ))}
                  </MenuList>
                </MenuPopover>
              </Menu>
            )}
          </div>

          <div className={styles.themeSelectorContainer}>
            <Field label={appStrings.themeSelector}>
              <Dropdown
                value={themes[selectedTheme].name}
                selectedOptions={[selectedTheme]}
                onOptionSelect={onThemeChange}
                className={styles.themeSelector}
              >
                {Object.entries(themes).map(([key, themeInfo]) => (
                  <Option key={key} value={key}>
                    {themeInfo.name}
                  </Option>
                ))}
              </Dropdown>
            </Field>
          </div>
        </div>

        <div className={styles.cardContainer}>
          {renderTabContent()}
        </div>
      </div>
    </FluentProvider>
  );
};

export default App;
