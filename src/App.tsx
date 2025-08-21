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
} from '@fluentui/react-components';
import BasicInputsTab from './components/BasicInputsTab/BasicInputsTab';
import DateTimeTab from './components/DateTimeTab/DateTimeTab';
import SelectionTab from './components/SelectionTab/SelectionTab';
import AdvancedTab from './components/AdvancedTab/AdvancedTab';
import ComponentShowcaseTab from './components/ComponentShowcaseTab/ComponentShowcaseTab';
import { sharedStyles } from './sharedStyles';
import { appStyles } from './appStyles';
import appStrings from './app.resx';
import tabStrings from './tabs.resx';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const styles = {
    ...sharedStyles(),
    ...appStyles(),
  };

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
          <TabList selectedValue={selectedTab} onTabSelect={onTabSelect}>
            <Tab value="basic">{tabStrings.basic}</Tab>
            <Tab value="datetime">{tabStrings.datetime}</Tab>
            <Tab value="selection">{tabStrings.selection}</Tab>
            <Tab value="advanced">{tabStrings.advanced}</Tab>
            <Tab value="showcase">Components</Tab>
          </TabList>

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

        <div className={styles.cardContainer}>
          {renderTabContent()}
        </div>
      </div>
    </FluentProvider>
  );
};

export default App;
