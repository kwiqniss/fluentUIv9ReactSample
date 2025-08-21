import React, { useState, useId } from 'react';
import {
  Field,
  Label,
  Body1,
  Caption1,
  Card,
  CardHeader,
  Input,
} from '@fluentui/react-components';
import { sharedStyles } from '../styles/sharedStyles';

const DateTimeTab: React.FC = () => {
  const styles = sharedStyles();
  const baseId = useId();
  
  // ID constants for labeled inputs
  const dateInputId = `date-input-${baseId}`;
  const timeInputId = `time-input-${baseId}`;
  const datetimeInputId = `datetime-input-${baseId}`;
  const monthInputId = `month-input-${baseId}`;
  const weekInputId = `week-input-${baseId}`;
  
  const [messages, setMessages] = useState<string[]>([]);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <div className={styles.tabContentStandardized}>
      <Body1>Date & Time Controls</Body1>
      
      <div className={styles.row}>
        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={dateInputId}>Date Input</Label>
          <Input
            id={dateInputId}
            type="date"
            onChange={(e) => addMessage(`Date selected: ${e.target.value}`)}
            onFocus={() => addMessage('Date picker focused')}
            onBlur={() => addMessage('Date picker lost focus')}
          />
        </div>

        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={timeInputId}>Time Input</Label>
          <Input
            id={timeInputId}
            type="time"
            onChange={(e) => addMessage(`Time selected: ${e.target.value}`)}
            onFocus={() => addMessage('Time picker focused')}
            onBlur={() => addMessage('Time picker lost focus')}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={datetimeInputId}>DateTime Local</Label>
          <Input
            id={datetimeInputId}
            type="datetime-local"
            onChange={(e) => addMessage(`DateTime selected: ${e.target.value}`)}
            onFocus={() => addMessage('DateTime picker focused')}
            onBlur={() => addMessage('DateTime picker lost focus')}
          />
        </div>

        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={monthInputId}>Month Input</Label>
          <Input
            id={monthInputId}
            type="month"
            onChange={(e) => addMessage(`Month selected: ${e.target.value}`)}
            onFocus={() => addMessage('Month picker focused')}
            onBlur={() => addMessage('Month picker lost focus')}
          />
        </div>
      </div>

      <div className={styles.verticalStackTight}>
        <Label htmlFor={weekInputId}>Week Input</Label>
        <Input
          id={weekInputId}
          type="week"
          onChange={(e) => addMessage(`Week selected: ${e.target.value}`)}
          onFocus={() => addMessage('Week picker focused')}
          onBlur={() => addMessage('Week picker lost focus')}
        />
      </div>

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
