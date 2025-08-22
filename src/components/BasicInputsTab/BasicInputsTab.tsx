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
  Dropdown,
  Option,
} from '@fluentui/react-components';
import { sharedStyles } from '../../SharedStyles.styles';
import { sharedLayoutStyles } from '../sharedLayout.styles';
import { basicInputsTabStyles } from './BasicInputsTab.styles';
import { formCache } from '../../utils/formCache';
import { useMessages } from '../../utils/messageContext';
import { useMessageLogger } from '../../hooks/useMessageLogger';
import { MessageType } from '../../types/enums';
import strings from './BasicInputsTab.resx';

const BasicInputsTab: React.FC = () => {
  const { addMessage } = useMessages();
  const { logSuccess, logWarning, logInfo, logInteraction } = useMessageLogger();
  
  const styles = {
    ...sharedStyles(),
    ...sharedLayoutStyles(),
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

  // Custom message input state
  const [customMessage, setCustomMessage] = useState<string>('');
  const [selectedMessageType, setSelectedMessageType] = useState<MessageType>(MessageType.Info);

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
      logSuccess(strings.submitSuccess);
    } else {
      logWarning(strings.submitError);
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

    logInfo(strings.clearSuccess);
  };

  const handlePopupSubmit = () => {
    if (popupName && popupEmail) {
      logSuccess(`Popup form submitted: Name: ${popupName}, Email: ${popupEmail}`);
      
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

  const handleSendCustomMessage = () => {
    if (customMessage.trim()) {
      addMessage(customMessage.trim(), selectedMessageType);
      setCustomMessage('');
    }
  };

  const getMessageTypeDisplayName = (messageType: MessageType): string => {
    switch (messageType) {
      case MessageType.Success: return 'Success';
      case MessageType.Info: return 'Info';
      case MessageType.Warning: return 'Warning';
      case MessageType.Error: return 'Error';
      default: return 'Info';
    }
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.headerSection}>
        <Title3>{strings.title}</Title3>
        <Caption1>{strings.description}</Caption1>
      </div>

      <div className={styles.formGrid}>
          <Field label={strings.textLabel} required>
            <Input
              placeholder={strings.textPlaceholder}
              value={textValue}
              onChange={(_, data) => handleTextChange(data.value)}
              onFocus={() => logInteraction('Text input', 'focused')}
              onBlur={() => logInteraction('Text input', 'lost focus')}
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
        </div>

        <div className={styles.actionsSection}>
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
                <Title3 as="h3">Contact Information</Title3>
                
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

      {/* Custom Message Sender section */}
      <div className={styles.section}>
        <Title3 as="h3">Custom Message Sender</Title3>
        <Caption1>Send a custom message to test the logging system with different message types.</Caption1>
        
        <div className={styles.customMessageGrid}>
          <Field label="Message Type">
            <Dropdown
              value={getMessageTypeDisplayName(selectedMessageType)}
              selectedOptions={[selectedMessageType]}
              onOptionSelect={(_, data) => {
                if (data.optionValue && Object.values(MessageType).includes(data.optionValue as MessageType)) {
                  setSelectedMessageType(data.optionValue as MessageType);
                }
              }}
            >
              {[MessageType.Success, MessageType.Info, MessageType.Warning, MessageType.Error].map((type) => (
                <Option key={type} value={type}>
                  {getMessageTypeDisplayName(type)}
                </Option>
              ))}
            </Dropdown>
          </Field>

          <Field label="Custom Message">
            <Input
              placeholder="Enter your custom message here..."
              value={customMessage}
              onChange={(_, data) => setCustomMessage(data.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && customMessage.trim()) {
                  handleSendCustomMessage();
                }
              }}
            />
          </Field>
        </div>
        
        <div className={styles.actionsSection}>
          <Button 
            appearance="primary" 
            onClick={handleSendCustomMessage}
            disabled={!customMessage.trim()}
          >
            Send Message
          </Button>
          <Button 
            appearance="secondary" 
            onClick={() => setCustomMessage('')}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInputsTab;
