import React, { useState } from 'react';
import {
  Label,
  Field,
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
import strings from '../strings/components/selection.resx';
import commonStrings from '../strings/common.resx';

const SelectionTab: React.FC = () => {
  const styles = sharedStyles();
  
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

  const countries = strings.countries.split(',').map(c => c.trim());
  const colors = strings.colors.split(',').map(c => c.trim());

  return (
    <div className={styles.tabContentStandardized}>
      <Body1>{strings.title}</Body1>
      
      <div className={styles.row}>
        <Field label={strings.combobox} className={styles.field}>
          <Combobox
            placeholder={strings.comboboxPlaceholder}
            onOptionSelect={(e, data) => addMessage(`Combobox selected: ${data.optionText}`)}
            onOpenChange={(e, data) => addMessage(`Combobox ${data.open ? 'opened' : 'closed'}`)}
          >
            {countries.map((country) => (
              <Option key={country} value={country}>
                {country}
              </Option>
            ))}
          </Combobox>
        </Field>

        <Field label={strings.dropdown} className={styles.field}>
          <Dropdown
            placeholder={strings.dropdownPlaceholder}
            onOptionSelect={(e, data) => addMessage(`Dropdown selected: ${data.optionText}`)}
            onOpenChange={(e, data) => addMessage(`Dropdown ${data.open ? 'opened' : 'closed'}`)}
          >
            {colors.map((color) => (
              <Option key={color} value={color}>
                {color}
              </Option>
            ))}
          </Dropdown>
        </Field>
      </div>

      <div className={styles.row}>
        <Field label={strings.radioGroup} className={styles.field}>
          <RadioGroup
            value={selectedRadio}
            onChange={(e, data) => {
              setSelectedRadio(data.value);
              addMessage(`Radio button selected: ${data.value}`);
            }}
          >
            <Radio value="option1" label={strings.radioOptions.split(",").map(c => c.trim())[0]} />
            <Radio value="option2" label={strings.radioOptions.split(",").map(c => c.trim())[1]} />
            <Radio value="option3" label={strings.radioOptions.split(",").map(c => c.trim())[2]} />
          </RadioGroup>
        </Field>

        <Field label={strings.checkboxes} className={styles.field}>
          <div className={styles.verticalStack}>
            <Checkbox
              checked={checkedItems.feature1 || false}
              onChange={(e, data) => handleCheckboxChange('feature1', data.checked === true)}
              label={strings.checkboxOptions.split(",").map(c => c.trim())[0]}
            />
            <Checkbox
              checked={checkedItems.feature2 || false}
              onChange={(e, data) => handleCheckboxChange('feature2', data.checked === true)}
              label={strings.checkboxOptions.split(",").map(c => c.trim())[1]}
            />
            <Checkbox
              checked={checkedItems.feature3 || false}
              onChange={(e, data) => handleCheckboxChange('feature3', data.checked === true)}
              label={strings.checkboxOptions.split(",").map(c => c.trim())[2]}
            />
          </div>
        </Field>
      </div>

      <Field label={strings.switchControl}>
        <Switch
          checked={switchValue}
          onChange={(e, data) => {
            setSwitchValue(data.checked);
            addMessage(`Switch ${data.checked ? 'turned on' : 'turned off'}`);
          }}
          label={switchValue ? commonStrings.enabled : commonStrings.disabled}
        />
      </Field>

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
