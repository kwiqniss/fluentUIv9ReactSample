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
  Checkbox,
  Text,
  tokens,
} from '@fluentui/react-components';
import {
  Laptop20Regular,
  Phone20Regular,
  Book20Regular,
  MusicNote220Regular,
  Games20Regular,
  Camera20Regular,
  Add20Regular,
  Delete20Regular,
  Info20Regular,
} from '@fluentui/react-icons';
import { sharedStyles } from '../styles/sharedStyles';
import { advancedTabStyles } from '../styles/componentStyles/advancedTabStyles';

enum ProductCategory {
  Electronics = 'Electronics',
  Books = 'Books',
  Music = 'Music',
  Gaming = 'Gaming',
  Photography = 'Photography',
}

interface Product {
  id: string;
  name: string;
  bingSearchUrl: string;
  category: ProductCategory;
}

const productCategories = {
  [ProductCategory.Electronics]: { icon: <Laptop20Regular />, color: tokens.colorPaletteBlueBackground2 },
  [ProductCategory.Books]: { icon: <Book20Regular />, color: tokens.colorPaletteTealBackground2 },
  [ProductCategory.Music]: { icon: <MusicNote220Regular />, color: tokens.colorPaletteNavyBackground2 },
  [ProductCategory.Gaming]: { icon: <Games20Regular />, color: tokens.colorPaletteForestBackground2 },
  [ProductCategory.Photography]: { icon: <Camera20Regular />, color: tokens.colorPaletteMarigoldBackground2 },
};

const defaultProducts: Product[] = [
  { id: '1', name: 'MacBook Pro', bingSearchUrl: 'https://www.bing.com/search?q=MacBook+Pro', category: ProductCategory.Electronics },
  { id: '2', name: 'iPhone 15', bingSearchUrl: 'https://www.bing.com/search?q=iPhone+15', category: ProductCategory.Electronics },
  { id: '3', name: 'The Great Gatsby', bingSearchUrl: 'https://www.bing.com/search?q=The+Great+Gatsby+book', category: ProductCategory.Books },
  { id: '4', name: 'Dune', bingSearchUrl: 'https://www.bing.com/search?q=Dune+book', category: ProductCategory.Books },
  { id: '5', name: 'Beatles Abbey Road', bingSearchUrl: 'https://www.bing.com/search?q=Beatles+Abbey+Road', category: ProductCategory.Music },
  { id: '6', name: 'Taylor Swift 1989', bingSearchUrl: 'https://www.bing.com/search?q=Taylor+Swift+1989', category: ProductCategory.Music },
  { id: '7', name: 'PlayStation 5', bingSearchUrl: 'https://www.bing.com/search?q=PlayStation+5', category: ProductCategory.Gaming },
  { id: '8', name: 'Nintendo Switch', bingSearchUrl: 'https://www.bing.com/search?q=Nintendo+Switch', category: ProductCategory.Gaming },
  { id: '9', name: 'Canon EOS R5', bingSearchUrl: 'https://www.bing.com/search?q=Canon+EOS+R5', category: ProductCategory.Photography },
  { id: '10', name: 'Sony A7 IV', bingSearchUrl: 'https://www.bing.com/search?q=Sony+A7+IV', category: ProductCategory.Photography },
  { id: '11', name: 'iPad Air', bingSearchUrl: 'https://www.bing.com/search?q=iPad+Air', category: ProductCategory.Electronics },
  { id: '12', name: 'To Kill a Mockingbird', bingSearchUrl: 'https://www.bing.com/search?q=To+Kill+a+Mockingbird+book', category: ProductCategory.Books },
];

