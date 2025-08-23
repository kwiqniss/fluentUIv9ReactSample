import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Text, Button, Tooltip } from '@fluentui/react-components';
import { makeStyles, tokens } from '@fluentui/react-components';
import { MessageContext, Message, MessageContextType } from '../utils/messageContext';
import { MessageType, LogLevel } from '../types/enums';
import { shouldLogMessage } from '../utils/logLevel';
import { formatString } from '../formatString';
import commonStrings from '../common.resx';
import {
  CheckmarkCircleRegular,
  InfoRegular,
  WarningRegular,
  ErrorCircleRegular,
} from '@fluentui/react-icons';

// Local constants for message container sizing
const SIZES = {
  maxContentWidth: '75rem',
  messagesMinHeight: '3rem',
  messagesMaxHeight: '10rem',
} as const;

const useMessageManagerStyles = makeStyles({
  footer: {
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    padding: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  
  footerContent: {
    maxWidth: SIZES.maxContentWidth,
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
    minHeight: SIZES.messagesMinHeight,
    maxHeight: SIZES.messagesMaxHeight,
    overflowY: 'auto',
    padding: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusSmall,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  
  messageItem: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
  },

  messageIcon: {
    fontSize: tokens.fontSizeBase400, // Increased from Base200 to Base400
    flexShrink: 0,
  },

  messageText: {
    flex: 1,
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
    borderLeftWidth: tokens.strokeWidthThick,
  },
  
  messageError: {
    borderLeftColor: tokens.colorPaletteRedBorder2,
    borderLeftWidth: tokens.strokeWidthThick,
  },
  
  messageWarning: {
    borderLeftColor: tokens.colorPaletteYellowBorder2,
    borderLeftWidth: tokens.strokeWidthThick,
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

  const getMessageIcon = (messageType?: MessageType) => {
    const iconStyle = { fontSize: tokens.fontSizeBase400 };
    
    switch (messageType) {
      case MessageType.Success:
        return (
          <Tooltip content={commonStrings.successMessageTooltip} relationship="label">
            <CheckmarkCircleRegular 
              style={{ ...iconStyle, color: tokens.colorPaletteGreenBorder2 }} 
            />
          </Tooltip>
        );
      case MessageType.Error:
        return (
          <Tooltip content={commonStrings.errorMessageTooltip} relationship="label">
            <ErrorCircleRegular 
              style={{ ...iconStyle, color: tokens.colorPaletteRedBorder2 }} 
            />
          </Tooltip>
        );
      case MessageType.Warning:
        return (
          <Tooltip content={commonStrings.warningMessageTooltip} relationship="label">
            <WarningRegular 
              style={{ ...iconStyle, color: tokens.colorPaletteYellowBorder2 }} 
            />
          </Tooltip>
        );
      case MessageType.Info:
      default:
        return (
          <Tooltip content={commonStrings.infoMessageTooltip} relationship="label">
            <InfoRegular 
              style={{ ...iconStyle, color: tokens.colorNeutralForeground2 }} 
            />
          </Tooltip>
        );
    }
  };

  const MessageFooter = () => (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.messagesHeader}>
          <Text weight="semibold">{commonStrings.messages}</Text>
          {messages.length > 0 && (
            <Button 
              appearance="subtle" 
              size="small" 
              onClick={clearMessages}
            >
              {commonStrings.clear}
            </Button>
          )}
        </div>
        
        <div ref={messagesContainerRef} className={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div className={styles.emptyMessage}>
              {commonStrings.noMessagesYet}
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`${styles.messageItem} ${getMessageTypeClass(message.type)}`}
              >
                <div className={styles.messageIcon}>
                  {getMessageIcon(message.type)}
                </div>
                <div className={styles.messageText}>
                  <Text>{message.text}</Text>
                </div>
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
      {logLevel !== LogLevel.None && <MessageFooter />}
    </MessageContext.Provider>
  );
};

export default MessageManager;
