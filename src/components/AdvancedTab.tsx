import React, { useState } from 'react';
import {
  Field,
  Body1,
  Caption1,
  Card,
  CardHeader,
  Slider,
  Input,
  ProgressBar,
  Button,
  SpinButton,
} from '@fluentui/react-components';
import { useSharedStyles } from './sharedStyles';

const AdvancedTab: React.FC = () => {
  const sharedStyles = useSharedStyles();
  const [messages, setMessages] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(50);
  const [rangeStart, setRangeStart] = useState(20);
  const [rangeEnd, setRangeEnd] = useState(80);
  const [progress, setProgress] = useState(0);
  const [spinValue, setSpinValue] = useState(5);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const simulateProgress = () => {
    setProgress(0);
    addMessage('Progress simulation started');
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newValue = prev + 10;
        if (newValue >= 100) {
          clearInterval(interval);
          addMessage('Progress simulation completed');
          return 100;
        }
        return newValue;
      });
    }, 200);
  };

  return (
    <div className={sharedStyles.tabContentStandardized}>
      <Body1>Advanced Controls</Body1>
      
      <div className={sharedStyles.row}>
        <Field label={`Slider (Value: ${sliderValue})`} className={sharedStyles.field}>
          <Slider
            value={sliderValue}
            onChange={(e, data) => {
              setSliderValue(data.value);
              addMessage(`Slider moved to: ${data.value}`);
            }}
            min={0}
            max={100}
            step={1}
          />
        </Field>

        <Field label={`Spin Button (Value: ${spinValue})`} className={sharedStyles.field}>
          <SpinButton
            value={spinValue}
            onChange={(e, data) => {
              if (data.value !== undefined && data.value !== null) {
                setSpinValue(data.value);
                addMessage(`Spin button changed to: ${data.value}`);
              }
            }}
            min={0}
            max={20}
            step={1}
          />
        </Field>
      </div>

      <div className={sharedStyles.row}>
        <Field label="Range Input (Start)" className={sharedStyles.field}>
          <input
            type="range"
            value={rangeStart.toString()}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setRangeStart(value);
              addMessage(`Range start set to: ${value}`);
            }}
            min="0"
            max="100"
            className={sharedStyles.fullWidthInput}
          />
          <Caption1>Value: {rangeStart}</Caption1>
        </Field>

        <Field label="Range Input (End)" className={sharedStyles.field}>
          <input
            type="range"
            value={rangeEnd.toString()}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setRangeEnd(value);
              addMessage(`Range end set to: ${value}`);
            }}
            min="0"
            max="100"
            className={sharedStyles.fullWidthInput}
          />
          <Caption1>Value: {rangeEnd}</Caption1>
        </Field>
      </div>

      <Field label="Progress Simulation">
        <div className={sharedStyles.verticalSection}>
          <ProgressBar value={progress} max={100} />
          <Caption1>{progress}% Complete</Caption1>
          <Button
            appearance="primary"
            onClick={simulateProgress}
            disabled={progress > 0 && progress < 100}
          >
            {progress === 100 ? 'Reset Progress' : progress > 0 ? 'In Progress...' : 'Start Progress'}
          </Button>
        </div>
      </Field>

      <Field label="Color Input">
        <input
          type="color"
          onChange={(e) => addMessage(`Color selected: ${e.target.value}`)}
          onFocus={() => addMessage('Color picker focused')}
          onBlur={() => addMessage('Color picker lost focus')}
          className={sharedStyles.colorInput}
        />
      </Field>

      <Field label="File Input">
        <input
          type="file"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              addMessage(`File selected: ${files[0].name} (${files[0].size} bytes)`);
            }
          }}
          onFocus={() => addMessage('File input focused')}
          onBlur={() => addMessage('File input lost focus')}
          className={sharedStyles.fullWidthInput}
        />
      </Field>

      <Card className={sharedStyles.messageArea}>
        <CardHeader header={<Body1>Interaction Messages</Body1>} />
        <div className={sharedStyles.messageScrollArea}>
          {messages.length === 0 ? (
            <Caption1>Interact with the advanced controls above to see messages here...</Caption1>
          ) : (
            messages.map((message, index) => (
              <div key={index}>
                <Caption1>{message}</Caption1>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdvancedTab;
