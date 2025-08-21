import React, { useState, useId } from 'react';
import {
  Body1,
  Caption1,
  Title2,
  Title3,
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  CounterBadge,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Button,
  Spinner,
  Toast,
  ToastTitle,
  Toaster,
  useToastController,
  useId as useToastId,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  SearchBox,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableBody,
  TableCellLayout,
  Link,
  Text,
  Field,
} from '@fluentui/react-components';
import {
  HomeRegular,
  EditRegular,
  CopyRegular,
  DeleteRegular,
  TextBoldRegular,
  TextItalicRegular,
  TextUnderlineRegular,
  SearchRegular,
  MoreHorizontalRegular,
  CheckmarkRegular,
  ErrorCircleRegular,
  InfoRegular,
} from '@fluentui/react-icons';
import { sharedStyles } from '../../sharedStyles';
import { componentShowcaseStyles } from './componentShowcaseStyles';
import strings from './showcase.resx';

const ComponentShowcaseTab: React.FC = () => {
  const styles = { ...sharedStyles(), ...componentShowcaseStyles() };
  
  const [messages, setMessages] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [toolbarState, setToolbarState] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // Toast setup
  const toasterId = useToastId('toaster');
  const { dispatchToast } = useToastController(toasterId);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const showToast = (type: 'success' | 'error' | 'info') => {
    const toastContent = {
      success: { 
        title: strings.toastSuccess, 
        intent: 'success' as const,
        icon: <CheckmarkRegular />
      },
      error: { 
        title: strings.toastError, 
        intent: 'error' as const,
        icon: <ErrorCircleRegular />
      },
      info: { 
        title: strings.toastInfo, 
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
                    {strings.breadcrumbCategory}
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </Field>
          </div>

          <div className={styles.componentCard}>
            <Field label={strings.labelContextMenu}>
              <div className={styles.menuContainer}>
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <Button 
                      icon={<MoreHorizontalRegular />}
                      aria-label={strings.menuTrigger}
                      onClick={() => addMessage('Context menu opened')}
                    >
                      {strings.menuTrigger}
                    </Button>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem 
                        icon={<EditRegular />}
                        onClick={() => addMessage('Edit menu item selected')}
                      >
                        {strings.menuEdit}
                      </MenuItem>
                      <MenuItem 
                        icon={<CopyRegular />}
                        onClick={() => addMessage('Copy menu item selected')}
                      >
                        {strings.menuCopy}
                      </MenuItem>
                      <MenuItem 
                        icon={<DeleteRegular />}
                        onClick={() => addMessage('Delete menu item selected')}
                      >
                        {strings.menuDelete}
                      </MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              </div>
            </Field>
          </div>
        </div>
      </section>

      {/* Layout Components Section */}
      <section className={styles.layoutSection}>
        <Title3 className={styles.sectionHeader}>{strings.layouts}</Title3>
        
        <div className={styles.componentCard}>
          <Field label={strings.labelCardComponent}>
            <Card style={{ maxWidth: '400px' }}>
              <CardHeader
                image={
                  <Avatar
                    name={strings.avatarName}
                    badge={{
                      status: 'available' as const,
                      'aria-label': strings.statusActive
                    }}
                  />
                }
                header={<Body1><strong>{strings.cardTitle}</strong></Body1>}
                description={<Caption1>{strings.cardSubtitle}</Caption1>}
              />
              
              <CardPreview>
                <Text>{strings.cardDescription}</Text>
              </CardPreview>
              
              <CardFooter>
                <Button 
                  appearance="primary"
                  onClick={() => addMessage('Card action: Learn more clicked')}
                >
                  {strings.buttonLearnMore}
                </Button>
                <Button 
                  onClick={() => addMessage('Card action: Save clicked')}
                >
                  {strings.buttonSave}
                </Button>
              </CardFooter>
            </Card>
          </Field>
        </div>

        <div className={styles.componentCard}>
          <Field label={strings.labelAccordionComponent}>
            <div className={styles.accordionContainer}>
              <Accordion multiple collapsible>
                <AccordionItem value="requirements">
                  <AccordionHeader expandIconPosition="end">
                    {strings.accordionTitle1}
                  </AccordionHeader>
                  <AccordionPanel>
                    <Text>{strings.accordionContent1}</Text>
                  </AccordionPanel>
                </AccordionItem>
                
                <AccordionItem value="installation">
                  <AccordionHeader expandIconPosition="end">
                    {strings.accordionTitle2}
                  </AccordionHeader>
                  <AccordionPanel>
                    <Text>{strings.accordionContent2}</Text>
                  </AccordionPanel>
                </AccordionItem>
                
                <AccordionItem value="troubleshooting">
                  <AccordionHeader expandIconPosition="end">
                    {strings.accordionTitle3}
                  </AccordionHeader>
                  <AccordionPanel>
                    <Text>{strings.accordionContent3}</Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </Field>
        </div>
      </section>

      {/* Communication Components Section */}
      <section className={styles.communicationArea}>
        <Title3 className={styles.sectionHeader}>{strings.communication}</Title3>
        
        <div className={styles.componentCard}>
          <Field label={strings.labelBadgesStatus}>
            <div className={styles.badgeDemo}>
              <Badge appearance="filled" color="brand">{strings.badgeNew}</Badge>
              <Badge appearance="ghost" color="important">{strings.badgeImportant}</Badge>
              <CounterBadge count={5} aria-label={`${strings.badgeCount} notifications`} />
            </div>
            
            <div className={styles.avatarSection}>
              <Avatar
                name={strings.avatarName}
                badge={{
                  status: 'available' as const,
                  'aria-label': strings.statusActive
                }}
              />
              <Avatar
                name={strings.avatarAwayUser}
                badge={{
                  status: 'away' as const,
                  'aria-label': strings.statusAway
                }}
              />
              <Avatar
                name={strings.avatarBusyUser}
                badge={{
                  status: 'busy' as const,
                  'aria-label': strings.statusBusy
                }}
              />
              <Avatar
                name={strings.avatarOfflineUser}
                badge={{
                  status: 'offline' as const,
                  'aria-label': strings.statusOffline
                }}
              />
            </div>
          </Field>
        </div>
      </section>

      {/* Status & Indicators Section */}
      <section>
        <Title3 className={styles.sectionHeader}>{strings.indicators}</Title3>
        
        <div className={styles.statusIndicators}>
          <div className={styles.componentCard}>
            <Field label={strings.labelLoadingSpinner}>
              <div className={styles.spinnerDemo}>
                <Spinner size="tiny" aria-label={strings.spinnerLoading} />
                <Spinner size="extra-small" aria-label={strings.spinnerLoading} />
                <Spinner size="small" aria-label={strings.spinnerLoading} />
                <Spinner size="medium" aria-label={strings.spinnerLoading} />
                <Text>{strings.spinnerLoading}</Text>
              </div>
            </Field>
          </div>

          <div className={styles.componentCard}>
            <Field label={strings.labelToastNotifications}>
              <div className={styles.toastDemo}>
                <Button 
                  appearance="primary" 
                  icon={<CheckmarkRegular />}
                  onClick={() => showToast('success')}
                >
                  {strings.buttonSuccess}
                </Button>
                <Button 
                  appearance="secondary" 
                  icon={<ErrorCircleRegular />}
                  onClick={() => showToast('error')}
                >
                  {strings.buttonError}
                </Button>
                <Button 
                  appearance="outline" 
                  icon={<InfoRegular />}
                  onClick={() => showToast('info')}
                >
                  {strings.buttonInfo}
                </Button>
              </div>
            </Field>
          </div>
        </div>
      </section>

      {/* Interactive Components Section */}
      <section className={styles.interactiveSection}>
        <Title3 className={styles.sectionHeader}>{strings.actions}</Title3>
        
        <div className={styles.componentCard}>
          <Field label={strings.labelToolbar}>
            <div className={styles.toolbarContainer}>
              <Toolbar aria-label="Formatting toolbar">
                <ToolbarButton
                  aria-label={strings.toolbarBold}
                  icon={<TextBoldRegular />}
                  appearance={toolbarState.bold ? 'primary' : 'subtle'}
                  onClick={() => {
                    setToolbarState(prev => ({ ...prev, bold: !prev.bold }));
                    addMessage(`Bold ${toolbarState.bold ? 'disabled' : 'enabled'}`);
                  }}
                />
                <ToolbarButton
                  aria-label={strings.toolbarItalic}
                  icon={<TextItalicRegular />}
                  appearance={toolbarState.italic ? 'primary' : 'subtle'}
                  onClick={() => {
                    setToolbarState(prev => ({ ...prev, italic: !prev.italic }));
                    addMessage(`Italic ${toolbarState.italic ? 'disabled' : 'enabled'}`);
                  }}
                />
                <ToolbarButton
                  aria-label={strings.toolbarUnderline}
                  icon={<TextUnderlineRegular />}
                  appearance={toolbarState.underline ? 'primary' : 'subtle'}
                  onClick={() => {
                    setToolbarState(prev => ({ ...prev, underline: !prev.underline }));
                    addMessage(`Underline ${toolbarState.underline ? 'disabled' : 'enabled'}`);
                  }}
                />
                <ToolbarDivider />
                <ToolbarButton
                  icon={<SearchRegular />}
                  onClick={() => addMessage('Search tool activated')}
                >
                  {strings.buttonSearch}
                </ToolbarButton>
              </Toolbar>
            </div>
          </Field>
        </div>

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
