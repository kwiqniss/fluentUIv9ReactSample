import React from 'react';
import {
  Field,
  Caption1,
  Input,
  Title3,
  mergeClasses,
} from '@fluentui/react-components';
import { sharedStyles } from '../../SharedStyles.styles';
import { sharedLayoutStyles } from '../sharedLayout.styles';
import { dateTimeTabStyles } from './DateTimeTab.styles';
import { useMessages } from '../../utils/messageContext';
import strings from './DateTimeTab.resx';
import { useLocalStorage } from '../../hooks';

export interface DateTimeFormData {
  dateValue: string;
  timeValue: string;
  datetimeValue: string;
  monthValue: string;
  weekValue: string;
}

const DateTimeTab: React.FC = () => {
  const { addMessage } = useMessages();
  
  const styles = {
    ...sharedStyles(),
    ...sharedLayoutStyles(),
    ...dateTimeTabStyles(),
  };
  
  const [formData, setFormData] = useLocalStorage<DateTimeFormData>('date-time-form', {
    dateValue: '',
    timeValue: '',
    datetimeValue: '',
    monthValue: '',
    weekValue: '',
  });

  const updateField = (field: keyof DateTimeFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={mergeClasses(styles.tabContainer, styles.webkitIconFix)}>
      <div className={styles.headerSection}>
        <Title3>{strings.title}</Title3>
        <Caption1>Date and time input controls for temporal data collection.</Caption1>
      </div>

      <div className={styles.formGrid}>
        <Field label={strings.dateInput} className={styles.field}>
          <Input
            type="date"
            value={formData.dateValue}
            onChange={(e) => {
              updateField('dateValue')(e.target.value);
              addMessage(`Date selected: ${e.target.value}`);
            }}
            onFocus={() => addMessage('Date picker focused')}
            onBlur={() => addMessage('Date picker lost focus')}
          />
        </Field>

        <Field label={strings.timeInput} className={styles.field}>
          <Input
            type="time"
            value={formData.timeValue}
            onChange={(e) => {
              updateField('timeValue')(e.target.value);
              addMessage(`Time selected: ${e.target.value}`);
            }}
            onFocus={() => addMessage('Time picker focused')}
            onBlur={() => addMessage('Time picker lost focus')}
          />
        </Field>

        <Field label={strings.datetimeInput} className={styles.field}>
          <Input
            type="datetime-local"
            value={formData.datetimeValue}
            onChange={(e) => {
              updateField('datetimeValue')(e.target.value);
              addMessage(`DateTime selected: ${e.target.value}`);
            }}
            onFocus={() => addMessage('DateTime picker focused')}
            onBlur={() => addMessage('DateTime picker lost focus')}
          />
        </Field>

        <Field label={strings.monthInput} className={styles.field}>
          <Input
            type="month"
            value={formData.monthValue}
            onChange={(e) => {
              updateField('monthValue')(e.target.value);
              addMessage(`Month selected: ${e.target.value}`);
            }}
            onFocus={() => addMessage('Month picker focused')}
            onBlur={() => addMessage('Month picker lost focus')}
          />
        </Field>

        <Field label={strings.weekInput} className={styles.field}>
          <Input
            type="week"
            value={formData.weekValue}
            onChange={(e) => {
              updateField('weekValue')(e.target.value);
              addMessage(`Week selected: ${e.target.value}`);
            }}
            onFocus={() => addMessage('Week picker focused')}
            onBlur={() => addMessage('Week picker lost focus')}
          />
        </Field>
      </div>
    </div>
  );
};

export default DateTimeTab;
