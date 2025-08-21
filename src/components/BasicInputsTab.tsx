import React, { useState, useRef, useEffect } from 'react';
import {
  makeStyles,
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

const useStyles = makeStyles({
  calloutButton: {
    marginTop: '0.625rem',
  },
});

const BasicInputsTab: React.FC = () => {
  const styles = useStyles();
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
  
  // Focus management refs
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const dialogNameRef = useRef<HTMLInputElement>(null);
  const calloutButtonRef = useRef<HTMLButtonElement>(null);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Focus management
  useEffect(() => {
    if (isDialogOpen && dialogNameRef.current) {
      // Focus the first input in the dialog when it opens
      setTimeout(() => {
        dialogNameRef.current?.focus();
        addMessage('Dialog opened - focus set to name field');
      }, 100);
    }
  }, [isDialogOpen]);

  // Debug effect - remove this in production
  useEffect(() => {
    console.log('BasicInputsTab Debug:', {
      textValue,
      emailValue,
      isDialogOpen,
      messagesCount: messages.length
    });
  }, [textValue, emailValue, isDialogOpen, messages.length]);

  const handleOpenDialog = () => {
    // Debug: Log current focus state
    console.log('Opening dialog. Current focus:', document.activeElement);
    
    // Store the currently focused element
    lastFocusedElement.current = document.activeElement as HTMLElement;
    setIsDialogOpen(true);
    addMessage('Opening contact dialog...');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    addMessage('Dialog closed - restoring focus');
    
    // Restore focus to the previously focused element
    setTimeout(() => {
      if (lastFocusedElement.current) {
        lastFocusedElement.current.focus();
        addMessage('Focus restored to previous element');
      }
    }, 100);
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
    <div className={sharedStyles.container}>
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
        ref={calloutButtonRef}
        appearance="secondary"
        onClick={handleOpenDialog}
        className={styles.calloutButton}
      >
        Open Contact Dialog
      </Button>

      <Dialog open={isDialogOpen}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Contact Information</DialogTitle>
            <DialogContent>
              <div className={sharedStyles.dialogContent}>
                <Field label="Full Name" required>
                  <Input
                    ref={dialogNameRef}
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
              <Button appearance="secondary" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button appearance="primary" onClick={handleSubmitDialog}>
                Submit Contact
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <Card className={sharedStyles.messageArea}>
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
