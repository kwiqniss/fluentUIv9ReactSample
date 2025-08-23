import React, { useState } from 'react';
import {
  Field,
  Input,
  Textarea,
  Button,
  Caption1,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Title3,
  Dropdown,
  Option,
  tokens,
} from '@fluentui/react-components';
import { sharedStyles } from '../../SharedStyles.styles';
import { sharedLayoutStyles } from '../sharedLayout.styles';
import { basicInputsTabStyles } from './BasicInputsTab.styles';
import { useLocalStorage } from '../../hooks';
import { useMessages } from '../../utils/messageContext';
import { useMessageLogger } from '../../hooks/useMessageLogger';
import { MessageType } from '../../types/enums';
import strings from './BasicInputsTab.resx';

interface BasicInputsFormData {
  textValue: string;
  emailValue: string;
  passwordValue: string;
  numberValue: string;
  textareaValue: string;
}

const BasicInputsTab: React.FC = () => {
  const { addMessage } = useMessages();
  const { logSuccess, logWarning, logInfo, logInteraction } = useMessageLogger();
  
  const styles = {
    ...sharedStyles(),
    ...sharedLayoutStyles(),
    ...basicInputsTabStyles(),
  };

  // Use our FluentUI-style localStorage hook for form data persistence
  const [formData, setFormData] = useLocalStorage<BasicInputsFormData>('basicInputs-form', {
    textValue: '',
    emailValue: '',
    passwordValue: '',
    numberValue: '',
    textareaValue: '',
  });

  // UI state (not persisted)
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [popupName, setPopupName] = useState<string>('');
  const [popupEmail, setPopupEmail] = useState<string>('');
  const [popupMessage, setPopupMessage] = useState<string>('');

  const [customMessage, setCustomMessage] = useState<string>('');
  const [selectedMessageType, setSelectedMessageType] = useState<MessageType>(MessageType.Info);

  // Field update helper
  const updateField = (field: keyof BasicInputsFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    const defaultData: BasicInputsFormData = {
      textValue: '',
      emailValue: '',
      passwordValue: '',
      numberValue: '',
      textareaValue: '',
    };
    setFormData(defaultData);
    addMessage('Basic inputs form reset to defaults');
  };

  const handleTextChange = (value: string) => {
    updateField('textValue', value);
    if (value.trim()) {
      addMessage(`Text input updated: ${value.substring(0, 20)}${value.length > 20 ? '...' : ''}`, MessageType.Info);
    }
  };

  const handleEmailChange = (value: string) => {
    updateField('emailValue', value);
    if (value.trim()) {
      addMessage(`Email input updated: ${value}`, MessageType.Info);
    }
  };

  const handlePasswordChange = (value: string) => {
    updateField('passwordValue', value);
    if (value.trim()) {
      addMessage(`Password input updated (${value.length} characters)`, MessageType.Info);
    }
  };

  const handleNumberChange = (value: string) => {
    updateField('numberValue', value);
    if (value.trim()) {
      addMessage(`Number input updated: ${value}`, MessageType.Info);
    }
  };

  const handleTextareaChange = (value: string) => {
    updateField('textareaValue', value);
    if (value.trim()) {
      addMessage(`Textarea updated: ${value.substring(0, 30)}${value.length > 30 ? '...' : ''}`, MessageType.Info);
    }
  };

  const handleSubmit = () => {
    const hasContent = formData.textValue || formData.emailValue || formData.passwordValue || formData.numberValue || formData.textareaValue;
    
    if (hasContent) {
      logSuccess(strings.submitSuccess);
    } else {
      logWarning(strings.submitError);
    }
  };

  const handleClear = () => {
    setFormData({
      textValue: '',
      emailValue: '',
      passwordValue: '',
      numberValue: '',
      textareaValue: '',
    });
    
    logInfo(strings.clearSuccess);
  };

  const handlePopupSubmit = () => {
    if (popupName && popupEmail) {
      logSuccess(`Popup form submitted: Name: ${popupName}, Email: ${popupEmail}`);
      
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title3>{strings.title}</Title3>
          </div>
          <Button 
            appearance="secondary"
            onClick={resetForm}
          >
            Reset Tab
          </Button>
        </div>
        <Caption1>{strings.description}</Caption1>
      </div>

      <div className={styles.formGrid}>
          <Field label={strings.textLabel} required>
            <Input
              placeholder={strings.textPlaceholder}
              value={formData.textValue}
              onChange={(_, data) => handleTextChange(data.value)}
              onFocus={() => logInteraction('Text input', 'focused')}
              onBlur={() => logInteraction('Text input', 'lost focus')}
            />
          </Field>

          <Field label={strings.emailLabel} required>
            <Input
              type="email"
              placeholder={strings.emailPlaceholder}
              value={formData.emailValue}
              onChange={(_, data) => handleEmailChange(data.value)}
              onFocus={() => addMessage('Email input focused', MessageType.Info)}
              onBlur={() => addMessage('Email input lost focus', MessageType.Info)}
            />
          </Field>

          <Field label={strings.passwordLabel} required>
            <Input
              type="password"
              placeholder={strings.passwordPlaceholder}
              value={formData.passwordValue}
              onChange={(_, data) => handlePasswordChange(data.value)}
              onFocus={() => addMessage('Password input focused', MessageType.Info)}
              onBlur={() => addMessage('Password input lost focus', MessageType.Info)}
            />
          </Field>

          <Field label={strings.numberLabel}>
            <Input
              type="number"
              placeholder={strings.numberPlaceholder}
              value={formData.numberValue}
              onChange={(_, data) => handleNumberChange(data.value)}
              onFocus={() => addMessage('Number input focused', MessageType.Info)}
              onBlur={() => addMessage('Number input lost focus', MessageType.Info)}
            />
          </Field>

          <Field label={strings.textareaLabel}>
            <Textarea
              placeholder={strings.textareaPlaceholder}
              value={formData.textareaValue}
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
                {strings.openContactForm}
              </Button>
            </PopoverTrigger>
            <PopoverSurface className={styles.popupForm}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
                <Title3 as="h3">{strings.contactInformationTitle}</Title3>
                
                <Field label="Name" required>
                  <Input
                    placeholder={strings.popupNamePlaceholder}
                    value={popupName}
                    onChange={(_, data) => setPopupName(data.value)}
                    onFocus={() => addMessage('Popup name field focused', MessageType.Info)}
                  />
                </Field>
                
                <Field label="Email" required>
                  <Input
                    type="email"
                    placeholder={strings.popupEmailPlaceholder}
                    value={popupEmail}
                    onChange={(_, data) => setPopupEmail(data.value)}
                    onFocus={() => addMessage('Popup email field focused', MessageType.Info)}
                  />
                </Field>
                
                <Field label="Message">
                  <Textarea
                    placeholder={strings.popupMessagePlaceholder}
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
              placeholder={strings.customMessagePlaceholder}
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
