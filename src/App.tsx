import React, { useState } from 'react';
import {
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
import { sharedStyles } from './styles/sharedStyles';
import { appStyles } from './styles/appStyles';
import { appStrings, tabStrings } from './strings';

const App: React.FC = () => {
  const styles = {
    ...sharedStyles(),
    ...appStyles(),
  };
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
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <Body1 as="h1">{appStrings.title}</Body1>
        <Caption1>{appStrings.subtitle}</Caption1>
      </div>

      <TabList selectedValue={selectedTab} onTabSelect={onTabSelect}>
        <Tab value="basic">{tabStrings.basic}</Tab>
        <Tab value="datetime">{tabStrings.datetime}</Tab>
        <Tab value="selection">{tabStrings.selection}</Tab>
        <Tab value="advanced">{tabStrings.advanced}</Tab>
      </TabList>

      <div className={styles.cardContainer}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default App;
