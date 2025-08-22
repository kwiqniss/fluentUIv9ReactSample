import React, { useState } from 'react';
import {
  Field,
  Input,
  Textarea,
  Button,
  makeStyles,
  Body1,
  Caption1,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import { sharedStyles } from '../../sharedStyles';
import { basicInputsTabStyles } from './basicInputsTabStyles';
import { formCache, CACHE_KEYS } from '../../utils/formCache';
import basicStrings from './basic.resx';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem', // ~24px
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem', // ~8px
    marginBottom: '0.5rem', // ~8px
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(18.75rem, 1fr))', // ~300px
    maxWidth: '100%',
    gap: '1rem', // ~16px
    '@media (min-width: 48rem)': { // ~768px
      gridTemplateColumns: '1fr 1fr', // Exactly 2 columns on larger screens
    },
  },
  buttonSection: {
    display: 'flex',
    gap: '0.75rem', // ~12px
    alignItems: 'center',
    marginTop: '1rem', // ~16px
  },
  messageSection: {
    marginTop: '1rem', // ~16px
  },
});

const BasicInputsTab: React.FC = () => {
  const localStyles = useStyles();
  const styles = {
    ...sharedStyles(),
    ...basicInputsTabStyles(),
  };

  // Cache keys for this tab's fields
  const FIELD_KEYS = {
    TEXT: 'basic_text',
    EMAIL: 'basic_email', 
    PASSWORD: 'basic_password',
    NUMBER: 'basic_number',
    TEXTAREA: 'basic_textarea',
  };

  // Form state with caching
  const [textValue, setTextValue] = useState<string>(formCache.get<string>(FIELD_KEYS.TEXT) || '');
  const [emailValue, setEmailValue] = useState<string>(formCache.get<string>(FIELD_KEYS.EMAIL) || '');
  const [passwordValue, setPasswordValue] = useState<string>(formCache.get<string>(FIELD_KEYS.PASSWORD) || '');
  const [numberValue, setNumberValue] = useState<string>(formCache.get<string>(FIELD_KEYS.NUMBER) || '');
  const [textareaValue, setTextareaValue] = useState<string>(formCache.get<string>(FIELD_KEYS.TEXTAREA) || '');
  
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  // Event handlers with caching
  const handleTextChange = (value: string) => {
    setTextValue(value);
    formCache.set(FIELD_KEYS.TEXT, value);
  };

  const handleEmailChange = (value: string) => {
    setEmailValue(value);
    formCache.set(FIELD_KEYS.EMAIL, value);
  };

  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
    formCache.set(FIELD_KEYS.PASSWORD, value);
  };

  const handleNumberChange = (value: string) => {
    setNumberValue(value);
    formCache.set(FIELD_KEYS.NUMBER, value);
  };

  const handleTextareaChange = (value: string) => {
    setTextareaValue(value);
    formCache.set(FIELD_KEYS.TEXTAREA, value);
  };

  const handleSubmit = () => {
    const hasContent = textValue || emailValue || passwordValue || numberValue || textareaValue;
    
    if (hasContent) {
      setMessage(basicStrings.submitSuccess);
      setMessageType('success');
      
      // Log the current form state
      console.log('Basic Inputs Form Submitted:', {
        text: textValue,
        email: emailValue,
        password: passwordValue ? '[HIDDEN]' : '',
        number: numberValue,
        textarea: textareaValue,
      });
    } else {
      setMessage(basicStrings.submitError);
      setMessageType('warning');
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  const handleClear = () => {
    setTextValue('');
    setEmailValue('');
    setPasswordValue('');
    setNumberValue('');
    setTextareaValue('');
    
    // Clear cached values
    formCache.remove(FIELD_KEYS.TEXT);
    formCache.remove(FIELD_KEYS.EMAIL);
    formCache.remove(FIELD_KEYS.PASSWORD);
    formCache.remove(FIELD_KEYS.NUMBER);
    formCache.remove(FIELD_KEYS.TEXTAREA);

    setMessage(basicStrings.clearSuccess);
    setMessageType('info');

    // Clear message after 2 seconds
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className={styles.tabContentStandardized}>
      <div className={localStyles.container}>
        <div className={localStyles.headerSection}>
          <Body1 as="h2">{basicStrings.title}</Body1>
          <Caption1>{basicStrings.description}</Caption1>
        </div>

        <div className={localStyles.formGrid}>
          <Field label={basicStrings.textLabel} required>
            <Input
              placeholder={basicStrings.textPlaceholder}
              value={textValue}
              onChange={(_, data) => handleTextChange(data.value)}
            />
          </Field>

          <Field label={basicStrings.emailLabel} required>
            <Input
              type="email"
              placeholder={basicStrings.emailPlaceholder}
              value={emailValue}
              onChange={(_, data) => handleEmailChange(data.value)}
            />
          </Field>

          <Field label={basicStrings.passwordLabel} required>
            <Input
              type="password"
              placeholder={basicStrings.passwordPlaceholder}
              value={passwordValue}
              onChange={(_, data) => handlePasswordChange(data.value)}
            />
          </Field>

          <Field label={basicStrings.numberLabel}>
            <Input
              type="number"
              placeholder={basicStrings.numberPlaceholder}
              value={numberValue}
              onChange={(_, data) => handleNumberChange(data.value)}
            />
          </Field>
        </div>

        <Field label={basicStrings.textareaLabel}>
          <Textarea
            placeholder={basicStrings.textareaPlaceholder}
            value={textareaValue}
            onChange={(_, data) => handleTextareaChange(data.value)}
            rows={4}
            resize="vertical"
          />
        </Field>

        <div className={localStyles.buttonSection}>
          <Button appearance="primary" onClick={handleSubmit}>
            {basicStrings.submitButton}
          </Button>
          <Button appearance="secondary" onClick={handleClear}>
            {basicStrings.clearButton}
          </Button>
        </div>

        {message && (
          <div className={localStyles.messageSection}>
            <MessageBar intent={messageType}>
              <MessageBarBody>{message}</MessageBarBody>
            </MessageBar>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInputsTab;
