import React, { useState } from 'react';
import {
  Field,
  Input,
  Textarea,
  Button,
  Body1,
  Caption1,
  MessageBar,
  MessageBarBody,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Title3,
} from '@fluentui/react-components';
import { sharedStyles } from '../../sharedStyles';
import { basicInputsTabStyles } from './basicInputsTabStyles';
import { formCache, CACHE_KEYS } from '../../utils/formCache';
import basicStrings from './basic.resx';

const BasicInputsTab: React.FC = () => {
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

  // Popover form state
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [popupName, setPopupName] = useState<string>('');
  const [popupEmail, setPopupEmail] = useState<string>('');
  const [popupMessage, setPopupMessage] = useState<string>('');

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

  const handlePopupSubmit = () => {
    if (popupName && popupEmail) {
      setMessage(`Popup form submitted: Name: ${popupName}, Email: ${popupEmail}`);
      setMessageType('success');
      
      // Clear popup form
      setPopupName('');
      setPopupEmail('');
      setPopupMessage('');
      setIsPopoverOpen(false);
      
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handlePopupCancel = () => {
    setPopupName('');
    setPopupEmail('');
    setPopupMessage('');
    setIsPopoverOpen(false);
  };

  return (
    <div className={styles.tabContentStandardized}>
      <div className={styles.container}>
        <div className={styles.componentItem}>
          <Body1 as="h2">{basicStrings.title}</Body1>
          <Caption1>{basicStrings.description}</Caption1>
        </div>

        <div className={styles.formGrid}>
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

        <div className={styles.buttonContainer}>
          <Button appearance="primary" onClick={handleSubmit}>
            {basicStrings.submitButton}
          </Button>
          <Button appearance="secondary" onClick={handleClear}>
            {basicStrings.clearButton}
          </Button>
          
          <Popover 
            open={isPopoverOpen} 
            onOpenChange={(_, data) => setIsPopoverOpen(data.open)}
          >
            <PopoverTrigger disableButtonEnhancement>
              <Button appearance="outline">
                Open Contact Form
              </Button>
            </PopoverTrigger>
            <PopoverSurface className={styles.popupForm}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Title3>Contact Information</Title3>
                
                <Field label="Name" required>
                  <Input
                    placeholder="Enter your name"
                    value={popupName}
                    onChange={(_, data) => setPopupName(data.value)}
                  />
                </Field>
                
                <Field label="Email" required>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={popupEmail}
                    onChange={(_, data) => setPopupEmail(data.value)}
                  />
                </Field>
                
                <Field label="Message">
                  <Textarea
                    placeholder="Enter your message (optional)"
                    value={popupMessage}
                    onChange={(_, data) => setPopupMessage(data.value)}
                    rows={3}
                  />
                </Field>
                
                <div className={styles.popupButtonContainer}>
                  <Button appearance="secondary" onClick={handlePopupCancel}>
                    Cancel
                  </Button>
                  <Button 
                    appearance="primary" 
                    onClick={handlePopupSubmit}
                    disabled={!popupName || !popupEmail}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </PopoverSurface>
          </Popover>
        </div>

        {message && (
          <div className={styles.messageSection}>
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
