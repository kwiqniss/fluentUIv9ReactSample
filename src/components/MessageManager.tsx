import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Text, Button } from '@fluentui/react-components';
import { makeStyles, tokens } from '@fluentui/react-components';
import { MessageContext, Message, MessageContextType } from '../utils/messageContext';
import { MessageType } from '../types/enums';

const useMessageManagerStyles = makeStyles({
  footer: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: tokens.spacingVerticalM,
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

  messageSuccess: {
    borderLeftColor: tokens.colorPaletteGreenBorder2,
    borderLeftWidth: '4px',
    backgroundColor: tokens.colorPaletteGreenBackground1,
  },
  
  messageError: {
    borderLeftColor: tokens.colorPaletteRedBorder2,
    borderLeftWidth: '4px',
    backgroundColor: tokens.colorPaletteRedBackground1,
  },
  
  messageWarning: {
    borderLeftColor: tokens.colorPaletteYellowBorder2,
    borderLeftWidth: '4px',
    backgroundColor: tokens.colorPaletteYellowBackground1,
  },
  
  messageInfo: {
    borderLeftColor: tokens.colorPaletteBlueBorderActive,
    borderLeftWidth: '4px',
    backgroundColor: tokens.colorPaletteBlueBackground2,
  },
});

interface MessageManagerProps {
  children: React.ReactNode;
}

/**
 * MessageManager component that provides centralized message state management
 * and renders the message display footer. Wraps children with MessageContext.
 */
const MessageManager: React.FC<MessageManagerProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const styles = useMessageManagerStyles();
  
  const addMessage = useCallback((text: string, type: MessageType = MessageType.Info) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      timestamp: new Date(),
      type,
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);
  
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
              Clear ({messages.length})
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
      <MessageFooter />
    </MessageContext.Provider>
  );
};

export default MessageManager;
