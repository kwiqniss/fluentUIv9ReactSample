import React, { useState, useEffect } from 'react';
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
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useIsOverflowItemVisible,
} from '@fluentui/react-components';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import BasicInputsTab from './components/BasicInputsTab/BasicInputsTab';
import DateTimeTab from './components/DateTimeTab/DateTimeTab';
import SelectionTab from './components/SelectionTab/SelectionTab';
import AdvancedTab from './components/AdvancedTab/AdvancedTab';
import ComponentShowcaseTab from './components/ComponentShowcaseTab/ComponentShowcaseTab';
import { sharedStyles } from './sharedStyles';
import { appStyles } from './appStyles';
import { remToPx } from './utils/remHelpers';
import { formatString } from './formatString';
import appStrings from './app.resx';
import tabStrings from './tabs.resx';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const styles = {
    ...sharedStyles(),
    ...appStyles(),
  };

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

  // FluentUI Overflow implementation
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLDivElement>();

  // Overflow menu item component
  const OverflowMenuItem: React.FC<{ id: string; label: string; onClick: () => void }> = ({ id, label, onClick }) => {
    const isVisible = useIsOverflowItemVisible(id);
    if (isVisible) return null;
    
    return <MenuItem onClick={onClick}>{label}</MenuItem>;
  };

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
          <div className={styles.tabListContainer} style={{ overflow: 'visible', width: '100%', flex: '1 1 auto' }}>
            <Overflow ref={ref} padding={remToPx(3)}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {allTabs.map(tab => (
                  <OverflowItem key={tab.value} id={tab.value}>
                    <Button
                      appearance={selectedTab === tab.value ? 'primary' : 'subtle'}
                      onClick={() => onTabSelect({} as SelectTabEvent, { value: tab.value } as SelectTabData)}
                      style={{
                        borderRadius: '4px 4px 0 0',
                        minHeight: '32px',
                        border: 'none',
                        borderBottom: selectedTab === tab.value ? '2px solid var(--colorBrandBackground)' : '1px solid transparent',
                        marginRight: '4px'
                      }}
                    >
                      {tab.label}
                    </Button>
                  </OverflowItem>
                ))}
                
                {/* Overflow Menu - Only show when there are items overflowing */}
                {isOverflowing && (
                  <Menu>
                    <MenuTrigger disableButtonEnhancement>
                      <Button
                        appearance="subtle"
                        icon={<MoreHorizontalRegular />}
                        aria-label={formatString(appStrings.moreTabsButton, overflowCount.toString())}
                      >
                        {formatString(appStrings.moreTabsButton, overflowCount.toString())}
                      </Button>
                    </MenuTrigger>
                    <MenuPopover>
                      <MenuList>
                        {allTabs.map(tab => (
                          <OverflowMenuItem
                            key={`overflow-${tab.value}`}
                            id={tab.value}
                            label={tab.label}
                            onClick={() => onTabSelect({} as SelectTabEvent, { value: tab.value } as SelectTabData)}
                          />
                        ))}
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                )}
              </div>
            </Overflow>
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
