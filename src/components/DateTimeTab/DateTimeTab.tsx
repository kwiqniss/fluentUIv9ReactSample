import React, { useState, useEffect } from 'react';
import {
  Field,
  Body1,
  Caption1,
  Card,
  CardHeader,
  Input,
} from '@fluentui/react-components';
import { sharedStyles } from '../../sharedStyles';
import strings from './datetime.resx';
import { formCache, CACHE_KEYS } from '../../utils/formCache';

export interface DateTimeFormData {
  dateValue: string;
  timeValue: string;
  datetimeValue: string;
  monthValue: string;
  weekValue: string;
  messages: string[];
}

const DateTimeTab: React.FC = () => {
  const styles = sharedStyles();
  
  // Load cached data or use defaults - this runs every time component mounts
  const getCachedData = (): DateTimeFormData => {
    const cached = formCache.get<DateTimeFormData>(CACHE_KEYS.DATE_TIME);
    return cached || {
      dateValue: '',
      timeValue: '',
      datetimeValue: '',
      monthValue: '',
      weekValue: '',
      messages: [],
    };
  };

  // Initialize state with cached data each time component mounts
  const initialData = getCachedData();
  
  const [messages, setMessages] = useState<string[]>(initialData.messages);
  const [dateValue, setDateValue] = useState(initialData.dateValue);
  const [timeValue, setTimeValue] = useState(initialData.timeValue);
  const [datetimeValue, setDatetimeValue] = useState(initialData.datetimeValue);
  const [monthValue, setMonthValue] = useState(initialData.monthValue);
  const [weekValue, setWeekValue] = useState(initialData.weekValue);

  // Cache form data whenever state changes
  useEffect(() => {
    const formData: DateTimeFormData = {
      dateValue,
      timeValue,
      datetimeValue,
      monthValue,
      weekValue,
      messages,
    };
    formCache.set(CACHE_KEYS.DATE_TIME, formData);
  }, [dateValue, timeValue, datetimeValue, monthValue, weekValue, messages]);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <div className={styles.tabContentStandardized}>
      <Body1>{strings.title}</Body1>
      
      <div className={styles.row}>
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
      </div>

      <div className={styles.row}>
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
      </div>

      <Field label={strings.weekInput}>
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

      <Card>
        <CardHeader header={<Body1>Interaction Messages</Body1>} />
        <div className={styles.messageScrollArea}>
          {messages.length === 0 ? (
            <Caption1>Interact with the date/time controls above to see messages here...</Caption1>
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

export default DateTimeTab;
