import React, { useState, useId, useEffect } from 'react';
import {
  Text,
  Title3,
  Body1,
  Field,
  Button,
  SearchBox,
  Card,
  CardHeader,
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
  Toast,
  ToastTitle,
  Toaster,
  useToastController,
  Caption1,
  tokens,
} from '@fluentui/react-components';
import {
  HomeRegular,
  MoreHorizontalRegular,
  EditRegular,
  CopyRegular,
  DeleteRegular,
} from '@fluentui/react-icons';
import { formCache, CACHE_KEYS } from '../../utils/formCache';
import strings from './showcase.resx';
import { componentShowcaseStyles } from './componentShowcaseStyles';
import { sharedStyles } from '../../sharedStyles';

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

  // Update form cache when state changes
  useEffect(() => {
    const formData: ComponentShowcaseFormData = {
      searchValue,
      toastCount,
      messages,
      tableSelection: [],
    };
    formCache.set(CACHE_KEYS.COMPONENT_SHOWCASE, formData);
  }, [searchValue, toastCount, messages]);

  // Get styles
  const styles = {
    ...sharedStyles(),
    ...componentShowcaseStyles(),
  };

  // Helper function to add messages
  const addMessage = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages(prev => [...prev, `${timestamp}: ${message}`]);
  };

  // Sample data for components
  const sampleTableData = [
    { id: '1', name: 'John Doe', role: 'Developer', department: 'Engineering', status: 'Active' },
    { id: '2', name: 'Jane Smith', role: 'Designer', department: 'Design', status: 'Active' },
    { id: '3', name: 'Bob Johnson', role: 'Manager', department: 'Engineering', status: 'Inactive' },
    { id: '4', name: 'Alice Brown', role: 'Developer', department: 'Engineering', status: 'Active' },
  ];

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    addMessage(`Search: "${value}"`);
  };

  const handleProgressStart = () => {
    setIsProgressRunning(true);
    setProgressValue(0);
    
    const interval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 100) {
          setIsProgressRunning(false);
          clearInterval(interval);
          addMessage('Progress completed');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const showToast = (type: 'success' | 'warning' | 'error' | 'info') => {
    const toastContent = {
      success: { title: strings.toastSuccess, intent: 'success' as const },
      warning: { title: strings.toastWarning, intent: 'warning' as const },
      error: { title: strings.toastError, intent: 'error' as const },
      info: { title: strings.toastInfo, intent: 'info' as const },
    };

    setToastCount(prev => prev + 1);
    dispatchToast(
      <Toast>
        <ToastTitle>{toastContent[type].title}</ToastTitle>
      </Toast>,
      { intent: toastContent[type].intent }
    );
    addMessage(`Toast shown: ${type}`);
  };

  // Filter table data based on search
  const filteredTableData = sampleTableData.filter(item => 
    item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.role.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.department.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={styles.tabContentStandardized}>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <Body1 as="h2">{strings.title}</Body1>
          <Caption1>{strings.description}</Caption1>
        </div>

        <Toaster toasterId={toasterId} />

        {/* Navigation Components Section */}
        <section>
          <Title3 className={styles.sectionHeader}>{strings.navigation}</Title3>
          
          <Field label={strings.labelBreadcrumbNavigation}>
            <Breadcrumb aria-label={strings.ariaBreadcrumbNavigation}>
              <BreadcrumbItem>
                <Link href="#" onClick={(e) => { e.preventDefault(); addMessage('Breadcrumb: Home clicked'); }}>
                  <HomeRegular />
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
              <BreadcrumbItem>{strings.breadcrumbCurrent}</BreadcrumbItem>
            </Breadcrumb>
          </Field>

          <Field label={strings.labelMenu}>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button icon={<MoreHorizontalRegular />}>{strings.buttonActions}</Button>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem 
                    icon={<EditRegular />} 
                    onClick={() => addMessage('Menu: Edit clicked')}
                  >
                    {strings.menuEdit}
                  </MenuItem>
                  <MenuItem 
                    icon={<CopyRegular />} 
                    onClick={() => addMessage('Menu: Copy clicked')}
                  >
                    {strings.menuCopy}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem 
                    icon={<DeleteRegular />} 
                    onClick={() => addMessage('Menu: Delete clicked')}
                  >
                    {strings.menuDelete}
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </Field>
        </section>

        {/* Layout Components Section */}
        <section>
          <Title3 className={styles.sectionHeader}>{strings.layouts}</Title3>
          
          <Field label={strings.labelCard}>
            <Card>
              <CardHeader
                header={<Text weight="semibold">{strings.cardTitle}</Text>}
                description={<Caption1>{strings.cardDescription}</Caption1>}
                action={
                  <Button 
                    appearance="subtle" 
                    onClick={() => addMessage('Card: Action clicked')}
                  >
                    {strings.buttonAction}
                  </Button>
                }
              />
            </Card>
          </Field>

          <Field label={strings.labelAccordion}>
            <Accordion>
              <AccordionItem value="1">
                <AccordionHeader>{strings.accordionTitle1}</AccordionHeader>
                <AccordionPanel>{strings.accordionContent1}</AccordionPanel>
              </AccordionItem>
              <AccordionItem value="2">
                <AccordionHeader>{strings.accordionTitle2}</AccordionHeader>
                <AccordionPanel>{strings.accordionContent2}</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Field>
        </section>

        {/* Interactive Components Section */}
        <section>
          <Title3 className={styles.sectionHeader}>{strings.interactive}</Title3>
          
          <Field label={strings.labelToasts}>
            <div style={{ display: 'flex', gap: tokens.spacingHorizontalS, flexWrap: 'wrap' }}>
              <Button appearance="primary" onClick={() => showToast('success')}>
                {strings.buttonSuccess}
              </Button>
              <Button onClick={() => showToast('warning')}>
                {strings.buttonWarning}
              </Button>
              <Button onClick={() => showToast('error')}>
                {strings.buttonError}
              </Button>
              <Button onClick={() => showToast('info')}>
                {strings.buttonInfo}
              </Button>
            </div>
          </Field>

          <Field label={strings.labelBadges}>
            <div style={{ display: 'flex', gap: tokens.spacingHorizontalS, alignItems: 'center', flexWrap: 'wrap' }}>
              <Badge appearance="filled" color="brand">{strings.badgePrimary}</Badge>
              <Badge appearance="filled" color="success">{strings.badgeSuccess}</Badge>
              <Badge appearance="filled" color="warning">{strings.badgeWarning}</Badge>
              <Badge appearance="filled" color="danger">{strings.badgeError}</Badge>
              <Badge appearance="outline">{strings.badgeOutline}</Badge>
            </div>
          </Field>
        </section>

        {/* Loading States Section */}
        <section>
          <Title3 className={styles.sectionHeader}>{strings.loadingStates}</Title3>
          
          <Field label={strings.labelSkeleton}>
            <div>
              {isSkeletonLoading ? (
                <Skeleton>
                  <SkeletonItem />
                  <SkeletonItem />
                  <SkeletonItem />
                </Skeleton>
              ) : (
                <div>
                  <Text>{strings.skeletonContent}</Text>
                  <Button 
                    onClick={() => setIsSkeletonLoading(true)}
                    style={{ marginLeft: tokens.spacingHorizontalS }}
                  >
                    {strings.buttonReloadSkeleton}
                  </Button>
                </div>
              )}
            </div>
          </Field>

          <Field label={strings.labelProgress}>
            <div>
              <ProgressBar 
                value={progressValue} 
                max={100} 
                color={progressValue === 100 ? "success" : "brand"}
              />
              <div style={{ marginTop: tokens.spacingVerticalS }}>
                <Button 
                  onClick={handleProgressStart} 
                  disabled={isProgressRunning}
                >
                  {isProgressRunning ? strings.buttonRunning : strings.buttonStartProgress}
                </Button>
                <Text style={{ marginLeft: tokens.spacingHorizontalS }}>
                  {progressValue}%
                </Text>
              </div>
            </div>
          </Field>
        </section>

        {/* Search & Filter Section */}
        <section>
          <Title3 className={styles.sectionHeader}>{strings.searchFilter}</Title3>
          
          <Field label={strings.labelSearch}>
            <SearchBox 
              placeholder={strings.placeholderSearch}
              value={searchValue}
              onChange={(_, data) => handleSearchChange(data.value)}
            />
          </Field>
        </section>

        {/* Data Visualization Section */}
        <section>
          <Title3 className={styles.sectionHeader}>{strings.dataVisualization}</Title3>
          
          <Field label={strings.labelDataTable}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>{strings.columnName}</TableHeaderCell>
                  <TableHeaderCell>{strings.columnRole}</TableHeaderCell>
                  <TableHeaderCell>{strings.columnDepartment}</TableHeaderCell>
                  <TableHeaderCell>{strings.columnStatus}</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTableData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <TableCellLayout media={<Avatar name={item.name} />}>
                        {item.name}
                      </TableCellLayout>
                    </TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>
                      <Badge 
                        appearance="filled" 
                        color={item.status === 'Active' ? 'success' : 'warning'}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Field>
        </section>

        {/* Message Log Section */}
        {messages.length > 0 && (
          <section>
            <Title3 className={styles.sectionHeader}>{strings.messageLog}</Title3>
            
            <div className={styles.messageLog}>
              {messages.slice(-10).map((message, index) => (
                <Text key={index} size={200} style={{ display: 'block', marginBottom: tokens.spacingVerticalXS }}>
                  {message}
                </Text>
              ))}
            </div>
            
            <Button 
              appearance="subtle" 
              onClick={() => setMessages([])}
              style={{ marginTop: tokens.spacingVerticalS }}
            >
              {strings.buttonClearLog}
            </Button>
          </section>
        )}
      </div>
    </div>
  );
};

export default ComponentShowcaseTab;
