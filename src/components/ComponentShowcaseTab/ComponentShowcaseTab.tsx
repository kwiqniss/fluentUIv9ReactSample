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
  Caption1
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
import { componentShowcaseStyles } from './componentShowcaseStyles';

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
                      <HomeRegular style={{ marginRight: '4px' }} />
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
                </Breadcrumb>
              </div>
            </Field>
          </div>

          <div className={styles.componentCard}>
            <Field label={strings.labelMenuNavigation}>
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Button
                    appearance="outline"
                    icon={<MoreHorizontalRegular />}
                    onClick={() => addMessage('Menu opened')}
                  >
                    {strings.menuTrigger}
                  </Button>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem onClick={() => addMessage('Menu: Edit selected')}>
                      <EditRegular style={{ marginRight: '8px' }} />
                      {strings.menuEdit}
                    </MenuItem>
                    <MenuItem onClick={() => addMessage('Menu: Copy selected')}>
                      <CopyRegular style={{ marginRight: '8px' }} />
                      {strings.menuCopy}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => addMessage('Menu: Delete selected')}>
                      <DeleteRegular style={{ marginRight: '8px' }} />
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
                  image={<Avatar name="Product" size={40} />}
                  header={<Text weight="semibold">{strings.cardTitle}</Text>}
                />
                <CardPreview>
                  <div>
                    <Text>{strings.cardDescription}</Text>
                  </div>
                </CardPreview>
                <CardFooter>
                  <Button 
                    appearance="primary" 
                    onClick={() => addMessage('Card: Learn more clicked')}
                  >
                    {strings.cardLearnMore}
                  </Button>
                  <Button 
                    appearance="subtle"
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
                  appearance="primary" 
                  onClick={() => showToast('success')}
                >
                  {strings.buttonSuccess}
                </Button>
                <Button 
                  appearance="primary" 
                  onClick={() => showToast('error')}
                >
                  {strings.buttonError}
                </Button>
                <Button 
                  appearance="primary" 
                  onClick={() => showToast('warning')}
                >
                  {strings.buttonWarning}
                </Button>
                <Button 
                  appearance="primary" 
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
                <ProgressBar value={0.75} />
                <Text>{formatString(strings.progressLabel, '75')}</Text>
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
            <div>
              <Skeleton>
                <div>
                  <SkeletonItem shape="circle" size={48} />
                  <div>
                    <SkeletonItem shape="rectangle" size={16} />
                    <SkeletonItem shape="rectangle" size={12} />
                  </div>
                </div>
              </Skeleton>
            </div>
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
                            <Avatar name={item.name} size={32} />
                          }>
                            {item.name}
                          </TableCellLayout>
                        </TableCell>
                        <TableCell>{item.role}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>
                          <Badge 
                            appearance="ghost"
                            color={
                              item.status === 'Active' ? 'success' :
                              item.status === 'Away' ? 'warning' :
                              item.status === 'Busy' ? 'danger' : 'subtle'
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
                  <div style={{ padding: '16px', textAlign: 'center' }}>
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
  );
};

export default ComponentShowcaseTab;
