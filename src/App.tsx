import React, { useState } from 'react';
import {
  makeStyles,
  Tab,
  TabList,
  TabValue,
  Body1,
  Caption1,
  SelectTabEvent,
  SelectTabData,
} from '@fluentui/react-components';
import BasicInputsTab from './components/BasicInputsTab';
import DateTimeTab from './components/DateTimeTab';
import SelectionTab from './components/SelectionTab';
import AdvancedTab from './components/AdvancedTab';

const useStyles = makeStyles({
  container: {
    padding: '1.25rem',
    maxWidth: '75rem',
    margin: '0 auto',
  },
  header: {
    marginBottom: '1.25rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    marginBottom: '0.5em',
  },
  tabContent: {
    marginTop: '1.25rem',
    padding: '1.25rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '0.5rem',
  },
});

const App: React.FC = () => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState<TabValue>('basic');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedTab(data.value);
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
      default:
        return <BasicInputsTab />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Body1 as="h1" className={styles.headerTitle}>FluentUI v9 Input Controls Demo 🚀</Body1>
        <Caption1>Explore various input controls with interactive feedback</Caption1>
      </div>

      <TabList selectedValue={selectedTab} onTabSelect={onTabSelect}>
        <Tab value="basic">Basic Inputs</Tab>
        <Tab value="datetime">Date & Time</Tab>
        <Tab value="selection">Selection Controls</Tab>
        <Tab value="advanced">Advanced Controls</Tab>
      </TabList>

      <div className={styles.tabContent}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default App;
