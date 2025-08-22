import { createContext, useContext } from 'react';

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface MessageContextType {
  messages: Message[];
  addMessage: (text: string, type?: Message['type']) => void;
  clearMessages: () => void;
}

export const MessageContext = createContext<MessageContextType | null>(null);

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