const AdvancedTab: React.FC = () => {
  const styles = {
    ...sharedStyles(),
    ...advancedTabStyles(),
  };
  const [messages, setMessages] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(50);
  const [rangeStart, setRangeStart] = useState(20);
  const [rangeEnd, setRangeEnd] = useState(80);
  const [progress, setProgress] = useState(0);
  const [spinValue, setSpinValue] = useState(5);
  
  // Product management state
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set(['1', '3', '7'])); // Default selection
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<ProductCategory>(ProductCategory.Electronics);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const toggleProductSelection = (productId: string) => {
    const newSelection = new Set(selectedProductIds);
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
      addMessage(`Deselected product: ${products.find(p => p.id === productId)?.name}`);
    } else {
      newSelection.add(productId);
      addMessage(`Selected product: ${products.find(p => p.id === productId)?.name}`);
    }
    setSelectedProductIds(newSelection);
  };

  const addNewProduct = () => {
    if (!newProductName.trim()) return;
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: newProductName.trim(),
      bingSearchUrl: `https://www.bing.com/search?q=${encodeURIComponent(newProductName.trim())}`,
      category: newProductCategory,
    };
    
    setProducts(prev => [...prev, newProduct]);
    setNewProductName('');
    addMessage(`Added new product: ${newProduct.name} (${newProduct.category})`);
  };

  const removeProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    setSelectedProductIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
    if (product) {
      addMessage(`Removed product: ${product.name}`);
    }
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
    <div className={styles.tabContentStandardized}>
      <Body1>Advanced Controls</Body1>
      
      <div className={styles.row}>
        <Field label={`Slider (Value: ${sliderValue})`} className={styles.field}>
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

        <Field label={`Spin Button (Value: ${spinValue})`} className={styles.field}>
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

      <div className={styles.row}>
        <Field label="Range Input (Start)" className={styles.field}>
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
            className={styles.fullWidth}
          />
          <Caption1>Value: {rangeStart}</Caption1>
        </Field>

        <Field label="Range Input (End)" className={styles.field}>
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
            className={styles.fullWidth}
          />
          <Caption1>Value: {rangeEnd}</Caption1>
        </Field>
      </div>

      <Field label="Progress Simulation">
        <div className={styles.verticalStackLoose}>
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
          className={styles.colorInputSize}
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
          className={styles.fullWidth}
        />
      </Field>

      {/* Product Selection List */}
      <Field label="Product Selection List">
        <div className={styles.summaryCard}>
          <div className={styles.verticalStackTight}>
            <Body1>Selected Products: {selectedProductIds.size} of {products.length}</Body1>
            <Caption1>
              Categories: {Array.from(new Set(
                products.filter(p => selectedProductIds.has(p.id)).map(p => p.category)
              )).join(', ') || 'None'}
            </Caption1>
          </div>
        </div>

        <div className={styles.horizontalFormRow}>
          <Field label="Product Name">
            <Input
              value={newProductName}
              onChange={(e, data) => setNewProductName(data.value)}
              placeholder="Enter product name..."
            />
          </Field>
          <Field label="Category">
            <select 
              value={newProductCategory} 
              onChange={(e) => setNewProductCategory(e.target.value as ProductCategory)}
              className={styles.formInput}
            >
              {Object.values(ProductCategory).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </Field>
          <Button 
            appearance="primary" 
            icon={<Add20Regular />}
            onClick={addNewProduct}
            disabled={!newProductName.trim()}
          >
            Add Product
          </Button>
        </div>

        <div className={styles.scrollableList}>
          {products.map(product => {
            const isSelected = selectedProductIds.has(product.id);
            const categoryInfo = productCategories[product.category];
            
            return (
              <div
                key={product.id}
                className={`${styles.listItem} ${isSelected ? styles.selectedItem : ''}`}
                onClick={() => toggleProductSelection(product.id)}
              >
                <Checkbox
                  checked={isSelected}
                  onChange={() => toggleProductSelection(product.id)}
                />
                <div 
                  className={styles.circularIcon}
                  style={{ backgroundColor: categoryInfo.color }}
                >
                  {categoryInfo.icon}
                </div>
                <div className={styles.flexOne}>
                  <Text>{product.name}</Text>
                  <Text>{product.category}</Text>
                </div>
                <Button
                  appearance="subtle"
                  icon={<Info20Regular />}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(product.bingSearchUrl, '_blank');
                    addMessage(`Learning more about ${product.name}`);
                  }}
                  size="small"
                  title={`Learn more about ${product.name}`}
                />
                <Button
                  appearance="subtle"
                  icon={<Delete20Regular />}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeProduct(product.id);
                  }}
                  size="small"
                />
              </div>
            );
          })}
        </div>
      </Field>

      <Card className={styles.messageAreaSpacing}>
        <CardHeader header={<Body1>Interaction Messages</Body1>} />
        <div className={styles.messageScrollArea}>
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
