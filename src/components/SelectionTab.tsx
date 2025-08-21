import React, { useState, useId } from 'react';
import {
  Field,
  Label,
  Body1,
  Caption1,
  Card,
  CardHeader,
  Combobox,
  Option,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Dropdown,
} from '@fluentui/react-components';
import { sharedStyles } from '../styles/sharedStyles';

const SelectionTab: React.FC = () => {
  const styles = sharedStyles();
  const baseId = useId();
  
  // ID constants for labeled inputs
  const comboboxId = `combobox-${baseId}`;
  const dropdownId = `dropdown-${baseId}`;
  const radioGroupId = `radio-group-${baseId}`;
  const checkboxGroupId = `checkbox-group-${baseId}`;
  const switchId = `switch-${baseId}`;
  
  const [messages, setMessages] = useState<string[]>([]);
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [switchValue, setSwitchValue] = useState(false);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [key]: checked }));
    addMessage(`Checkbox "${key}" ${checked ? 'checked' : 'unchecked'}`);
  };

  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia'];
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink'];

  return (
    <div className={styles.tabContentStandardized}>
      <Body1>Selection Controls</Body1>
      
      <div className={styles.row}>
        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={comboboxId}>Combobox (Countries)</Label>
          <Combobox
            id={comboboxId}
            placeholder="Select a country"
            onOptionSelect={(e, data) => addMessage(`Combobox selected: ${data.optionText}`)}
            onOpenChange={(e, data) => addMessage(`Combobox ${data.open ? 'opened' : 'closed'}`)}
          >
            {countries.map((country) => (
              <Option key={country} value={country}>
                {country}
              </Option>
            ))}
          </Combobox>
        </div>

        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={dropdownId}>Dropdown (Colors)</Label>
          <Dropdown
            id={dropdownId}
            placeholder="Select a color"
            onOptionSelect={(e, data) => addMessage(`Dropdown selected: ${data.optionText}`)}
            onOpenChange={(e, data) => addMessage(`Dropdown ${data.open ? 'opened' : 'closed'}`)}
          >
            {colors.map((color) => (
              <Option key={color} value={color}>
                {color}
              </Option>
            ))}
          </Dropdown>
        </div>
      </div>

      <div className={styles.row}>
        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={radioGroupId}>Radio Group</Label>
          <RadioGroup
            id={radioGroupId}
            value={selectedRadio}
            onChange={(e, data) => {
              setSelectedRadio(data.value);
              addMessage(`Radio button selected: ${data.value}`);
            }}
          >
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
            <Radio value="option3" label="Option 3" />
          </RadioGroup>
        </div>

        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={checkboxGroupId}>Checkboxes</Label>
          <div id={checkboxGroupId} className={styles.verticalStack}>
            <Checkbox
              checked={checkedItems.feature1 || false}
              onChange={(e, data) => handleCheckboxChange('feature1', data.checked === true)}
              label="Feature 1"
            />
            <Checkbox
              checked={checkedItems.feature2 || false}
              onChange={(e, data) => handleCheckboxChange('feature2', data.checked === true)}
              label="Feature 2"
            />
            <Checkbox
              checked={checkedItems.feature3 || false}
              onChange={(e, data) => handleCheckboxChange('feature3', data.checked === true)}
              label="Feature 3"
            />
          </div>
        </div>
      </div>

      <div className={styles.verticalStackTight}>
        <Label htmlFor={switchId}>Switch Control</Label>
        <Switch
          id={switchId}
          checked={switchValue}
          onChange={(e, data) => {
            setSwitchValue(data.checked);
            addMessage(`Switch ${data.checked ? 'turned on' : 'turned off'}`);
          }}
          label={switchValue ? 'Enabled' : 'Disabled'}
        />
      </div>

      <Card className={styles.messageAreaSpacing}>
        <CardHeader header={<Body1>Interaction Messages</Body1>} />
        <div className={styles.messageScrollArea}>
          {messages.length === 0 ? (
            <Caption1>Interact with the selection controls above to see messages here...</Caption1>
          ) : (
            messages.map((message, index) => (
              <div key={index}>
                <Caption1>{message}</Caption1>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default SelectionTab;
