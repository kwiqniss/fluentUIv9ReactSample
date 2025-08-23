import React, { useState } from 'react';
import { Button, Input, Field, tokens } from '@fluentui/react-components';
import { useMessageLogger } from '../hooks/useMessageLogger';
import appStrings from '../app.resx';

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
      <h3>{appStrings.messageDemoTitle}</h3>
      
      <Field label={appStrings.testInputLabel}>
        <Input
          value={inputValue}
          onChange={(_, data) => setInputValue(data.value)}
          onFocus={() => logInteraction('Demo Input', 'focused')}
          onBlur={() => logInteraction('Demo Input', 'blurred', inputValue || 'empty')}
          placeholder={appStrings.testInputPlaceholder}
        />
      </Field>

      <div style={{ display: 'flex', gap: tokens.spacingHorizontalS, flexWrap: 'wrap' }}>
        <Button 
          appearance="primary" 
          onClick={handleSubmit}
        >
          {appStrings.submitFormButton}
        </Button>
        
        <Button 
          appearance="secondary" 
          onClick={() => logInfo('This is an info message')}
        >
          {appStrings.logInfoButton}
        </Button>
        
        <Button 
          appearance="secondary" 
          onClick={() => logSuccess('Operation completed successfully!')}
        >
          {appStrings.logSuccessButton}
        </Button>
        
        <Button 
          appearance="secondary" 
          onClick={() => logWarning('This is a warning message')}
        >
          {appStrings.logWarningButton}
        </Button>
        
        <Button 
          appearance="secondary" 
          onClick={() => logError('Something went wrong!')}
        >
          {appStrings.logErrorButton}
        </Button>
        
        <Button 
          appearance="subtle" 
          onClick={clearMessages}
        >
          {appStrings.clearMessagesButton}
        </Button>
      </div>
    </div>
  );
};

export default MessageDemo;
