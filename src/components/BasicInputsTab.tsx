import React, { useState } from 'react';
import {
  Input,
  Label,
  Textarea,
  Button,
  Field,
  Text,
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
import { useSharedStyles } from './sharedStyles';

const BasicInputsTab: React.FC = () => {
  const sharedStyles = useSharedStyles();
  const [messages, setMessages] = useState<string[]>([]);
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogName, setDialogName] = useState('');
  const [dialogEmail, setDialogEmail] = useState('');

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
    <div className={sharedStyles.tabContentStandardized}>
      <Body1>Basic Input Controls</Body1>
      
      <div className={sharedStyles.row}>
        <Field label="Text Input" className={sharedStyles.field}>
          <Input
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
              addMessage(`Text input changed to: "${e.target.value}"`);
            }}
            onFocus={() => addMessage('Text input focused')}
            onBlur={() => addMessage('Text input lost focus')}
            placeholder="Enter some text..."
          />
        </Field>

        <Field label="Email Input" className={sharedStyles.field}>
          <Input
            type="email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
              addMessage(`Email input changed to: "${e.target.value}"`);
            }}
            onFocus={() => addMessage('Email input focused')}
            onBlur={() => addMessage('Email input lost focus')}
            placeholder="Enter your email..."
          />
        </Field>
      </div>

      <div className={sharedStyles.row}>
        <Field label="Password Input" className={sharedStyles.field}>
          <Input
            type="password"
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
              addMessage(`Password input changed (${e.target.value.length} characters)`);
            }}
            onFocus={() => addMessage('Password input focused')}
            onBlur={() => addMessage('Password input lost focus')}
            placeholder="Enter password..."
          />
        </Field>

        <Field label="Number Input" className={sharedStyles.field}>
          <Input
            type="number"
            onChange={(e) => addMessage(`Number input changed to: ${e.target.value}`)}
            onFocus={() => addMessage('Number input focused')}
            onBlur={() => addMessage('Number input lost focus')}
            placeholder="Enter a number..."
          />
        </Field>
      </div>

      <Field label="Textarea">
        <Textarea
          value={textareaValue}
          onChange={(e) => {
            setTextareaValue(e.target.value);
            addMessage(`Textarea changed (${e.target.value.length} characters)`);
          }}
          onFocus={() => addMessage('Textarea focused')}
          onBlur={() => addMessage('Textarea lost focus')}
          placeholder="Enter multiple lines of text..."
          rows={4}
        />
      </Field>

      <Button
        appearance="primary"
        onClick={() => addMessage('Submit button clicked!')}
      >
        Submit Form
      </Button>

      <Button
        appearance="secondary"
        onClick={handleOpenDialog}
        className={sharedStyles.buttonSpacing}
      >
        Open Contact Dialog
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
            <DialogTitle>Contact Information</DialogTitle>
            <DialogContent>
              <div className={sharedStyles.verticalStack}>
                <Field label="Full Name" required>
                  <Input
                    value={dialogName}
                    onChange={(e) => {
                      setDialogName(e.target.value);
                      addMessage(`Dialog name field changed: "${e.target.value}"`);
                    }}
                    onFocus={() => addMessage('Dialog name field focused')}
                    onBlur={() => addMessage('Dialog name field lost focus')}
                    placeholder="Enter your full name"
                  />
                </Field>
                
                <Field label="Contact Email" required>
                  <Input
                    type="email"
                    value={dialogEmail}
                    onChange={(e) => {
                      setDialogEmail(e.target.value);
                      addMessage(`Dialog email field changed: "${e.target.value}"`);
                    }}
                    onFocus={() => addMessage('Dialog email field focused')}
                    onBlur={() => addMessage('Dialog email field lost focus')}
                    placeholder="Enter your contact email"
                  />
                </Field>
              </div>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
              <Button appearance="primary" onClick={handleSubmitDialog}>
                Submit Contact
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <Card>
        <CardHeader header={<Body1>Interaction Messages</Body1>} />
        <div className={sharedStyles.messageScrollArea}>
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
