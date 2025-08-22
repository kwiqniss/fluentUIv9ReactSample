import React, { useState } from 'react';
import {
  Field,
  Input,
  Textarea,
  Button,
  Body1,
  Caption1,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Title3,
} from '@fluentui/react-components';
import { sharedStyles } from '../../SharedStyles.styles';
import { basicInputsTabStyles } from './BasicInputsTab.styles';
import { formCache } from '../../utils/formCache';
import { useMessages } from '../../utils/messageContext';
import { MessageType } from '../../types/enums';
import strings from './BasicInputsTab.resx';

const BasicInputsTab: React.FC = () => {
  const { addMessage } = useMessages();
  
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

  // Popover form state
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [popupName, setPopupName] = useState<string>('');
  const [popupEmail, setPopupEmail] = useState<string>('');
  const [popupMessage, setPopupMessage] = useState<string>('');

  const handleTextChange = (value: string) => {
    setTextValue(value);
    formCache.set(FIELD_KEYS.TEXT, value);
    if (value.trim()) {
      addMessage(`Text input updated: ${value.substring(0, 20)}${value.length > 20 ? '...' : ''}`, MessageType.Info);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmailValue(value);
    formCache.set(FIELD_KEYS.EMAIL, value);
    if (value.trim()) {
      addMessage(`Email input updated: ${value}`, MessageType.Info);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
    formCache.set(FIELD_KEYS.PASSWORD, value);
    if (value.trim()) {
      addMessage(`Password input updated (${value.length} characters)`, MessageType.Info);
    }
  };

  const handleNumberChange = (value: string) => {
    setNumberValue(value);
    formCache.set(FIELD_KEYS.NUMBER, value);
    if (value.trim()) {
      addMessage(`Number input updated: ${value}`, MessageType.Info);
    }
  };

  const handleTextareaChange = (value: string) => {
    setTextareaValue(value);
    formCache.set(FIELD_KEYS.TEXTAREA, value);
    if (value.trim()) {
      addMessage(`Textarea updated: ${value.substring(0, 30)}${value.length > 30 ? '...' : ''}`, MessageType.Info);
    }
  };

  const handleSubmit = () => {
    const hasContent = textValue || emailValue || passwordValue || numberValue || textareaValue;
    
    if (hasContent) {
      addMessage(strings.submitSuccess, MessageType.Success);
    } else {
      addMessage(strings.submitError, MessageType.Warning);
    }
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

    addMessage(strings.clearSuccess, MessageType.Info);
  };

  const handlePopupSubmit = () => {
    if (popupName && popupEmail) {
      addMessage(`Popup form submitted: Name: ${popupName}, Email: ${popupEmail}`, MessageType.Success);
      
      // Clear popup form
      setPopupName('');
      setPopupEmail('');
      setPopupMessage('');
      setIsPopoverOpen(false);
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
          <Body1 as="h2" className={styles.h2Heading}>{strings.title}</Body1>
          <Caption1>{strings.description}</Caption1>
        </div>

        <div className={styles.formGrid}>
          <Field label={strings.textLabel} required>
            <Input
              placeholder={strings.textPlaceholder}
              value={textValue}
              onChange={(_, data) => handleTextChange(data.value)}
              onFocus={() => addMessage('Text input focused', MessageType.Info)}
              onBlur={() => addMessage('Text input lost focus', MessageType.Info)}
            />
          </Field>

          <Field label={strings.emailLabel} required>
            <Input
              type="email"
              placeholder={strings.emailPlaceholder}
              value={emailValue}
              onChange={(_, data) => handleEmailChange(data.value)}
              onFocus={() => addMessage('Email input focused', MessageType.Info)}
              onBlur={() => addMessage('Email input lost focus', MessageType.Info)}
            />
          </Field>

          <Field label={strings.passwordLabel} required>
            <Input
              type="password"
              placeholder={strings.passwordPlaceholder}
              value={passwordValue}
              onChange={(_, data) => handlePasswordChange(data.value)}
              onFocus={() => addMessage('Password input focused', MessageType.Info)}
              onBlur={() => addMessage('Password input lost focus', MessageType.Info)}
            />
          </Field>

          <Field label={strings.numberLabel}>
            <Input
              type="number"
              placeholder={strings.numberPlaceholder}
              value={numberValue}
              onChange={(_, data) => handleNumberChange(data.value)}
              onFocus={() => addMessage('Number input focused', MessageType.Info)}
              onBlur={() => addMessage('Number input lost focus', MessageType.Info)}
            />
          </Field>
        </div>

        <Field label={strings.textareaLabel}>
          <Textarea
            placeholder={strings.textareaPlaceholder}
            value={textareaValue}
            onChange={(_, data) => handleTextareaChange(data.value)}
            onFocus={() => addMessage('Textarea focused', MessageType.Info)}
            onBlur={() => addMessage('Textarea lost focus', MessageType.Info)}
            rows={4}
            resize="vertical"
          />
        </Field>

        <div className={styles.buttonContainer}>
          <Button appearance="primary" onClick={handleSubmit}>
            {strings.submitButton}
          </Button>
          <Button appearance="secondary" onClick={handleClear}>
            {strings.clearButton}
          </Button>
          
          <Popover 
            open={isPopoverOpen} 
            onOpenChange={(_, data) => {
              setIsPopoverOpen(data.open);
              addMessage(data.open ? 'Popup form opened' : 'Popup form closed', MessageType.Info);
            }}
          >
            <PopoverTrigger disableButtonEnhancement>
              <Button appearance="outline">
                Open Contact Form
              </Button>
            </PopoverTrigger>
            <PopoverSurface className={styles.popupForm}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Title3 as="h3" className={styles.h3Heading}>Contact Information</Title3>
                
                <Field label="Name" required>
                  <Input
                    placeholder="Enter your name"
                    value={popupName}
                    onChange={(_, data) => setPopupName(data.value)}
                    onFocus={() => addMessage('Popup name field focused', MessageType.Info)}
                  />
                </Field>
                
                <Field label="Email" required>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={popupEmail}
                    onChange={(_, data) => setPopupEmail(data.value)}
                    onFocus={() => addMessage('Popup email field focused', MessageType.Info)}
                  />
                </Field>
                
                <Field label="Message">
                  <Textarea
                    placeholder="Enter your message (optional)"
                    value={popupMessage}
                    onChange={(_, data) => setPopupMessage(data.value)}
                    onFocus={() => addMessage('Popup message field focused', MessageType.Info)}
                    rows={3}
                  />
                </Field>
                
                <div className={styles.popupButtonContainer}>
                  <Button 
                    appearance="secondary" 
                    onClick={() => {
                      handlePopupCancel();
                      addMessage('Popup form cancelled', MessageType.Info);
                    }}
                  >
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
      </div>
    </div>
  );
};

export default BasicInputsTab;
