import React, { useState, useEffect, useId } from 'react';
import {
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
import { sharedStyles } from '../../sharedStyles';
import { selectionTabStyles } from './selectionTabStyles';
import selectionStrings from './selection.resx';
import commonStrings from '../../common.resx';
import { formCache, CACHE_KEYS } from '../../utils/formCache';

export interface SelectionFormData {
  comboboxValue: string;
  dropdownValue: string;
  radioValue: string;
  checkboxValues: { [key: string]: boolean };
  switchValue: boolean;
  messages: string[];
}

// Consolidated strings object
const strings = {
  ...selectionStrings,
  ...commonStrings,
};

const SelectionTab: React.FC = () => {
  const styles = {
    ...sharedStyles(),
    ...selectionTabStyles(),
  };
  
  // Generate unique ID suffix for form elements
  const idSuffix = useId();
  const feature1CheckboxId = `feature1-checkbox-${idSuffix}`;
  const feature2CheckboxId = `feature2-checkbox-${idSuffix}`;
  const feature3CheckboxId = `feature3-checkbox-${idSuffix}`;
  
  // Load cached data or use defaults - this runs every time component mounts
  const getCachedData = (): SelectionFormData => {
    const cached = formCache.get<SelectionFormData>(CACHE_KEYS.SELECTION);
    return cached || {
      comboboxValue: '',
      dropdownValue: '',
      radioValue: 'option1',
      checkboxValues: {},
      switchValue: false,
      messages: [],
    };
  };

  // Initialize state with cached data each time component mounts
  const initialData = getCachedData();
  
  const [messages, setMessages] = useState<string[]>(initialData.messages);
  const [comboboxValue, setComboboxValue] = useState(initialData.comboboxValue);
  const [dropdownValue, setDropdownValue] = useState(initialData.dropdownValue);
  const [selectedRadio, setSelectedRadio] = useState(initialData.radioValue);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(initialData.checkboxValues);
  const [switchValue, setSwitchValue] = useState(initialData.switchValue);

  // Cache form data whenever state changes
  useEffect(() => {
    const formData: SelectionFormData = {
      comboboxValue,
      dropdownValue,
      radioValue: selectedRadio,
      checkboxValues: checkedItems,
      switchValue,
      messages,
    };
    formCache.set(CACHE_KEYS.SELECTION, formData);
  }, [comboboxValue, dropdownValue, selectedRadio, checkedItems, switchValue, messages]);

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
            value={comboboxValue}
            placeholder={strings.comboboxPlaceholder}
            onOptionSelect={(e, data) => {
              setComboboxValue(data.optionText || '');
              addMessage(`Combobox selected: ${data.optionText}`);
            }}
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
            value={dropdownValue}
            placeholder={strings.dropdownPlaceholder}
            onOptionSelect={(e, data) => {
              setDropdownValue(data.optionText || '');
              addMessage(`Dropdown selected: ${data.optionText}`);
            }}
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
              id={feature1CheckboxId}
              checked={checkedItems.feature1 || false}
              onChange={(e, data) => handleCheckboxChange('feature1', data.checked === true)}
              label={strings.checkboxOptions.split(",").map(c => c.trim())[0]}
            />
            <Checkbox
              id={feature2CheckboxId}
              checked={checkedItems.feature2 || false}
              onChange={(e, data) => handleCheckboxChange('feature2', data.checked === true)}
              label={strings.checkboxOptions.split(",").map(c => c.trim())[1]}
            />
            <Checkbox
              id={feature3CheckboxId}
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
          label={switchValue ? strings.enabled : strings.disabled}
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
