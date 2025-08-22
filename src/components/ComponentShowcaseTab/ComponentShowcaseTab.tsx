import React, { useState, useId, useEffect } from 'react';
import {
  Text,
  Title2,
  Title3,
  Field,
  Button,
  SearchBox,
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Link,
  Badge,
  Avatar,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableBody,
  TableCellLayout,
  ProgressBar,
  Skeleton,
  SkeletonItem,
  SpinButton,
  Toast,
  ToastTitle,
  Toaster,
  useToastController,
  Caption1,
  tokens
} from '@fluentui/react-components';
import {
  HomeRegular,
  MoreHorizontalRegular,
  EditRegular,
  CopyRegular,
  DeleteRegular,
  InfoRegular,
  CheckmarkCircleRegular,
  WarningRegular,
  ErrorCircleRegular,
  DismissCircleRegular
} from '@fluentui/react-icons';
import { formCache, CACHE_KEYS } from '../../utils/formCache';
import { formatString } from '../../formatString';
import strings from './showcase.resx';
import { componentShowcaseStyles, componentProps } from './componentShowcaseStyles';
import { badge, statusColor, size } from '../../styles/componentConstants';

// Define the form data interface
interface ComponentShowcaseFormData {
  searchValue: string;
  toastCount: number;
  messages: string[];
  tableSelection: string[];
}

