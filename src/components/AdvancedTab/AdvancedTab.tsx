import React, { useState } from 'react';
import {
  Field,
  Caption1,
  Slider,
  Button,
  SpinButton,
  Title3,
  mergeClasses,
  tokens,
  ProgressBar,
} from '@fluentui/react-components';
import { sharedStyles } from '../../SharedStyles.styles';
import { sharedLayoutStyles } from '../sharedLayout.styles';
import { advancedTabStyles } from './AdvancedTab.styles';
import { useMessages } from '../../utils/messageContext';
import { MessageType } from '../../types/enums';
import { button } from '../componentConstants';
import strings from './AdvancedTab.resx';
import { useLocalStorage } from '../../hooks';
import { formatString } from '../../formatString';

export interface AdvancedFormData {
  sliderValue: number;
  spinValue: number;
  rangeStart: number;
  rangeEnd: number;
  progress: number;
}

const AdvancedTab: React.FC = () => {
  const { addMessage } = useMessages();
  const styles = {
    ...sharedStyles(),
    ...sharedLayoutStyles(),
    ...advancedTabStyles(),
  };
  
  const [formData, setFormData] = useLocalStorage<AdvancedFormData>('advanced-form', {
    sliderValue: 50,
    spinValue: 5,
    rangeStart: 25,
    rangeEnd: 75,
    progress: 0,
  });

  const [progress, setProgress] = useState(formData.progress);

  const updateField = (field: keyof AdvancedFormData) => (value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    const defaultData: AdvancedFormData = {
      sliderValue: 50,
      spinValue: 5,
      rangeStart: 25,
      rangeEnd: 75,
      progress: 0,
    };
    setFormData(defaultData);
    setProgress(0);
    addMessage('Advanced form reset to defaults');
  };

  const simulateProgress = () => {
    if (progress === 100) {
      setProgress(0);
      addMessage('Progress reset to start new demo', MessageType.Info);
      return;
    }
    
    addMessage('Progress bar demo started', MessageType.Info);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newValue = prev + Math.random() * 10;
        if (newValue >= 100) {
          clearInterval(interval);
          addMessage('Progress demo completed!', MessageType.Success);
          return 100;
        }
        return newValue;
      });
    }, 200);
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.headerSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title3>{strings.title}</Title3>
          </div>
          <Button 
            appearance="secondary"
            onClick={resetForm}
          >
            Reset Tab
          </Button>
        </div>
        <Caption1>Advanced input controls for complex user interactions.</Caption1>
      </div>

      <div className={styles.formGrid}>
        <Field label={formatString(strings.slider, formData.sliderValue.toString())} className={styles.field}>
          <Slider
            value={formData.sliderValue}
            onChange={(e, data) => {
              updateField('sliderValue')(data.value);
              addMessage(`Slider moved to: ${data.value}`);
            }}
            min={0}
            max={100}
            step={1}
          />
        </Field>

        <Field label={formatString(strings.spinButton, formData.spinValue.toString())} className={styles.field}>
          <SpinButton
            value={formData.spinValue}
            onChange={(e, data) => {
              if (data.value !== undefined && data.value !== null) {
                updateField('spinValue')(data.value);
                addMessage(`Spin button changed to: ${data.value}`);
              }
            }}
            min={0}
            max={20}
            step={1}
          />
        </Field>

        <Field label={strings.rangeStart} className={styles.field}>
          <div>
            <input
              type="range"
              value={formData.rangeStart.toString()}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                updateField('rangeStart')(value);
                addMessage(`Range start set to: ${value}`);
              }}
              min="0"
              max="100"
            />
            <Caption1>Value: {formData.rangeStart}</Caption1>
          </div>
        </Field>

        <Field label={strings.rangeEnd} className={styles.field}>
          <div>
            <input
              type="range"
              value={formData.rangeEnd.toString()}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                updateField('rangeEnd')(value);
                addMessage(`Range end set to: ${value}`);
              }}
              min="0"
              max="100"
            />
            <Caption1>Value: {formData.rangeEnd}</Caption1>
          </div>
        </Field>

        <Field label={strings.colorInput} className={styles.field}>
          <input
            type="color"
            onChange={(e) => addMessage(`Color selected: ${e.target.value}`)}
            onFocus={() => addMessage('Color picker focused')}
            onBlur={() => addMessage('Color picker lost focus')}
            className={styles.colorInput}
          />
        </Field>

        <Field label={strings.fileInput} className={styles.field}>
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
          />
        </Field>
      </div>

      <Field label={strings.progressSimulation}>
        <div>
          <ProgressBar value={progress} max={100} />
          <Caption1>{progress.toFixed(1)}% Complete</Caption1>
          <Button
            appearance={button.primary}
            onClick={simulateProgress}
            disabled={progress > 0 && progress < 100}
          >
            {progress === 100 ? strings.resetProgress : progress > 0 ? strings.inProgress : strings.startProgress}
          </Button>
        </div>
      </Field>
    </div>
  );
};

export default AdvancedTab;
