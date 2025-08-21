/**
 * BasicInputsTab component strings
 */

export const basicStrings = {
  title: 'Basic Input Controls',
  labels: {
    textInput: 'Text Input',
    emailInput: 'Email Input',
    passwordInput: 'Password Input',
    numberInput: 'Number Input',
    textarea: 'Textarea',
  },
  placeholders: {
    textInput: 'Enter some text...',
    emailInput: 'Enter your email...',
    passwordInput: 'Enter password...',
    numberInput: 'Enter a number...',
    textarea: 'Enter multiple lines of text...',
  },
  dialog: {
    trigger: 'Open Contact Dialog',
    title: 'Contact Information',
    labels: {
      fullName: 'Full Name',
      contactEmail: 'Contact Email',
    },
    placeholders: {
      fullName: 'Enter your full name',
      contactEmail: 'Enter your contact email',
    },
    submit: 'Submit Contact',
    validation: 'Please fill in all required fields in the dialog',
  },
} as const;