const ComponentShowcaseTab: React.FC = () => {
  const toasterId = useId();
  const { dispatchToast } = useToastController(toasterId);

  // Load initial form data from cache
  const cached = formCache.get<ComponentShowcaseFormData>(CACHE_KEYS.COMPONENT_SHOWCASE);
  const initialData: ComponentShowcaseFormData = cached || {
    searchValue: '',
    toastCount: 0,
    messages: [],
    tableSelection: [],
  };

  // State management
  const [searchValue, setSearchValue] = useState(initialData.searchValue);
  const [toastCount, setToastCount] = useState(initialData.toastCount);
  const [messages, setMessages] = useState<string[]>(initialData.messages);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [progressValue, setProgressValue] = useState(0);
  const [isProgressRunning, setIsProgressRunning] = useState(false);

  // Simulate loading completion after 3 seconds
  useEffect(() => {
    if (isSkeletonLoading) {
      const timer = setTimeout(() => {
        setIsSkeletonLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSkeletonLoading]);

  // Save form data whenever state changes
  useEffect(() => {
    const formData = {
      searchValue,
      toastCount,
      messages,
      tableSelection: [],
    };
    formCache.set(CACHE_KEYS.COMPONENT_SHOWCASE, formData);
  }, [searchValue, toastCount, messages]);

  // Get styles
  const styles = componentShowcaseStyles();

  // Helper function to add messages
  const addMessage = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages(prev => [...prev, `${timestamp}: ${message}`]);
  };

  // Toast handlers
  const showToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const newCount = toastCount + 1;
    setToastCount(newCount);

    const toastContent = {
      success: { 
        title: `${strings.toastSuccess} #${newCount}`, 
        intent: 'success' as const,
        icon: <CheckmarkCircleRegular />
      },
      error: { 
        title: `${strings.toastError} #${newCount}`, 
        intent: 'error' as const,
        icon: <ErrorCircleRegular />
      },
      warning: { 
        title: `${strings.toastWarning} #${newCount}`, 
        intent: 'warning' as const,
        icon: <WarningRegular />
      },
      info: { 
        title: `${strings.toastInfo} #${newCount}`, 
        intent: 'info' as const,
        icon: <InfoRegular />
      }
    };

    const content = toastContent[type];
    dispatchToast(
      <Toast>
        <ToastTitle media={content.icon}>{content.title}</ToastTitle>
      </Toast>,
      { intent: content.intent }
    );
    
    addMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} toast shown (#${newCount})`);
  };

  // Progress bar demo function
  const startProgressDemo = () => {
    if (isProgressRunning) return;
    
    setProgressValue(0);
    setIsProgressRunning(true);
    addMessage('Progress demo started');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.05; // Increase by 5% each step
      setProgressValue(progress);
      
      if (progress >= 1) {
        clearInterval(interval);
        setIsProgressRunning(false);
        addMessage('Progress demo completed');
      }
    }, 200); // Update every 200ms for smooth animation
  };

  // Sample data for components
  const tableData = [
    { id: 1, name: 'John Smith', role: 'Software Engineer', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', role: 'Product Manager', department: 'Product', status: 'Active' },
    { id: 3, name: 'Mike Wilson', role: 'Designer', department: 'Design', status: 'Away' },
    { id: 4, name: 'Lisa Chen', role: 'Data Scientist', department: 'Engineering', status: 'Busy' },
    { id: 5, name: 'David Brown', role: 'Marketing Manager', department: 'Marketing', status: 'Active' },
  ];

  const searchResults = tableData.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.role.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.department.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={styles.responsiveWrapper}>
      <div className={styles.container}>
        <Toaster toasterId={toasterId} />
        
        <Title2 className={styles.sectionHeader}>{strings.title}</Title2>

      {/* Navigation Components Section */}
      <section className={styles.navigationSection}>
        <Title3 className={styles.sectionHeader}>{strings.navigation}</Title3>
        
        <div className={styles.componentGrid}>
          <div className={styles.componentCard}>
            <Field label={strings.labelBreadcrumbNavigation}>
              <div className={styles.breadcrumbContainer}>
                <Breadcrumb aria-label={strings.ariaBreadcrumbNavigation}>
                  <BreadcrumbItem>
                    <Link href="#" onClick={(e) => { e.preventDefault(); addMessage('Breadcrumb: Home clicked'); }}>
                      <HomeRegular style={{ marginRight: tokens.spacingHorizontalXS }} />
                      {strings.breadcrumbHome}
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbDivider />
                  <BreadcrumbItem>
                    <Link href="#" onClick={(e) => { e.preventDefault(); addMessage('Breadcrumb: Products clicked'); }}>
                      {strings.breadcrumbProducts}
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbDivider />
                  <BreadcrumbItem>
                    <Link href="#" onClick={(e) => { e.preventDefault(); addMessage('Breadcrumb: Category clicked'); }}>
                      {strings.breadcrumbCategory}
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbDivider />
                  <BreadcrumbItem aria-current="page">
                    <Text weight={componentProps.text.semibold} style={{ color: tokens.colorNeutralForeground1 }}>
                      {strings.breadcrumbCurrent}
                    </Text>
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </Field>
          </div>

          <div className={styles.componentCard}>
            <Field label={strings.labelMenuNavigation}>
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Button
                    appearance={componentProps.button.outline}
                    icon={<MoreHorizontalRegular />}
                    onClick={() => addMessage('Menu opened')}
                  >
                    {strings.menuTrigger}
                  </Button>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem onClick={() => addMessage('Menu: Edit selected')}>
                      <EditRegular style={{ marginRight: tokens.spacingHorizontalS }} />
                      {strings.menuEdit}
                    </MenuItem>
                    <MenuItem onClick={() => addMessage('Menu: Copy selected')}>
                      <CopyRegular style={{ marginRight: tokens.spacingHorizontalS }} />
                      {strings.menuCopy}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => addMessage('Menu: Delete selected')}>
                      <DeleteRegular style={{ marginRight: tokens.spacingHorizontalS }} />
                      {strings.menuDelete}
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </Field>
          </div>
        </div>
      </section>

      {/* Layout Components Section */}
      <section className={styles.layoutSection}>
        <Title3 className={styles.sectionHeader}>{strings.layouts}</Title3>
        
        <div className={styles.componentGrid}>
          <div className={styles.componentCard}>
            <Field label={strings.labelCard}>
              <Card className={styles.componentCard}>
                <CardHeader
                  image={<Avatar name="Product" size={componentProps.size.size40} />}
                  header={<Text weight={componentProps.text.semibold}>{strings.cardTitle}</Text>}
                />
                <CardPreview>
                  <div>
                    <Text>{strings.cardDescription}</Text>
                  </div>
                </CardPreview>
                <CardFooter>
                  <Button 
                    appearance={componentProps.button.primary} 
                    onClick={() => addMessage('Card: Learn more clicked')}
                  >
                    {strings.cardLearnMore}
                  </Button>
                  <Button 
                    appearance={componentProps.button.subtle}
                    onClick={() => addMessage('Card: Contact clicked')}
                  >
                    {strings.cardContact}
                  </Button>
                </CardFooter>
              </Card>
            </Field>
          </div>

          <div className={styles.componentCard}>
            <Field label={strings.labelAccordion}>
              <Accordion collapsible>
                <AccordionItem value="requirements">
                  <AccordionHeader>{strings.accordionTitle1}</AccordionHeader>
                  <AccordionPanel>
                    <Text>{strings.accordionContent1}</Text>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="installation">
                  <AccordionHeader>{strings.accordionTitle2}</AccordionHeader>
                  <AccordionPanel>
                    <Text>{strings.accordionContent2}</Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Field>
          </div>
        </div>
      </section>

      {/* Interactive Components Section */}
      <section className={styles.interactiveSection}>
        <Title3 className={styles.sectionHeader}>{strings.interactive}</Title3>
        
        <div className={styles.componentGrid}>
          <div className={styles.componentCard}>
            <Field label={strings.labelToastNotifications}>
              <div className={styles.horizontalGroup}>
                <Button 
                  appearance={componentProps.button.primary} 
                  onClick={() => showToast('success')}
                >
                  {strings.buttonSuccess}
                </Button>
                <Button 
                  appearance={componentProps.button.primary} 
                  onClick={() => showToast('error')}
                >
                  {strings.buttonError}
                </Button>
                <Button 
                  appearance={componentProps.button.primary} 
                  onClick={() => showToast('warning')}
                >
                  {strings.buttonWarning}
                </Button>
                <Button 
                  appearance={componentProps.button.primary} 
                  onClick={() => showToast('info')}
                >
                  {strings.buttonInfo}
                </Button>
              </div>
            </Field>
          </div>

          <div className={styles.componentCard}>
            <Field label={strings.labelProgress}>
              <div className={styles.verticalGroup}>
                <ProgressBar value={progressValue} />
                <Text>{formatString(strings.progressLabel, Math.round(progressValue * 100).toString())}</Text>
                <Button
                  appearance={componentProps.button.secondary}
                  size={componentProps.size.small}
                  onClick={startProgressDemo}
                  disabled={isProgressRunning}
                  style={{ marginTop: tokens.spacingVerticalS }}
                >
                  {isProgressRunning ? strings.progressButtonRunning : strings.progressButtonStart}
                </Button>
              </div>
            </Field>
          </div>
        </div>
      </section>

      {/* Loading States Section */}
      <section>
        <Title3 className={styles.sectionHeader}>{strings.loadingStates}</Title3>
        
        <div className={styles.componentCard}>
          <Field label={strings.labelSkeleton}>
            <div className={styles.skeletonContainer}>
              {isSkeletonLoading ? (
                <Skeleton>
                  <div className={styles.skeletonProfile}>
                    <SkeletonItem shape={componentProps.skeleton.circle} size={componentProps.size.size48} />
                    <div className={styles.skeletonText}>
                      <SkeletonItem shape={componentProps.skeleton.rectangle} size={componentProps.size.size16} style={{ width: 'min(200px, 80%)', height: '16px', marginBottom: tokens.spacingVerticalS }} />
                      <SkeletonItem shape={componentProps.skeleton.rectangle} size={componentProps.size.size12} style={{ width: 'min(150px, 60%)', height: '12px' }} />
                    </div>
                  </div>
                </Skeleton>
              ) : (
                <div className={styles.skeletonProfile}>
                  <Avatar
                    name="Sarah Chen"
                    size={componentProps.size.size48}
                    color={componentProps.avatar.colorful}
                    style={{ marginRight: tokens.spacingHorizontalM }}
                  />
                  <div className={styles.skeletonText}>
                    <Text weight={componentProps.text.semibold} size={componentProps.text.size400}>Sarah Chen</Text>
                    <Caption1>Senior Software Engineer • Microsoft</Caption1>
                  </div>
                </div>
              )}
            </div>
            <Button
              appearance={componentProps.button.secondary}
              size={componentProps.size.small}
              onClick={() => setIsSkeletonLoading(true)}
              style={{ marginTop: tokens.spacingVerticalM }}
            >
              {isSkeletonLoading ? 'Loading...' : 'Show Loading Demo'}
            </Button>
          </Field>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section>
        <Title3 className={styles.sectionHeader}>{strings.searchFilter}</Title3>
        
        <div className={styles.componentCard}>
          <Field label={strings.labelSearch}>
            <div className={styles.searchArea}>
              <SearchBox
                placeholder={strings.searchPlaceholder}
                value={searchValue}
                onChange={(e, data) => {
                  setSearchValue(data.value);
                  addMessage(`Search query: "${data.value}"`);
                }}
                dismiss={{
                  onClick: () => {
                    setSearchValue('');
                    addMessage('Search cleared');
                  }
                }}
              />
              {searchValue && (
                <div className={styles.searchResults}>
                  <Text>{`Found ${searchResults.length} results for "${searchValue}"`}</Text>
                </div>
              )}
            </div>
          </Field>
        </div>
      </section>

      {/* Data & Visualization Section */}
      <section className={styles.dataSection}>
        <Title3 className={styles.sectionHeader}>{strings.dataVisualization}</Title3>
        
        <div className={styles.componentCard}>
          <Field label={strings.labelDataTable}>
            <div className={styles.tableContainer}>
              <div className={styles.tableWrapper}>
                <Table aria-label={strings.ariaEmployeeTable} role="table">
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>{strings.tableHeader1}</TableHeaderCell>
                      <TableHeaderCell>{strings.tableHeader2}</TableHeaderCell>
                      <TableHeaderCell>{strings.tableHeader3}</TableHeaderCell>
                      <TableHeaderCell>{strings.tableHeader4}</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(searchValue ? searchResults : tableData).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <TableCellLayout media={
                            <Avatar name={item.name} size={size.size32} />
                          }>
                            {item.name}
                          </TableCellLayout>
                        </TableCell>
                        <TableCell>{item.role}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>
                          <Badge 
                            appearance={badge.ghost}
                            color={
                              item.status === 'Active' ? statusColor.success :
                              item.status === 'Away' ? statusColor.warning :
                              item.status === 'Busy' ? statusColor.danger : statusColor.subtle
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {searchValue && searchResults.length === 0 && (
                  <div style={{ padding: tokens.spacingVerticalL, textAlign: 'center' }}>
                    <Text>{strings.noResults}</Text>
                  </div>
                )}
              </div>
            </div>
          </Field>
        </div>
      </section>

      {/* Message Log */}
      {messages.length > 0 && (
        <section>
          <Title3 className={styles.sectionHeader}>{strings.activityLog}</Title3>
          <div className={styles.messageLog}>
            {messages.slice(-10).map((message, index) => (
              <Caption1 key={index} className={styles.messageItem}>
                {message}
              </Caption1>
            ))}
          </div>
        </section>
      )}
      </div>
    </div>
  );
};

export default ComponentShowcaseTab;
