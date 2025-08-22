import React, { useState, useEffect } from 'react';
import {
  Field,
  Body1,
  Caption1,
  Input,
  mergeClasses,
} from '@fluentui/react-components';
import { sharedStyles } from '../../SharedStyles.styles';
import { dateTimeTabStyles } from './DateTimeTab.styles';
import { useMessages } from '../../utils/messageContext';
import strings from './DateTimeTab.resx';
import { formCache, CACHE_KEYS } from '../../utils/formCache';

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
    ...dateTimeTabStyles(),
  };
  
  const getCachedData = (): DateTimeFormData => {
    const cached = formCache.get<DateTimeFormData>(CACHE_KEYS.DATE_TIME);
    return cached || {
      dateValue: '',
      timeValue: '',
      datetimeValue: '',
      monthValue: '',
      weekValue: '',
    };
  };

  const initialData = getCachedData();
  
  const [dateValue, setDateValue] = useState(initialData.dateValue);
  const [timeValue, setTimeValue] = useState(initialData.timeValue);
  const [datetimeValue, setDatetimeValue] = useState(initialData.datetimeValue);
  const [monthValue, setMonthValue] = useState(initialData.monthValue);
  const [weekValue, setWeekValue] = useState(initialData.weekValue);

  useEffect(() => {
    const formData: DateTimeFormData = {
      dateValue,
      timeValue,
      datetimeValue,
      monthValue,
      weekValue,
    };
    formCache.set(CACHE_KEYS.DATE_TIME, formData);
  }, [dateValue, timeValue, datetimeValue, monthValue, weekValue]);

  return (
    <div className={mergeClasses(styles.tabContentStandardized, styles.webkitIconFix)}>
      <Body1 as="h2" className={mergeClasses(styles.sectionTitle, styles.h2Heading)}>{strings.title}</Body1>
      
      <div className={styles.inputGrid}>
        <Field label={strings.dateInput} className={styles.field}>
          <Input
            type="date"
            value={dateValue}
            onChange={(e) => {
              setDateValue(e.target.value);
              addMessage(`Date selected: ${e.target.value}`);
            }}
            onFocus={() => addMessage('Date picker focused')}
            onBlur={() => addMessage('Date picker lost focus')}
          />
        </Field>

        <Field label={strings.timeInput} className={styles.field}>
          <Input
            type="time"
            value={timeValue}
            onChange={(e) => {
              setTimeValue(e.target.value);
              addMessage(`Time selected: ${e.target.value}`);
            }}
            onFocus={() => addMessage('Time picker focused')}
            onBlur={() => addMessage('Time picker lost focus')}
          />
        </Field>

        <Field label={strings.datetimeInput} className={styles.field}>
          <Input
            type="datetime-local"
            value={datetimeValue}
            onChange={(e) => {
              setDatetimeValue(e.target.value);
              addMessage(`DateTime selected: ${e.target.value}`);
            }}
            onFocus={() => addMessage('DateTime picker focused')}
            onBlur={() => addMessage('DateTime picker lost focus')}
          />
        </Field>

        <Field label={strings.monthInput} className={styles.field}>
          <Input
            type="month"
            value={monthValue}
            onChange={(e) => {
              setMonthValue(e.target.value);
              addMessage(`Month selected: ${e.target.value}`);
            }}
            onFocus={() => addMessage('Month picker focused')}
            onBlur={() => addMessage('Month picker lost focus')}
          />
        </Field>

        <Field label={strings.weekInput} className={styles.field}>
          <Input
            type="week"
            value={weekValue}
            onChange={(e) => {
              setWeekValue(e.target.value);
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
