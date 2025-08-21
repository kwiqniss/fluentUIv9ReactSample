import React, { useState, useId } from 'react';
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
import { sharedStyles } from '../styles/sharedStyles';

const BasicInputsTab: React.FC = () => {
  const styles = sharedStyles();
  const baseId = useId();
  
  // ID constants for labeled inputs
  const textInputId = `text-input-${baseId}`;
  const emailInputId = `email-input-${baseId}`;
  const passwordInputId = `password-input-${baseId}`;
  const numberInputId = `number-input-${baseId}`;
  const textareaId = `textarea-${baseId}`;
  const dialogNameInputId = `dialog-name-input-${baseId}`;
  const dialogEmailInputId = `dialog-email-input-${baseId}`;
  
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
    <div className={styles.tabContentStandardized}>
      <Body1>Basic Input Controls</Body1>
      
      <div className={styles.row}>
        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={textInputId}>Text Input</Label>
          <Input
            id={textInputId}
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
              addMessage(`Text input changed to: "${e.target.value}"`);
            }}
            onFocus={() => addMessage('Text input focused')}
            onBlur={() => addMessage('Text input lost focus')}
            placeholder="Enter some text..."
          />
        </div>

        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={emailInputId}>Email Input</Label>
          <Input
            id={emailInputId}
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
        </div>
      </div>

      <div className={styles.row}>
        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={passwordInputId}>Password Input</Label>
          <Input
            id={passwordInputId}
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
        </div>

        <div className={`${styles.field} ${styles.verticalStackTight}`}>
          <Label htmlFor={numberInputId}>Number Input</Label>
          <Input
            id={numberInputId}
            type="number"
            onChange={(e) => addMessage(`Number input changed to: ${e.target.value}`)}
            onFocus={() => addMessage('Number input focused')}
            onBlur={() => addMessage('Number input lost focus')}
            placeholder="Enter a number..."
          />
        </div>
      </div>

      <div className={styles.verticalStackTight}>
        <Label htmlFor={textareaId}>Textarea</Label>
        <Textarea
          id={textareaId}
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
      </div>

      <Button
        appearance="primary"
        onClick={() => addMessage('Submit button clicked!')}
      >
        Submit Form
      </Button>

      <Button
        appearance="secondary"
        onClick={handleOpenDialog}
        className={styles.buttonSpacing}
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
              <div className={styles.verticalStack}>
                <div className={styles.verticalStackTight}>
                  <Label htmlFor={dialogNameInputId} required>Full Name</Label>
                  <Input
                    id={dialogNameInputId}
                    value={dialogName}
                    onChange={(e) => {
                      setDialogName(e.target.value);
                      addMessage(`Dialog name field changed: "${e.target.value}"`);
                    }}
                    onFocus={() => addMessage('Dialog name field focused')}
                    onBlur={() => addMessage('Dialog name field lost focus')}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className={styles.verticalStackTight}>
                  <Label htmlFor={dialogEmailInputId} required>Contact Email</Label>
                  <Input
                    id={dialogEmailInputId}
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
                </div>
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
