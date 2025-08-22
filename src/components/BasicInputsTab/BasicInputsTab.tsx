import React, { useState, useEffect } from 'react';
import {
  Input,
  Field,
  Textarea,
  Button,
  Card,
  CardHeader,
  Body1,
  Caption1,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogBody,
} from '@fluentui/react-components';
import { sharedStyles } from '../../sharedStyles';
import { basicInputsTabStyles } from './basicInputsTabStyles';
import { button } from '../../styles/componentConstants';
import basicStrings from './basic.resx';
import commonStrings from '../../common.resx';
import { formCache, CACHE_KEYS } from '../../utils/formCache';

// Consolidated strings object
const strings = {
  ...basicStrings,
  ...commonStrings,
};

export interface BasicInputsFormData {
  textValue: string;
  emailValue: string;
  passwordValue: string;
  textareaValue: string;
  numberValue: string;
  dialogName: string;
  dialogEmail: string;
  messages: string[];
}

const BasicInputsTab: React.FC = () => {
  const styles = {
    ...sharedStyles(),
    ...basicInputsTabStyles(),
  };
  
  // Load cached data or use defaults - this runs every time component mounts
  const getCachedData = (): BasicInputsFormData => {
    const cached = formCache.get<BasicInputsFormData>(CACHE_KEYS.BASIC_INPUTS);
    return cached || {
      textValue: '',
      emailValue: '',
      passwordValue: '',
      textareaValue: '',
      numberValue: '',
      dialogName: '',
      dialogEmail: '',
      messages: [],
    };
  };

  // Initialize state with cached data each time component mounts
  const initialData = getCachedData();
  
  const [messages, setMessages] = useState<string[]>(initialData.messages);
  const [textValue, setTextValue] = useState(initialData.textValue);
  const [emailValue, setEmailValue] = useState(initialData.emailValue);
  const [passwordValue, setPasswordValue] = useState(initialData.passwordValue);
  const [textareaValue, setTextareaValue] = useState(initialData.textareaValue);
  const [numberValue, setNumberValue] = useState(initialData.numberValue);
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogName, setDialogName] = useState(initialData.dialogName);
  const [dialogEmail, setDialogEmail] = useState(initialData.dialogEmail);

  // Cache form data whenever state changes
  useEffect(() => {
    const formData: BasicInputsFormData = {
      textValue,
      emailValue,
      passwordValue,
      textareaValue,
      numberValue,
      dialogName,
      dialogEmail,
      messages,
    };
    formCache.set(CACHE_KEYS.BASIC_INPUTS, formData);
  }, [textValue, emailValue, passwordValue, textareaValue, numberValue, dialogName, dialogEmail, messages]);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    addMessage('Opening contact dialog...');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    addMessage('Dialog closed');
  };

  const handleSubmitDialog = () => {
    if (dialogName.trim() && dialogEmail.trim()) {
      addMessage(`Contact form submitted: Name="${dialogName}", Email="${dialogEmail}"`);
      setDialogName('');
      setDialogEmail('');
      handleCloseDialog();
    } else {
      addMessage('Please fill in all required fields in the dialog');
    }
  };

  return (
    <div className={styles.tabContentStandardized}>
      <Body1>{strings.title}</Body1>
      
      <div className={styles.row}>
        <Field label={strings.textInput} className={styles.field}>
          <Input
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
              addMessage(`Text input changed to: "${e.target.value}"`);
            }}
            onFocus={() => addMessage('Text input focused')}
            onBlur={() => addMessage('Text input lost focus')}
            placeholder={strings.textInputPlaceholder}
          />
        </Field>

        <Field label={strings.emailInput} className={styles.field}>
          <Input
            type="email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
              addMessage(`Email input changed to: "${e.target.value}"`);
            }}
            onFocus={() => addMessage('Email input focused')}
            onBlur={() => addMessage('Email input lost focus')}
            placeholder={strings.emailInputPlaceholder}
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label={strings.passwordInput} className={styles.field}>
          <Input
            type="password"
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
              addMessage(`Password input changed (${e.target.value.length} characters)`);
            }}
            onFocus={() => addMessage('Password input focused')}
            onBlur={() => addMessage('Password input lost focus')}
            placeholder={strings.passwordInputPlaceholder}
          />
        </Field>

        <Field label={strings.numberInput} className={styles.field}>
          <Input
            type="number"
            value={numberValue}
            onChange={(e) => {
              setNumberValue(e.target.value);
              addMessage(`Number input changed to: ${e.target.value}`);
            }}
            onFocus={() => addMessage('Number input focused')}
            onBlur={() => addMessage('Number input lost focus')}
            placeholder={strings.numberInputPlaceholder}
          />
        </Field>
      </div>

      <Field label={strings.textarea}>
        <Textarea
          value={textareaValue}
          onChange={(e) => {
            setTextareaValue(e.target.value);
            addMessage(`Textarea changed (${e.target.value.length} characters)`);
          }}
          onFocus={() => addMessage('Textarea focused')}
          onBlur={() => addMessage('Textarea lost focus')}
          placeholder={strings.textareaPlaceholder}
          rows={4}
        />
      </Field>

      <Button
        appearance={button.primary}
        onClick={() => addMessage('Submit button clicked!')}
      >
        {strings.submit}
      </Button>

      <Button
        appearance={button.secondary}
        onClick={handleOpenDialog}
        className={styles.buttonSpacing}
      >
        {strings.openContactDialog}
      </Button>

      <Dialog 
        open={isDialogOpen}
        onOpenChange={(event, data) => {
          setIsDialogOpen(data.open);
          if (!data.open) {
            addMessage('Dialog closed via FluentUI focus management');
            setDialogName('');
            setDialogEmail('');
          }
        }}
        modalType="modal"
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{strings.contactInformation}</DialogTitle>
            <DialogContent>
              <div className={styles.verticalStack}>
                <Field label={strings.fullName} required>
                  <Input
                    value={dialogName}
                    onChange={(e) => {
                      setDialogName(e.target.value);
                      addMessage(`Dialog name field changed: "${e.target.value}"`);
                    }}
                    onFocus={() => addMessage('Dialog name field focused')}
                    onBlur={() => addMessage('Dialog name field lost focus')}
                    placeholder={strings.fullNamePlaceholder}
                  />
                </Field>
                
                <Field label={strings.contactEmail} required>
                  <Input
                    type="email"
                    value={dialogEmail}
                    onChange={(e) => {
                      setDialogEmail(e.target.value);
                      addMessage(`Dialog email field changed: "${e.target.value}"`);
                    }}
                    onFocus={() => addMessage('Dialog email field focused')}
                    onBlur={() => addMessage('Dialog email field lost focus')}
                    placeholder={strings.contactEmailPlaceholder}
                  />
                </Field>
              </div>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance={button.secondary}>{strings.cancel}</Button>
              </DialogTrigger>
              <Button appearance={button.primary} onClick={handleSubmitDialog}>
                {strings.submitContact}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <Card>
        <CardHeader header={<Body1>Interaction Messages</Body1>} />
        <div className={styles.messageScrollArea}>
          {messages.length === 0 ? (
            <Caption1>Interact with the controls above to see messages here...</Caption1>
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

export default BasicInputsTab;
