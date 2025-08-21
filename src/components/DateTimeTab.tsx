import React, { useState } from 'react';
import {
  Field,
  Body1,
  Caption1,
  Card,
  CardHeader,
  Input,
} from '@fluentui/react-components';
import { sharedStyles } from '../styles/sharedStyles';

const DateTimeTab: React.FC = () => {
  const styles = sharedStyles();
  const [messages, setMessages] = useState<string[]>([]);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <div className={styles.tabContentStandardized}>
      <Body1>Date & Time Controls</Body1>
      
      <div className={styles.row}>
        <Field label="Date Input" className={styles.field}>
          <Input
            type="date"
            onChange={(e) => addMessage(`Date selected: ${e.target.value}`)}
            onFocus={() => addMessage('Date picker focused')}
            onBlur={() => addMessage('Date picker lost focus')}
          />
        </Field>

        <Field label="Time Input" className={styles.field}>
          <Input
            type="time"
            onChange={(e) => addMessage(`Time selected: ${e.target.value}`)}
            onFocus={() => addMessage('Time picker focused')}
            onBlur={() => addMessage('Time picker lost focus')}
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="DateTime Local" className={styles.field}>
          <Input
            type="datetime-local"
            onChange={(e) => addMessage(`DateTime selected: ${e.target.value}`)}
            onFocus={() => addMessage('DateTime picker focused')}
            onBlur={() => addMessage('DateTime picker lost focus')}
          />
        </Field>

        <Field label="Month Input" className={styles.field}>
          <Input
            type="month"
            onChange={(e) => addMessage(`Month selected: ${e.target.value}`)}
            onFocus={() => addMessage('Month picker focused')}
            onBlur={() => addMessage('Month picker lost focus')}
          />
        </Field>
      </div>

      <Field label="Week Input">
        <Input
          type="week"
          onChange={(e) => addMessage(`Week selected: ${e.target.value}`)}
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
