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
    gap: '1.5rem',
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(18.75rem, 1fr))',
    maxWidth: '100%',
    gap: '1rem',
    '@media (min-width: 48rem)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  buttonSection: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    marginTop: '1rem',
  },
  messageSection: {
    marginTop: '1rem',
  },
});

const BasicInputsTab: React.FC = () => {
  const localStyles = useStyles();
  const styles = {
    ...sharedStyles(),
    ...basicInputsTabStyles(),
  };

  const FIELD_KEYS = {
    TEXT: 'basic_text',
    EMAIL: 'basic_email', 
    PASSWORD: 'basic_password',
    NUMBER: 'basic_number',
    TEXTAREA: 'basic_textarea',
  };

  const [textValue, setTextValue] = useState<string>(formCache.get<string>(FIELD_KEYS.TEXT) || '');
  const [emailValue, setEmailValue] = useState<string>(formCache.get<string>(FIELD_KEYS.EMAIL) || '');
  const [passwordValue, setPasswordValue] = useState<string>(formCache.get<string>(FIELD_KEYS.PASSWORD) || '');
  const [numberValue, setNumberValue] = useState<string>(formCache.get<string>(FIELD_KEYS.NUMBER) || '');
  const [textareaValue, setTextareaValue] = useState<string>(formCache.get<string>(FIELD_KEYS.TEXTAREA) || '');
  
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

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

    setTimeout(() => setMessage(''), 3000);
  };

  const handleClear = () => {
    setTextValue('');
    setEmailValue('');
    setPasswordValue('');
    setNumberValue('');
    setTextareaValue('');
    
    formCache.remove(FIELD_KEYS.TEXT);
    formCache.remove(FIELD_KEYS.EMAIL);
    formCache.remove(FIELD_KEYS.PASSWORD);
    formCache.remove(FIELD_KEYS.NUMBER);
    formCache.remove(FIELD_KEYS.TEXTAREA);

    setMessage(basicStrings.clearSuccess);
    setMessageType('info');

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
