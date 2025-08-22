import { MessageType, LogLevel } from '../types/enums';

/**
 * Determines if a message should be logged based on the current log level
 */
export const shouldLogMessage = (messageType: MessageType, logLevel: LogLevel): boolean => {
  if (logLevel === LogLevel.None) {
    return false;
  }
  
  if (logLevel === LogLevel.Errors) {
    return messageType === MessageType.Error;
  }
  
  if (logLevel === LogLevel.Warnings) {
    return messageType === MessageType.Error || messageType === MessageType.Warning;
  }
  
  if (logLevel === LogLevel.Informational) {
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
    case LogLevel.Verbose:
      return 'Verbose';
    case LogLevel.Informational:
      return 'Informational';
    case LogLevel.Warnings:
      return 'Warnings';
    case LogLevel.Errors:
      return 'Errors';
    case LogLevel.None:
      return 'None';
    default:
      return 'Unknown';
  }
};

/**
 * Get description for log level
 */
export const getLogLevelDescription = (logLevel: LogLevel): string => {
  switch (logLevel) {
    case LogLevel.Verbose:
      return 'All messages including info';
    case LogLevel.Informational:
      return 'Success, warning, and error messages';
    case LogLevel.Warnings:
      return 'Warning and error messages';
    case LogLevel.Errors:
      return 'Only error messages';
    case LogLevel.None:
      return 'No messages logged';
    default:
      return '';
  }
};
