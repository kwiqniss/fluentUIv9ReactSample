import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Text, Button } from '@fluentui/react-components';
import { makeStyles, tokens } from '@fluentui/react-components';
import { MessageContext, Message, MessageContextType } from '../utils/messageContext';
import { MessageType, LogLevel } from '../types/enums';
import { shouldLogMessage } from '../utils/logLevel';

const useMessageManagerStyles = makeStyles({
  footer: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalL,
    marginTop: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  
  footerContent: {
    maxWidth: '75rem',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  
  messagesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalXS,
  },
  
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    minHeight: '3rem',
    maxHeight: '10rem',
    overflowY: 'auto',
    padding: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusSmall,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  
  messageItem: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  
  emptyMessage: {
    color: tokens.colorNeutralForeground3,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: tokens.spacingVerticalS,
  },

  // Subtle type indicators (optional left border accents)
  messageSuccess: {
    borderLeftColor: tokens.colorPaletteGreenBorder2,
    borderLeftWidth: '2px',
  },
  
  messageError: {
    borderLeftColor: tokens.colorPaletteRedBorder2,
    borderLeftWidth: '2px',
  },
  
  messageWarning: {
    borderLeftColor: tokens.colorPaletteYellowBorder2,
    borderLeftWidth: '2px',
  },
  
  messageInfo: {
    // No special styling for info - keeps the neutral theme look
  },
});

interface MessageManagerProps {
  children: React.ReactNode;
  logLevel: LogLevel;
}

/**
 * MessageManager component that provides centralized message state management
 * and renders the message display footer. Wraps children with MessageContext.
 */
const MessageManager: React.FC<MessageManagerProps> = ({ children, logLevel }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const styles = useMessageManagerStyles();
  
  const addMessage = useCallback((text: string, type: MessageType = MessageType.Info) => {
    // Only add message if it should be logged at the current level
    if (!shouldLogMessage(type, logLevel)) {
      return;
    }
    
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      timestamp: new Date(),
      type,
    };
    setMessages(prev => [...prev, newMessage]);
  }, [logLevel]);
  
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);
  
  const messageContextValue: MessageContextType = {
    messages,
    addMessage,
    clearMessages,
  };

  // Auto-scroll to bottom when messages are added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessageTypeClass = (messageType?: MessageType) => {
    switch (messageType) {
      case MessageType.Success:
        return styles.messageSuccess;
      case MessageType.Error:
        return styles.messageError;
      case MessageType.Warning:
        return styles.messageWarning;
      case MessageType.Info:
      default:
        return styles.messageInfo;
    }
  };

  const MessageFooter = () => (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.messagesHeader}>
          <Text weight="semibold">Messages</Text>
          {messages.length > 0 && (
            <Button 
              appearance="subtle" 
              size="small" 
              onClick={clearMessages}
            >
              Clear
            </Button>
          )}
        </div>
        
        <div ref={messagesContainerRef} className={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div className={styles.emptyMessage}>
              No messages yet. Interact with the form controls above to see messages here.
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`${styles.messageItem} ${getMessageTypeClass(message.type)}`}
              >
                <Text>{message.text}</Text>
              </div>
            ))
          )}
        </div>
      </div>
    </footer>
  );

  return (
    <MessageContext.Provider value={messageContextValue}>
      {children}
      {logLevel !== LogLevel.Disabled && <MessageFooter />}
    </MessageContext.Provider>
  );
};

export default MessageManager;
