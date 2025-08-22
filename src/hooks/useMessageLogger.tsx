import { useMessages } from '../utils/messageContext';
import { MessageType } from '../types/enums';

/**
 * Custom hook that provides convenient message logging functions
 * with predefined message types for common scenarios.
 */
export const useMessageLogger = () => {
  const { addMessage, clearMessages, messages } = useMessages();

  return {
    // Core functions
    addMessage,
    clearMessages,
    messages,
    
    // Convenience functions with predefined types
    logInfo: (text: string) => addMessage(text, MessageType.Info),
    logSuccess: (text: string) => addMessage(text, MessageType.Success),
    logWarning: (text: string) => addMessage(text, MessageType.Warning),
    logError: (text: string) => addMessage(text, MessageType.Error),
    
    // Common interaction patterns
    logInteraction: (element: string, action: string, value?: string) => {
      const valueText = value ? ` (${value})` : '';
      addMessage(`${element}: ${action}${valueText}`, MessageType.Info);
    },
    
    logFormSubmission: (formName: string, success: boolean, details?: string) => {
      const type = success ? MessageType.Success : MessageType.Error;
      const message = `${formName} ${success ? 'submitted successfully' : 'submission failed'}${details ? `: ${details}` : ''}`;
      addMessage(message, type);
    },
    
    logStateChange: (component: string, oldValue: string, newValue: string) => {
      addMessage(`${component} changed from "${oldValue}" to "${newValue}"`, MessageType.Info);
    }
  };
};
