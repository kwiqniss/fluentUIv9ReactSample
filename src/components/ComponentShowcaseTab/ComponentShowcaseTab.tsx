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
  Toast,
  ToastTitle,
  Toaster,
  useToastController,
  Caption1,
  mergeClasses,
  Tooltip
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
  ErrorCircleRegular
} from '@fluentui/react-icons';
import { useLocalStorage } from '../../hooks';
import { useMessages } from '../../utils/messageContext';
import { MessageType } from '../../types/enums';
import { formatString } from '../../formatString';
import strings from './ComponentShowcaseTab.resx';
import { componentShowcaseStyles, componentProps } from './ComponentShowcaseTab.styles';
import { sharedStyles } from '../../SharedStyles.styles';
import { sharedLayoutStyles } from '../sharedLayout.styles';
import { badge, statusColor, size } from '../componentConstants';

interface ComponentShowcaseFormData {
  searchValue: string;
  toastCount: number;
  tableSelection: string[];
}

const ComponentShowcaseTab: React.FC = () => {
  const { addMessage } = useMessages();
  const toasterId = useId();
  const { dispatchToast } = useToastController(toasterId);

  const [formData, setFormData] = useLocalStorage<ComponentShowcaseFormData>('component-showcase-form', {
    searchValue: '',
    toastCount: 0,
    tableSelection: [],
  });

  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [isCardLoading, setIsCardLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [isProgressRunning, setIsProgressRunning] = useState(false);

  const updateField = (field: keyof ComponentShowcaseFormData) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (isSkeletonLoading) {
      const timer = setTimeout(() => {
        setIsSkeletonLoading(false);
        addMessage('Skeleton loading demo completed', MessageType.Success);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSkeletonLoading]);

  useEffect(() => {
    if (isCardLoading) {
      const timer = setTimeout(() => {
        setIsCardLoading(false);
        addMessage('Card loading demo completed', MessageType.Success);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isCardLoading]);

  const styles = {
    ...sharedStyles(),
    ...sharedLayoutStyles(),
    ...componentShowcaseStyles(),
  };

  const showToast = (type: MessageType) => {
    const newCount = formData.toastCount + 1;
    updateField('toastCount')(newCount);

    const toastContent = {
      [MessageType.Success]: { 
        title: `${strings.toastSuccess} #${newCount}`, 
        intent: 'success' as const,
        icon: <CheckmarkCircleRegular />
      },
      [MessageType.Error]: { 
        title: `${strings.toastError} #${newCount}`, 
        intent: 'error' as const,
        icon: <ErrorCircleRegular />
      },
      [MessageType.Warning]: { 
        title: `${strings.toastWarning} #${newCount}`, 
        intent: 'warning' as const,
        icon: <WarningRegular />
      },
      [MessageType.Info]: { 
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

  const startProgressDemo = () => {
    if (isProgressRunning) return;
    
    setProgressValue(0);
    setIsProgressRunning(true);
    addMessage('Progress demo started');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.05;
      setProgressValue(progress);
      
      if (progress >= 1) {
        clearInterval(interval);
        setIsProgressRunning(false);
        addMessage('Progress demo completed');
      }
    }, 200);
  };

  const tableData = [
    { id: 1, name: 'John Smith', role: 'Software Engineer', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', role: 'Product Manager', department: 'Product', status: 'Active' },
    { id: 3, name: 'Mike Wilson', role: 'Designer', department: 'Design', status: 'Away' },
    { id: 4, name: 'Lisa Chen', role: 'Data Scientist', department: 'Engineering', status: 'Busy' },
    { id: 5, name: 'David Brown', role: 'Marketing Manager', department: 'Marketing', status: 'Active' },
  ];

  const searchResults = tableData.filter(item =>
    item.name.toLowerCase().includes(formData.searchValue.toLowerCase()) ||
    item.role.toLowerCase().includes(formData.searchValue.toLowerCase()) ||
    item.department.toLowerCase().includes(formData.searchValue.toLowerCase())
  );

  return (
    <div className={styles.tabContainer}>
      <Toaster toasterId={toasterId} />
      
      <div className={styles.headerSection}>
        <Title3>{strings.title}</Title3>
        <Caption1>Comprehensive showcase of FluentUI v9 components and their interactions.</Caption1>
      </div>

      {/* Navigation Components Section */}
      <section className={styles.section}>
        <Title3 className={mergeClasses(styles.sectionHeader, styles.h3Heading)} as="h3">{strings.navigation}</Title3>
        
        <div className={styles.componentGrid}>
          <div className={styles.componentItem}>
            <Field label={strings.labelBreadcrumbNavigation}>
              <Breadcrumb aria-label={strings.ariaBreadcrumbNavigation}>
                <BreadcrumbItem>
                  <Link href="#" onClick={(e) => { e.preventDefault(); addMessage('Breadcrumb: Home clicked'); }}>
                    <Tooltip content="Home" relationship="label">
                      <HomeRegular />
                    </Tooltip>
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
                  <Text weight={componentProps.text.semibold}>
                    {strings.breadcrumbCurrent}
                  </Text>
                </BreadcrumbItem>
              </Breadcrumb>
            </Field>
          </div>

          <div className={styles.componentItem}>
            <Field label={strings.labelMenuNavigation}>
              <Menu>
                <MenuTrigger>
                  <Button
                    appearance={componentProps.button.outline}
                    icon={
                      <Tooltip content="More options" relationship="label">
                        <MoreHorizontalRegular />
                      </Tooltip>
                    }
                    onClick={() => addMessage('Menu opened')}
                  >
                    {strings.menuTrigger}
                  </Button>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem onClick={() => addMessage('Menu: Edit selected')}>
                      <Tooltip content="Edit item" relationship="label">
                        <EditRegular />
                      </Tooltip>
                      {strings.menuEdit}
                    </MenuItem>
                    <MenuItem onClick={() => addMessage('Menu: Copy selected')}>
                      <Tooltip content="Copy item" relationship="label">
                        <CopyRegular />
                      </Tooltip>
                      {strings.menuCopy}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => addMessage('Menu: Delete selected')}>
                      <Tooltip content="Delete item" relationship="label">
                        <DeleteRegular />
                      </Tooltip>
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
      <section>
        <Title3 className={mergeClasses(styles.sectionHeader, styles.h3Heading)} as="h3">{strings.layouts}</Title3>
        
        <div className={styles.componentGrid}>
          <div className={styles.componentItem}>
            <Field label={strings.labelCard}>
              <div className={styles.stableContainer}>
                <Card>
                  {isCardLoading ? (
                    <>
                      <div className={styles.skeletonCardHeader}>
                        <SkeletonItem shape={componentProps.skeleton.circle} size={componentProps.size.size40} />
                        <div className={styles.skeletonCardHeaderContent}>
                          <SkeletonItem shape={componentProps.skeleton.rectangle} size={componentProps.size.size16} className={styles.skeletonCardHeaderName} />
                          <SkeletonItem shape={componentProps.skeleton.rectangle} size={componentProps.size.size12} className={styles.skeletonCardHeaderTitle} />
                        </div>
                      </div>
                      <div className={styles.skeletonCardBody}>
                        <SkeletonItem shape={componentProps.skeleton.rectangle} size={componentProps.size.size16} className={styles.skeletonCardBodyFull} />
                        <SkeletonItem shape={componentProps.skeleton.rectangle} size={componentProps.size.size16} className={styles.skeletonCardBodyMost} />
                        <SkeletonItem shape={componentProps.skeleton.rectangle} size={componentProps.size.size12} className={styles.skeletonCardBodyPartial} />
                      </div>
                      <div className={styles.skeletonCardFooter}>
                        <SkeletonItem shape={componentProps.skeleton.rectangle} size={componentProps.size.size16} className={styles.skeletonCardFooterButton1} />
                        <SkeletonItem shape={componentProps.skeleton.rectangle} size={componentProps.size.size16} className={styles.skeletonCardFooterButton2} />
                      </div>
                    </>
                  ) : (
                    <>
                      <CardHeader
                        image={<Avatar name="Sarah Chen" size={componentProps.size.size40} color={componentProps.avatar.colorful} />}
                        header={<Text weight={componentProps.text.semibold}>Sarah Chen</Text>}
                        description={<Text size={componentProps.text.size200}>Senior Software Engineer</Text>}
                      />
                      <CardPreview>
                        <div>
                          <Text>{strings.cardDescription}</Text>
                        </div>
                      </CardPreview>
                      <CardFooter>
                        <div className={styles.buttonContainer}>
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
                        </div>
                      </CardFooter>
                    </>
                  )}
                </Card>
                <Button 
                  appearance={componentProps.button.secondary}
                  onClick={() => {
                    setIsCardLoading(true);
                    addMessage('Card loading demo started', MessageType.Info);
                  }}
                  disabled={isCardLoading}
                  className={styles.buttonSpacingTop}
                >
                  {isCardLoading ? 'Loading...' : 'Demo Loading'}
                </Button>
              </div>
            </Field>
          </div>

          <div className={styles.componentItem}>
            <Field label={strings.labelAccordion}>
              <Accordion 
                collapsible
                onToggle={(event, data) => {
                  const itemValue = data.value;
                  const isOpening = data.openItems.includes(itemValue);
                  const title = itemValue === 'requirements' ? strings.accordionTitle1 : strings.accordionTitle2;
                  addMessage(`Accordion "${title}" ${isOpening ? 'expanded' : 'collapsed'}`, MessageType.Info);
                }}
              >
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
      <section>
        <Title3 className={mergeClasses(styles.sectionHeader, styles.h3Heading)} as="h3">{strings.interactive}</Title3>
        
        <div className={styles.componentGrid}>
          <div className={styles.componentItem}>
            <Field label={strings.labelToastNotifications}>
              <div className={styles.buttonContainer}>
                <Button 
                  appearance={componentProps.button.primary}
                  size={componentProps.size.small}
                  onClick={() => showToast(MessageType.Success)}
                >
                  {strings.buttonSuccess}
                </Button>
                <Button 
                  appearance={componentProps.button.primary}
                  onClick={() => showToast(MessageType.Error)}
                  size={componentProps.size.small}
                >
                  {strings.buttonError}
                </Button>
                <Button 
                  appearance={componentProps.button.primary}
                  onClick={() => showToast(MessageType.Warning)}
                  size={componentProps.size.small}
                >
                  {strings.buttonWarning}
                </Button>
                <Button 
                  appearance={componentProps.button.primary}
                  onClick={() => showToast(MessageType.Info)}
                  size={componentProps.size.small}
                >
                  {strings.buttonInfo}
                </Button>
              </div>
            </Field>
          </div>

          <div className={styles.componentItem}>
            <Field label={strings.labelProgress}>
              <div className={styles.tabContentStandardized}>
                <ProgressBar value={progressValue} />
                <Text>{formatString(strings.progressLabel, Math.round(progressValue * 100).toString())}</Text>
                <Button
                  appearance="secondary"
                  size="small"
                  onClick={startProgressDemo}
                  disabled={isProgressRunning}
                  
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
        <Title3 className={mergeClasses(styles.sectionHeader, styles.h3Heading)} as="h3">{strings.loadingStates}</Title3>
        
        <div className={styles.tabContentStandardized}>
          <Field label={strings.labelSkeleton}>
            <div className={styles.tabContentStandardized}>
              {isSkeletonLoading ? (
                <Skeleton>
                  <div className={styles.tabContentStandardized}>
                    <SkeletonItem shape="circle" size={48} />
                    <div className={styles.tabContentStandardized}>
                      <SkeletonItem shape="rectangle" size={16} />
                      <SkeletonItem shape="rectangle" size={12} />
                    </div>
                  </div>
                </Skeleton>
              ) : (
                <div className={styles.tabContentStandardized}>
                  <Avatar
                    name="Sarah Chen"
                    size={48}
                    color="colorful"
                    
                  />
                  <div className={styles.tabContentStandardized}>
                    <Text weight={componentProps.text.semibold} size={componentProps.text.size400}>Sarah Chen</Text>
                    <Caption1>Senior Software Engineer • Microsoft</Caption1>
                  </div>
                </div>
              )}
            </div>
            <Button
              appearance={componentProps.button.secondary}
              size={componentProps.size.small}
              onClick={() => {
                setIsSkeletonLoading(true);
                addMessage('Skeleton loading demo started', MessageType.Info);
              }}
              
            >
              {isSkeletonLoading ? 'Loading...' : 'Show Loading Demo'}
            </Button>
          </Field>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section>
        <Title3 className={mergeClasses(styles.sectionHeader, styles.h3Heading)} as="h3">{strings.searchFilter}</Title3>
        
        <div className={styles.tabContentStandardized}>
          <Field label={strings.labelSearch}>
            <div className={styles.tabContentStandardized}>
              <SearchBox
                placeholder={strings.searchPlaceholder}
                value={formData.searchValue}
                onChange={(e, data) => {
                  updateField('searchValue')(data.value);
                  addMessage(`Search query: "${data.value}"`);
                }}
                dismiss={{
                  onClick: () => {
                    updateField('searchValue')('');
                    addMessage('Search cleared');
                  }
                }}
              />
              {formData.searchValue && (
                <div className={styles.tabContentStandardized}>
                  <Text>{`Found ${searchResults.length} results for "${formData.searchValue}"`}</Text>
                </div>
              )}
            </div>
          </Field>
        </div>
      </section>

      {/* Data & Visualization Section */}
      <section >
        <Title3 className={mergeClasses(styles.sectionHeader, styles.h3Heading)} as="h3">{strings.dataVisualization}</Title3>
        
        <div className={styles.tabContentStandardized}>
          <Field label={strings.labelDataTable}>
            <div className={styles.tabContentStandardized}>
              <div className={styles.tabContentStandardized}>
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
                    {(formData.searchValue ? searchResults : tableData).map((item) => (
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
                
                {formData.searchValue && searchResults.length === 0 && (
                  <div className={styles.tabContentStandardized}>
                    <Text>{strings.noResults}</Text>
                  </div>
                )}
              </div>
            </div>
          </Field>
        </div>
      </section>

    </div>
  );
};

export default ComponentShowcaseTab;
