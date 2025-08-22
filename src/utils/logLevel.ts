import { MessageType, LogLevel } from '../types/enums';

/**
 * Determines if a message should be logged based on the current log level
 */
export const shouldLogMessage = (messageType: MessageType, logLevel: LogLevel): boolean => {
  if (logLevel === LogLevel.Disabled) {
    return false;
  }
  
  if (logLevel === LogLevel.Error) {
    return messageType === MessageType.Error;
  }
  
  if (logLevel === LogLevel.Warning) {
    return messageType === MessageType.Error || messageType === MessageType.Warning;
  }
  
  if (logLevel === LogLevel.Info) {
    return messageType === MessageType.Error || 
           messageType === MessageType.Warning || 
           messageType === MessageType.Info;
  }
  
  if (logLevel === LogLevel.Verbose) {
    return true; // Log all message types including Success
  }
  
  return false;
};

/**
 * Get display name for log level
 */
export const getLogLevelDisplayName = (logLevel: LogLevel): string => {
  switch (logLevel) {
    case LogLevel.Disabled:
      return 'Disabled';
    case LogLevel.Error:
      return 'Error Only';
    case LogLevel.Warning:
      return 'Warning & Error';
    case LogLevel.Info:
      return 'Info, Warning & Error';
    case LogLevel.Verbose:
      return 'All Messages (Verbose)';
    default:
      return 'Unknown';
  }
};

/**
 * Get description for log level
 */
export const getLogLevelDescription = (logLevel: LogLevel): string => {
  switch (logLevel) {
    case LogLevel.Disabled:
      return 'No messages logged';
    case LogLevel.Error:
      return 'Only error messages';
    case LogLevel.Warning:
      return 'Warning and error messages';
    case LogLevel.Informational:
      return 'Success, warning, and error messages';
    case LogLevel.Verbose:
      return 'All messages including info';
    default:
      return '';
  }
};
