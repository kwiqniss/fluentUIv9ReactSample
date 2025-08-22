import React, { useState, useEffect } from 'react';
import {
  Field,
  Body1,
  Caption1,
  Slider,
  ProgressBar,
  Button,
  SpinButton,
  mergeClasses,
} from '@fluentui/react-components';
import { sharedStyles } from '../../SharedStyles.styles';
import { advancedTabStyles } from './AdvancedTab.styles';
import { useMessages } from '../../utils/messageContext';
import { button } from '../componentConstants';
import strings from './AdvancedTab.resx';
import { formCache, CACHE_KEYS } from '../../utils/formCache';
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
    ...advancedTabStyles(),
  };
  
  const getCachedData = (): AdvancedFormData => {
    const cached = formCache.get<AdvancedFormData>(CACHE_KEYS.ADVANCED);
    return cached || {
      sliderValue: 50,
      spinValue: 5,
      rangeStart: 25,
      rangeEnd: 75,
      progress: 0,
    };
  };

  const initialData = getCachedData();
  
  const [sliderValue, setSliderValue] = useState(initialData.sliderValue);
  const [spinValue, setSpinValue] = useState(initialData.spinValue);
  const [rangeStart, setRangeStart] = useState(initialData.rangeStart);
  const [rangeEnd, setRangeEnd] = useState(initialData.rangeEnd);
  const [progress, setProgress] = useState(initialData.progress);

  useEffect(() => {
    const formData: AdvancedFormData = {
      sliderValue,
      spinValue,
      rangeStart,
      rangeEnd,
      progress,
    };
    formCache.set(CACHE_KEYS.ADVANCED, formData);
  }, [sliderValue, spinValue, rangeStart, rangeEnd, progress]);

  const simulateProgress = () => {
    if (progress === 100) {
      setProgress(0);
      addMessage('Progress reset to start new demo', 'info');
      return;
    }
    
    addMessage('Progress bar demo started', 'info');
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newValue = prev + Math.random() * 10;
        if (newValue >= 100) {
          clearInterval(interval);
          addMessage('Progress demo completed!', 'success');
          return 100;
        }
        return newValue;
      });
    }, 200);
  };

  return (
    <div className={styles.tabContentStandardized}>
      <Body1 as="h2" className={mergeClasses(styles.sectionTitle, styles.h2Heading)}>{strings.title}</Body1>
      
      <div className={styles.inputGrid}>
        <Field label={formatString(strings.slider, sliderValue.toString())} className={styles.field}>
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

        <Field label={formatString(strings.spinButton, spinValue.toString())} className={styles.field}>
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

        <Field label={strings.rangeStart} className={styles.field}>
          <div>
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
            />
            <Caption1>Value: {rangeStart}</Caption1>
          </div>
        </Field>

        <Field label={strings.rangeEnd} className={styles.field}>
          <div>
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
            />
            <Caption1>Value: {rangeEnd}</Caption1>
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
