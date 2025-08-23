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
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableBody,
  TableCellLayout,
  Avatar,
  Button,
  Badge,
  Text,
  Title3,
  mergeClasses,
} from '@fluentui/react-components';
import { sharedStyles } from '../../SharedStyles.styles';
import { sharedLayoutStyles } from '../sharedLayout.styles';
import { selectionTabStyles } from './SelectionTab.styles';
import { useMessages } from '../../utils/messageContext';
import selectionStrings from './SelectionTab.resx';
import commonStrings from '../../common.resx';
import { formCache, CACHE_KEYS } from '../../utils/formCache';

export interface SelectionFormData {
  comboboxValue: string;
  dropdownValue: string;
  radioValue: string;
  checkboxValues: { [key: string]: boolean };
  switchValue: boolean;
  tableSelection: string[];
}

const strings = {
  ...selectionStrings,
  ...commonStrings,
};

const SelectionTab: React.FC = () => {
  const { addMessage } = useMessages();
  
  const styles = {
    ...sharedStyles(),
    ...sharedLayoutStyles(),
    ...selectionTabStyles(),
  };
  
  const idSuffix = useId();
  const feature1CheckboxId = `feature1-checkbox-${idSuffix}`;
  const feature2CheckboxId = `feature2-checkbox-${idSuffix}`;
  const feature3CheckboxId = `feature3-checkbox-${idSuffix}`;
  
  const getCachedData = (): SelectionFormData => {
    const cached = formCache.get<SelectionFormData>(CACHE_KEYS.SELECTION);
    return cached || {
      comboboxValue: '',
      dropdownValue: '',
      radioValue: 'option1',
      checkboxValues: {},
      switchValue: false,
      tableSelection: [],
    };
  };

  const initialData = getCachedData();
  
  const [comboboxValue, setComboboxValue] = useState(initialData.comboboxValue);
  const [dropdownValue, setDropdownValue] = useState(initialData.dropdownValue);
  const [selectedRadio, setSelectedRadio] = useState(initialData.radioValue);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(initialData.checkboxValues);
  const [switchValue, setSwitchValue] = useState(initialData.switchValue);
  const [tableSelection, setTableSelection] = useState<string[]>(initialData.tableSelection);

  useEffect(() => {
    const formData: SelectionFormData = {
      comboboxValue,
      dropdownValue,
      radioValue: selectedRadio,
      checkboxValues: checkedItems,
      switchValue,
      tableSelection,
    };
    formCache.set(CACHE_KEYS.SELECTION, formData);
  }, [comboboxValue, dropdownValue, selectedRadio, checkedItems, switchValue, tableSelection]);

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [key]: checked }));
    addMessage(`Checkbox "${key}" ${checked ? 'checked' : 'unchecked'}`);
  };

  const countries = strings.countries.split(',').map(c => c.trim());
  const colors = strings.colors.split(',').map(c => c.trim());

  const tableData = [
    { id: '1', name: 'Alice Johnson', role: 'Product Manager', department: 'Product', status: 'Active' },
    { id: '2', name: 'Bob Smith', role: 'Software Engineer', department: 'Engineering', status: 'Active' },
    { id: '3', name: 'Carol Davis', role: 'UX Designer', department: 'Design', status: 'Away' },
    { id: '4', name: 'David Brown', role: 'Data Scientist', department: 'Engineering', status: 'Busy' },
    { id: '5', name: 'Eva Martinez', role: 'Marketing Manager', department: 'Marketing', status: 'Active' },
    { id: '6', name: 'Frank Wilson', role: 'Sales Representative', department: 'Sales', status: 'Active' },
  ];

  const handleRowSelection = (itemId: string, selected: boolean) => {
    setTableSelection(prev => {
      const newSelection = selected 
        ? [...prev, itemId]
        : prev.filter(id => id !== itemId);
      
      addMessage(`Row ${selected ? 'selected' : 'deselected'}: ${tableData.find(item => item.id === itemId)?.name}`);
      return newSelection;
    });
  };

  const handleSelectAll = (selected: boolean) => {
    const newSelection = selected ? tableData.map(item => item.id) : [];
    setTableSelection(newSelection);
    addMessage(`${selected ? 'Selected all' : 'Deselected all'} table rows (${newSelection.length} items)`);
  };

  const clearSelection = () => {
    setTableSelection([]);
    addMessage('Cleared table selection');
  };

  const isAllSelected = tableSelection.length === tableData.length;
  const isIndeterminate = tableSelection.length > 0 && tableSelection.length < tableData.length;

  return (
    <div className={styles.tabContainer}>
      <div className={styles.headerSection}>
        <Title3>{strings.title}</Title3>
        <Caption1>Selection controls for user input and choice management.</Caption1>
      </div>

      <div className={styles.formGrid}>
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
          <div>
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

        <Field label={strings.switchControl} className={styles.field}>
          <Switch
            checked={switchValue}
            onChange={(e, data) => {
              setSwitchValue(data.checked);
              addMessage(`Switch ${data.checked ? 'turned on' : 'turned off'}`);
            }}
            label={switchValue ? strings.enabled : strings.disabled}
          />
        </Field>
      </div>

      {/* Multiselect Table Section */}
      <div className={styles.sectionContainer}>
        <Title3 as="h3" className={styles.h3Heading}>Multiselect Table</Title3>
        
        {tableSelection.length > 0 && (
          <div className={styles.componentItem}>
            <Text>Selected items: {tableSelection.length} of {tableData.length}</Text>
            <Text size={200}>
              {tableSelection.map(id => tableData.find(item => item.id === id)?.name).join(', ')}
            </Text>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell className={styles.checkboxCell}>
                <Checkbox
                  checked={isIndeterminate ? "mixed" : isAllSelected}
                  onChange={(_, data) => handleSelectAll(data.checked === true)}
                  aria-label="Select all rows"
                />
              </TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item) => {
              const isSelected = tableSelection.includes(item.id);
              return (
                <TableRow 
                  key={item.id}
                  className={isSelected ? styles.selectedTableRowInteractive : styles.tableRow}
                  onClick={() => handleRowSelection(item.id, !isSelected)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRowSelection(item.id, !isSelected);
                    }
                  }}
                >
                  <TableCell className={styles.checkboxCell}>
                    <Checkbox
                      checked={isSelected}
                      onChange={(_, data) => handleRowSelection(item.id, data.checked === true)}
                      aria-label={`Select ${item.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <TableCellLayout media={<Avatar name={item.name} size={32} />}>
                      {item.name}
                    </TableCellLayout>
                  </TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>
                    <Badge 
                      appearance="ghost"
                      color={
                        item.status === 'Active' ? 'success' :
                        item.status === 'Away' ? 'warning' :
                        item.status === 'Busy' ? 'danger' : 'subtle'
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className={styles.buttonContainer}>
          <Button 
            appearance="secondary"
            onClick={clearSelection}
            disabled={tableSelection.length === 0}
          >
            Clear Selection
          </Button>
          <Button
            appearance="primary"
            onClick={() => addMessage(`Action performed on ${tableSelection.length} selected items`)}
            disabled={tableSelection.length === 0}
          >
            Process Selected ({tableSelection.length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectionTab;
