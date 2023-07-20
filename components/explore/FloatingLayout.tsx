import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Grid,
  GridItem,
  Icon,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { ChangeEventHandler, ReactNode, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiArrowUpSLine,
  RiCheckboxBlankCircleLine,
} from 'react-icons/ri';

type IconTypeProps = string | IconType | JSX.Element | ReactNode | any; // eslint-disable-line @typescript-eslint/no-explicit-any
type ComponentsList = {
  id: string;
  displayName?: string;
  component?: React.ReactNode;
  codeString?: string;
};
type CategoryLinkType = {
  category: string;
  components?: ComponentsList[];
};
type SelectedCategory = {
  category: string;
  component?: string;
};
type HandleMenuLinkClick = (category: string, component: string) => void;
type DisplayAccordionType = {
  links: CategoryLinkType[];
  selectedCategory?: SelectedCategory;
  windowScroll?: boolean;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  handleMenuLinkClick: HandleMenuLinkClick;
  handleMenuClose?: () => void;
};
interface FloatingMenuPropsType extends DisplayAccordionType {
  children: ReactNode;
}

const MenuLinkButton = ({
  icon,
  category,
  component,
  selectedCategory,
  handleMenuLinkClick,
  handleMenuClose,
}: {
  category: string;
  component: ComponentsList;
  selectedCategory?: SelectedCategory;
  icon?: IconTypeProps;
  handleMenuLinkClick: HandleMenuLinkClick;
  handleMenuClose?: () => void;
}) => {
  return (
    <Button
      title={component.displayName}
      display='flex'
      variant='ghost'
      justifyContent='start'
      alignItems='center'
      fontSize='md'
      fontWeight={{ base: 'medium', lg: 'semibold' }}
      textAlign='start'
      px={2}
      py={1}
      w='full'
      h='full'
      minH={10}
      maxH='fit-content'
      whiteSpace='break-spaces'
      opacity={0.8}
      lineHeight={1.1}
      isActive={selectedCategory?.component === component.id}
      _hover={{
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      _focus={{ boxShadow: 'none' }}
      onClick={() => {
        handleMenuLinkClick(category, component.id);
        handleMenuClose && handleMenuClose(); // eslint-disable-line no-unused-expressions
      }}
    >
      <Stack isInline={true} spacing={2} alignItems='center'>
        {icon}
        <Text>{component.displayName}</Text>
      </Stack>
    </Button>
  );
};

const DisplayAccordion = ({
  links,
  selectedCategory,
  handleInputChange,
  handleMenuLinkClick,
  handleMenuClose,
}: DisplayAccordionType) => {
  return (
    <Grid h='full' templateRows='auto 1fr'>
      <GridItem mb={3} px={4}>
        <Input minH={6} variant='outline' placeholder='Search' onChange={handleInputChange} />
      </GridItem>
      <Box
        pl={4}
        pr={2.5}
        h='full'
        overflowY='scroll'
        css={{
          // For Firefox
          scrollbarWidth: 'thin',
          scrollbarColor: 'lightgray transparent',
          // For Chrome and other browsers except Firefox
          '&::-webkit-scrollbar': {
            width: '8px',
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
            borderRadius: '6px',
            border: '3px solid',
            borderColor: useColorModeValue('#fff', '#1A202C'),
          },
        }}
      >
        {links.map(({ category, components }, i) => {
          return (
            <Accordion key={`${category[i]}`} defaultIndex={[0]} allowMultiple allowToggle>
              <AccordionItem key={category} border='none' _last={{ mb: 0 }}>
                {({ isExpanded }) => (
                  <Stack spacing={isExpanded ? 0.5 : 1} _last={{ pb: 0 }}>
                    <AccordionButton
                      display='flex'
                      fontSize='lg'
                      fontWeight={{
                        base: 'semibold',
                        lg: isExpanded ? 'bold' : 'semibold',
                      }}
                      px={0}
                      py={1.5}
                      opacity={isExpanded ? 1 : 0.75}
                      _hover={{
                        bg: 'transparent',
                        opacity: isExpanded ? 1 : 0.85,
                      }}
                      _focus={{ outline: 'none' }}
                    >
                      <Icon as={isExpanded ? RiArrowDownSLine : RiArrowRightSLine} mr={1.5} />
                      <Text flex={1} textAlign='left'>
                        {category}
                      </Text>
                    </AccordionButton>
                    <Stack spacing={1} pb={isExpanded ? 3 : 0}>
                      {components.map((component) => {
                        return (
                          <AccordionPanel key={component.id} p={0}>
                            <MenuLinkButton
                              category={category}
                              component={component}
                              selectedCategory={selectedCategory}
                              icon={<Icon as={RiCheckboxBlankCircleLine} w={2} h={2} mr={0.5} />}
                              handleMenuLinkClick={handleMenuLinkClick}
                              handleMenuClose={handleMenuClose}
                            />
                          </AccordionPanel>
                        );
                      })}
                    </Stack>
                  </Stack>
                )}
              </AccordionItem>
            </Accordion>
          );
        })}
      </Box>
    </Grid>
  );
};

const DesktopSidebar = ({
  links,
  selectedCategory,
  handleInputChange,
  handleMenuLinkClick,
}: DisplayAccordionType) => {
  return (
    <Stack
      position='relative'
      top={0}
      borderRadius='lg'
      border='1px solid'
      borderColor={useColorModeValue('gray.100', 'purple.800')}
      minW={52}
      w='full'
      maxW={60}
      h='full'
      pt={6}
      pb={3.5}
    >
      <DisplayAccordion
        links={links}
        selectedCategory={selectedCategory}
        handleInputChange={handleInputChange}
        handleMenuLinkClick={handleMenuLinkClick}
      />
    </Stack>
  );
};

const MobileDrawer = ({
  links,
  selectedCategory,
  windowScroll,
  handleInputChange,
  handleMenuLinkClick,
}: DisplayAccordionType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position='fixed'
      bottom={0}
      left={2}
      right={2}
      zIndex='sticky'
      transition='all .8s ease-in-out'
      opacity={windowScroll ? 0.3 : 1}
    >
      <Button
        variant='unstyled'
        display='flex'
        justifyContent='center'
        flexDirection='column'
        zIndex='sticky'
        pt={1}
        pb={3.5}
        w='full'
        h='auto'
        lineHeight='shorter'
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius='6px 6px 0 0'
        boxShadow={useColorModeValue('0 0px 2px #e3e3e3, 0 0 16px -6px #c4c4c4', '0 -4px 5px #555')}
        color={useColorModeValue('gray.700', 'white')}
        _focus={{ outline: 'none' }}
        _hover={{ opacity: 1 }}
        onClick={onOpen}
      >
        <Icon as={RiArrowUpSLine} w={6} h={6} />
        <Text mt={-1.5}>Components</Text>
      </Button>
      <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderRadius='6px 6px 0 0' h='full'>
          <Button
            variant='unstyled'
            display='flex'
            justifyContent='center'
            alignItems='center'
            position='fixed'
            h='auto'
            minH={12}
            w='full'
            lineHeight='shorter'
            color={useColorModeValue('gray.700', 'white')}
            opacity={windowScroll ? 0.6 : 1}
            _focus={{ outline: 'none' }}
            _hover={{ opacity: 1 }}
            onClick={onClose}
          >
            <Icon as={RiArrowDownSLine} w={6} h={6} />
          </Button>
          <Box position='absolute' top={12} left={4} right={4} bottom={4}>
            <DisplayAccordion
              links={links}
              selectedCategory={selectedCategory}
              handleInputChange={handleInputChange}
              handleMenuLinkClick={handleMenuLinkClick}
              handleMenuClose={onClose}
            />
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export const FloatingLayout = ({
  children,
  links,
  selectedCategory,
  handleInputChange,
  handleMenuLinkClick,
}: FloatingMenuPropsType) => {
  const [windowScroll, setWindowScroll] = useState(false);

  // use for the components button changes opacity when the window scrolling in mobile version
  useEffect(() => {
    window.onscroll = () => setWindowScroll(true);
    setTimeout(() => {
      if (windowScroll) {
        setWindowScroll(false);
      }
    }, 400);
  }, [windowScroll]);

  return (
    <Grid templateColumns={{ lg: 'auto 1fr' }} templateRows='1fr' w='full' h='full' p={4}>
      {/* desktop */}
      <Box
        position='sticky'
        top={24}
        display={{ base: 'none', lg: 'block' }}
        w={64}
        h='calc(100vh - 7.5rem)'
      >
        <DesktopSidebar
          links={links}
          selectedCategory={selectedCategory}
          handleMenuLinkClick={handleMenuLinkClick}
          handleInputChange={handleInputChange}
        />
      </Box>
      {/* content */}
      <Box w='full' pb={{ base: 12, lg: 0 }}>
        {children}
      </Box>
      {/* mobile */}
      <Box display={{ base: 'block', lg: 'none' }}>
        <MobileDrawer
          links={links}
          selectedCategory={selectedCategory}
          windowScroll={windowScroll}
          handleInputChange={handleInputChange}
          handleMenuLinkClick={handleMenuLinkClick}
        />
      </Box>
    </Grid>
  );
};
