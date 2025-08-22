import { createContext, useContext } from 'react';
import { MessageType } from '../types/enums';

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  type?: MessageType;
}

export interface MessageContextType {
  messages: Message[];
  addMessage: (text: string, type?: MessageType) => void;
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
