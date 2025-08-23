import React, { useState } from 'react';
import { Button, Input, Field, tokens } from '@fluentui/react-components';
import { useMessageLogger } from '../hooks/useMessageLogger';

/**
 * Example component demonstrating the MessageManager and useMessageLogger APIs
 * This showcases various logging patterns and convenience methods
 */
const MessageDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { 
    logInfo, 
    logSuccess, 
    logWarning, 
    logError,
    logInteraction,
    logFormSubmission,
    clearMessages 
  } = useMessageLogger();

  const handleSubmit = () => {
    if (inputValue.trim()) {
      logFormSubmission('Demo Form', true, `Value: "${inputValue}"`);
      setInputValue('');
    } else {
      logFormSubmission('Demo Form', false, 'Input value is required');
    }
  };

  return (
    <div style={{ padding: tokens.spacingHorizontalL, display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
      <h3>MessageManager Demo</h3>
      
      <Field label="Test Input">
        <Input
          value={inputValue}
          onChange={(_, data) => setInputValue(data.value)}
          onFocus={() => logInteraction('Demo Input', 'focused')}
          onBlur={() => logInteraction('Demo Input', 'blurred', inputValue || 'empty')}
          placeholder="Type something..."
        />
      </Field>

      <div style={{ display: 'flex', gap: tokens.spacingHorizontalS, flexWrap: 'wrap' }}>
        <Button 
          appearance="primary" 
          onClick={handleSubmit}
        >
          Submit Form
        </Button>
        
        <Button 
          appearance="secondary" 
          onClick={() => logInfo('This is an info message')}
        >
          Log Info
        </Button>
        
        <Button 
          appearance="secondary" 
          onClick={() => logSuccess('Operation completed successfully!')}
        >
          Log Success
        </Button>
        
        <Button 
          appearance="secondary" 
          onClick={() => logWarning('This is a warning message')}
        >
          Log Warning
        </Button>
        
        <Button 
          appearance="secondary" 
          onClick={() => logError('Something went wrong!')}
        >
          Log Error
        </Button>
        
        <Button 
          appearance="subtle" 
          onClick={clearMessages}
        >
          Clear Messages
        </Button>
      </div>
    </div>
  );
};

export default MessageDemo;
