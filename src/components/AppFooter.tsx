import React, { useEffect, useRef } from 'react';
import { Text, Button } from '@fluentui/react-components';
import { useMessages } from '../utils/messageContext';
import { sharedStyles } from '../SharedStyles.styles';
import { makeStyles, tokens } from '@fluentui/react-components';

const useFooterStyles = makeStyles({
  footer: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: tokens.spacingVerticalM,
    marginTop: 'auto', // Push footer to bottom
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
});

const AppFooter: React.FC = () => {
  const { messages, clearMessages } = useMessages();
  const footerStyles = useFooterStyles();
  const sharedStyleClasses = sharedStyles();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages are added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footerContent}>
        <div className={footerStyles.messagesHeader}>
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
        
        <div ref={messagesContainerRef} className={footerStyles.messagesContainer}>
          {messages.length === 0 ? (
            <div className={footerStyles.emptyMessage}>
              No messages yet. Interact with the form controls above to see messages here.
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={footerStyles.messageItem}>
                <Text>{message.text}</Text>
              </div>
            ))
          )}
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
