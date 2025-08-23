import React, { useId } from 'react';
import {
  Field,
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
  tokens,
} from '@fluentui/react-components';
import { sharedStyles } from '../../SharedStyles.styles';
import { sharedLayoutStyles } from '../sharedLayout.styles';
import { selectionTabStyles } from './SelectionTab.styles';
import { formatString } from '../../formatString';
import commonStrings from '../../common.resx';
import { useMessages } from '../../utils/messageContext';
import selectionStrings from './SelectionTab.resx';
import { useLocalStorage } from '../../hooks';

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
  
  const [formData, setFormData] = useLocalStorage<SelectionFormData>('selection-form', {
    comboboxValue: '',
    dropdownValue: '',
    radioValue: 'option1',
    checkboxValues: {},
    switchValue: false,
    tableSelection: [],
  });

  const updateField = (field: keyof SelectionFormData) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    const defaultData: SelectionFormData = {
      comboboxValue: '',
      dropdownValue: '',
      radioValue: 'option1',
      checkboxValues: {},
      switchValue: false,
      tableSelection: [],
    };
    setFormData(defaultData);
    addMessage('Selection form reset to defaults');
  };

  const handleCheckboxChange = (key: string, checked: boolean) => {
    const newCheckboxValues = { ...formData.checkboxValues, [key]: checked };
    updateField('checkboxValues')(newCheckboxValues);
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
    const newSelection = selected 
      ? [...formData.tableSelection, itemId]
      : formData.tableSelection.filter((id: string) => id !== itemId);
    
    updateField('tableSelection')(newSelection);
    addMessage(`Row ${selected ? 'selected' : 'deselected'}: ${tableData.find(item => item.id === itemId)?.name}`);
  };

  const handleSelectAll = (selected: boolean) => {
    const newSelection = selected ? tableData.map(item => item.id) : [];
    updateField('tableSelection')(newSelection);
    addMessage(`${selected ? 'Selected all' : 'Deselected all'} table rows (${newSelection.length} items)`);
  };

  const clearSelection = () => {
    updateField('tableSelection')([]);
    addMessage('Cleared table selection');
  };

  const isAllSelected = formData.tableSelection.length === tableData.length;
  const isIndeterminate = formData.tableSelection.length > 0 && formData.tableSelection.length < tableData.length;

  return (
    <div className={styles.tabContainer}>
      <div className={styles.headerSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title3>{strings.title}</Title3>
          </div>
          <Button 
            appearance="secondary"
            onClick={resetForm}
          >
            Reset Tab
          </Button>
        </div>
        <Caption1>Selection controls for user input and choice management.</Caption1>
      </div>

      <div className={styles.formGrid}>
        <Field label={strings.combobox} className={styles.field}>
          <Combobox
            value={formData.comboboxValue}
            placeholder={strings.comboboxPlaceholder}
            onOptionSelect={(e, data) => {
              updateField('comboboxValue')(data.optionText || '');
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
            value={formData.dropdownValue}
            placeholder={strings.dropdownPlaceholder}
            onOptionSelect={(e, data) => {
              updateField('dropdownValue')(data.optionText || '');
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
            value={formData.radioValue}
            onChange={(e, data) => {
              updateField('radioValue')(data.value);
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
              checked={formData.checkboxValues.feature1 || false}
              onChange={(e, data) => handleCheckboxChange('feature1', data.checked === true)}
              label={strings.checkboxOptions.split(",").map(c => c.trim())[0]}
            />
            <Checkbox
              id={feature2CheckboxId}
              checked={formData.checkboxValues.feature2 || false}
              onChange={(e, data) => handleCheckboxChange('feature2', data.checked === true)}
              label={strings.checkboxOptions.split(",").map(c => c.trim())[1]}
            />
            <Checkbox
              id={feature3CheckboxId}
              checked={formData.checkboxValues.feature3 || false}
              onChange={(e, data) => handleCheckboxChange('feature3', data.checked === true)}
              label={strings.checkboxOptions.split(",").map(c => c.trim())[2]}
            />
          </div>
        </Field>

        <Field label={strings.switchControl} className={styles.field}>
          <Switch
            checked={formData.switchValue}
            onChange={(e, data) => {
              updateField('switchValue')(data.checked);
              addMessage(`Switch ${data.checked ? 'turned on' : 'turned off'}`);
            }}
            label={formData.switchValue ? strings.enabled : strings.disabled}
          />
        </Field>
      </div>

      {/* Multiselect Table Section */}
      <div className={styles.sectionContainer}>
        <Title3 as="h3" className={styles.h3Heading}>Multiselect Table</Title3>
        
        {formData.tableSelection.length > 0 && (
          <div className={styles.componentItem}>
            <Text>Selected items: {formData.tableSelection.length} of {tableData.length}</Text>
            <Text size={200}>
              {formData.tableSelection.map((id: string) => tableData.find(item => item.id === id)?.name).join(', ')}
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
                  aria-label={commonStrings.selectAllRowsAriaLabel}
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
              const isSelected = formData.tableSelection.includes(item.id);
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
                      onChange={(e, data) => {
                        e.stopPropagation(); // Prevent double-selection from row click
                        handleRowSelection(item.id, data.checked === true);
                      }}
                      aria-label={formatString(commonStrings.selectRowAriaLabel, item.name)}
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
            disabled={formData.tableSelection.length === 0}
          >
            Clear Selection
          </Button>
          <Button
            appearance="primary"
            onClick={() => addMessage(`Action performed on ${formData.tableSelection.length} selected items`)}
            disabled={formData.tableSelection.length === 0}
          >
            Process Selected ({formData.tableSelection.length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectionTab;
