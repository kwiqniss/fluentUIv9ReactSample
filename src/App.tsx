import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  TabValue,
  Body1,
  Caption1,
  Title1,
  Subtitle1,
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
  MenuButton,
  Button,
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useIsOverflowItemVisible,
  mergeClasses,
  TabList,
  Tab,
  Portal,
  useScrollbarWidth,
  tokens,
} from '@fluentui/react-components';
import BasicInputsTab from './components/BasicInputsTab/BasicInputsTab';
import DateTimeTab from './components/DateTimeTab/DateTimeTab';
import SelectionTab from './components/SelectionTab/SelectionTab';
import AdvancedTab from './components/AdvancedTab/AdvancedTab';
import ComponentShowcaseTab from './components/ComponentShowcaseTab/ComponentShowcaseTab';
import MessageManager from './components/MessageManager';
import { sharedStyles } from './SharedStyles.styles';
import { appStyles } from './AppStyles.styles';
import appStrings from './App.resx';
import tabStrings from './tabs.resx';
import { LogLevel } from './types/enums';
import { getLogLevelDisplayName } from './utils/logLevel';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isMessageLoggingEnabled, setIsMessageLoggingEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('fluentui-demo-messaging-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [tabsHeight, setTabsHeight] = useState(0);
  const [tabsWidth, setTabsWidth] = useState(0);
  const [tabsLeft, setTabsLeft] = useState(0);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);
  
  const getTabClassName = (tabValue: string, isSelected: boolean) => {
    return mergeClasses(
      styles.tabBase,
      isSelected ? styles.tabSelected : styles.tabUnselected
    );
  };
  
  // Scroll event handler for sticky positioning
  useEffect(() => {
    const handleScroll = () => {
      if (tabContainerRef.current) {
        const rect = tabContainerRef.current.getBoundingClientRect();
        const shouldBeSticky = rect.top <= 0;
        setIsTabsSticky(shouldBeSticky);
        
        // Update dimensions and position - always get current values
        setTabsHeight(tabContainerRef.current.offsetHeight);
        setTabsWidth(tabContainerRef.current.offsetWidth);
        setTabsLeft(rect.left);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  
  const styles = {
    ...sharedStyles(),
    ...appStyles(),
  };

  const strings = {
    ...appStrings,
    ...tabStrings,
  }

  const allTabs = [
    { value: 'basic', label: strings.basic },
    { value: 'datetime', label: strings.datetime },
    { value: 'selection', label: strings.selection },
    { value: 'advanced', label: strings.advanced },
    { value: 'showcase', label: strings.components }
  ];

  const getTabFromUrl = (): TabValue => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    const validTabs = ['basic', 'datetime', 'selection', 'advanced', 'showcase'];
    return (tab && validTabs.includes(tab)) ? tab : 'basic';
  };

  const [selectedTab, setSelectedTab] = useState<TabValue>(getTabFromUrl());

  useEffect(() => {
    const urlTab = getTabFromUrl();
    if (urlTab !== selectedTab) {
      setSelectedTab(urlTab);
    }
  }, [location.search]);

  const themes = {
    'web-light': { name: 'Web Light', theme: webLightTheme },
    'web-dark': { name: 'Web Dark', theme: webDarkTheme },
    'teams-light': { name: 'Teams Light', theme: teamsLightTheme },
    'teams-dark': { name: 'Teams Dark', theme: teamsDarkTheme },
    'teams-high-contrast': { name: 'High Contrast', theme: teamsHighContrastTheme },
  };

  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>(() => {
    const savedTheme = localStorage.getItem('fluentui-demo-theme') as keyof typeof themes;
    return (savedTheme && savedTheme in themes) ? savedTheme : 'web-light';
  });

  const [logLevel, setLogLevel] = useState<LogLevel>(() => {
    const savedLogLevel = localStorage.getItem('fluentui-demo-log-level') as LogLevel;
    return (savedLogLevel && Object.values(LogLevel).includes(savedLogLevel)) ? savedLogLevel : LogLevel.Verbose;
  });

  // Calculate layout adjustments based on footer presence
  const isFooterVisible = logLevel !== LogLevel.None;
  
  // When footer is visible, leave enough space for the full footer to be visible
  // Footer needs more than 4rem - increase to ~8rem for full visibility
  const mainContainerMinHeight = isFooterVisible ? 'calc(100vh - 8rem)' : '100vh';

  useEffect(() => {
    localStorage.setItem('fluentui-demo-theme', selectedTheme);
    
    // Set body background color to match theme
    document.body.style.backgroundColor = themes[selectedTheme].theme.colorNeutralBackground1;
  }, [selectedTheme]);

  useEffect(() => {
    localStorage.setItem('fluentui-demo-log-level', logLevel);
  }, [logLevel]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get('tab') || !allTabs.find(tab => tab.value === params.get('tab'))) {
      navigate(`?tab=basic`, { replace: true });
    }
  }, [navigate, allTabs]);

  // Simple ResizeObserver error suppression (non-intrusive)
  useEffect(() => {
    // Suppress console errors
    const originalError = console.error;
    console.error = (...args) => {
      const message = args[0]?.toString() || '';
      if (message.includes('ResizeObserver loop completed with undelivered notifications')) {
        return; // Suppress only this specific error
      }
      originalError.apply(console, args);
    };

    // Suppress window errors
    const handleWindowError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('ResizeObserver loop completed with undelivered notifications') ||
          event.message?.includes('ResizeObserver loop completed with undelivered notifications')) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('error', handleWindowError);

    return () => {
      console.error = originalError;
      window.removeEventListener('error', handleWindowError);
    };
  }, []);

  // Overflow components following the samples exactly
  const OverflowMenuItem: React.FC<{ id: string }> = ({ id }) => {
    const isVisible = useIsOverflowItemVisible(id);
    
    if (isVisible) {
      return null;
    }
    
    const tab = allTabs.find(t => t.value === id);
    if (!tab) return null;
    
    return (
      <MenuItem onClick={() => onTabSelect({} as SelectTabEvent, { value: tab.value } as SelectTabData)}>
        {tab.label}
      </MenuItem>
    );
  };

  const OverflowMenu: React.FC<{ itemIds: string[] }> = ({ itemIds }) => {
    const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

    if (!isOverflowing) {
      return null;
    }

    return (
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton ref={ref}>+{overflowCount} items</MenuButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {itemIds.map((id) => (
              <OverflowMenuItem key={id} id={id} />
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    const newTab = data.value;
    setSelectedTab(newTab);
    navigate(`?tab=${newTab}`, { replace: false });
    
    // If we're scrolled down past the tab content, scroll back to show the top of the tab content
    // But don't scroll if we're already at or above the tab content
    setTimeout(() => {
      if (tabContentRef.current) {
        const tabContentTop = tabContentRef.current.offsetTop;
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add some padding above the tab content to ensure the h2 title is fully visible
        const paddingAbove = 40; // Add 40px padding above the tab content for better visibility
        const targetScrollTop = Math.max(0, tabContentTop - paddingAbove);
        
        // Only scroll if we're scrolled past the target position
        if (currentScrollTop > targetScrollTop) {
          window.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
          });
        }
      }
    }, 10);
  };

  const onThemeChange = (event: any, data: any) => {
    if (data.optionValue && data.optionValue in themes) {
      setSelectedTheme(data.optionValue as keyof typeof themes);
    }
  };

  const onLogLevelChange = (event: any, data: any) => {
    if (data.optionValue && Object.values(LogLevel).includes(data.optionValue as LogLevel)) {
      setLogLevel(data.optionValue as LogLevel);
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
      <MessageManager logLevel={logLevel}>
        <div 
          className={styles.mainContainer}
          style={{ '--main-container-min-height': mainContainerMinHeight } as React.CSSProperties}
        >
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <Title1 as="h1" className={styles.h1Heading}>{strings.title}</Title1>
              <Subtitle1 className={styles.subtitle}>{strings.subtitle}</Subtitle1>
            </div>
            <div className={styles.controlsSection}>
              <Field label={strings.themeSelector}>
                <Dropdown
                  value={themes[selectedTheme].name}
                  selectedOptions={[selectedTheme]}
                  onOptionSelect={onThemeChange}
                >
                  {Object.entries(themes).map(([key, themeInfo]) => (
                    <Option key={key} value={key}>
                      {themeInfo.name}
                    </Option>
                  ))}
                </Dropdown>
              </Field>
              
              <Field label={strings.logLevelSelector}>
                <Dropdown
                  value={getLogLevelDisplayName(logLevel)}
                  selectedOptions={[logLevel]}
                  onOptionSelect={onLogLevelChange}
                >
                  {Object.values(LogLevel).map((level) => (
                    <Option key={level} value={level}>
                      {getLogLevelDisplayName(level)}
                    </Option>
                  ))}
                </Dropdown>
              </Field>
            </div>
          </div>

          <div className={styles.contentWrapper}>
            <div 
              ref={tabContainerRef}
              className={styles.tabContainer}
              style={{ '--tabs-height': `${tabsHeight}px` } as React.CSSProperties}
            >
              <Overflow>
                <TabList 
                  selectedValue={selectedTab}
                  onTabSelect={onTabSelect}
                  size="large"
                  appearance="subtle"
                  style={{
                    '--fui-TabList--gap': '0px'
                  } as React.CSSProperties}
                >
                  {allTabs.map((tab, index) => (
                    <OverflowItem 
                      key={tab.value} 
                      id={tab.value}
                      priority={index === 0 ? 1 : 0}
                    >
                      <Tab 
                        value={tab.value}
                        className={getTabClassName(tab.value, selectedTab === tab.value)}
                      >
                        {tab.label}
                      </Tab>
                    </OverflowItem>
                  ))}
                  <OverflowMenu itemIds={allTabs.map(tab => tab.value)} />
                </TabList>
              </Overflow>
            </div>

            {/* Sticky Portal when scrolled past */}
            {isTabsSticky && (
              <Portal>
                <div 
                  className={styles.tabContainerSticky}
                  style={{ 
                    '--tabs-height': `${tabsHeight}px`,
                    width: `${tabsWidth}px`,
                    left: `${tabsLeft}px`,
                    right: 'auto'
                  } as React.CSSProperties}
                >
                  <Overflow>
                    <TabList 
                      selectedValue={selectedTab}
                      onTabSelect={onTabSelect}
                      size="large"
                      appearance="subtle"
                      style={{
                        '--fui-TabList--gap': '0px'
                      } as React.CSSProperties}
                    >
                      {allTabs.map((tab, index) => (
                        <OverflowItem 
                          key={`sticky-${tab.value}`} 
                          id={`sticky-${tab.value}`}
                          priority={index === 0 ? 1 : 0}
                        >
                          <Tab 
                            value={tab.value}
                            className={getTabClassName(tab.value, selectedTab === tab.value)}
                          >
                            {tab.label}
                          </Tab>
                        </OverflowItem>
                      ))}
                      <OverflowMenu itemIds={allTabs.map(tab => tab.value)} />
                    </TabList>
                  </Overflow>
                </div>
              </Portal>
            )}

            <div 
              ref={tabContentRef} 
              className={styles.tabContentContainer}
              style={isTabsSticky ? { marginTop: `-${Math.floor(tabsHeight * 0.4)}px` } : {}}
            >
              {renderTabContent()}
            </div>
          </div>
        </div>
      </MessageManager>
    </FluentProvider>
  );
};

export default App;
