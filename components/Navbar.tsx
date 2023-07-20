import {
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Link as ChakraLink,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiCloseFill,
  RiGithubFill,
  RiMenuLine,
  RiMoonFill,
  RiSunFill,
} from 'react-icons/ri';

import { ProductListData } from '../data/products';
import { Logo } from './Icons';

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  target?: string;
  icon?: IconType;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Test (mitosis)',
    href: '/test-mitosis',
  },
  {
    label: 'Test (with frame)',
    href: '/test-with-frame',
  },
  {
    label: 'Test (no frame)',
    href: '/test-no-frame',
  },
  {
    label: 'Components',
    href: '/explore',
  },
  {
    label: 'Docs',
    href: 'https://docs.cosmoskit.com/',
  },
  {
    label: 'Github',
    icon: RiGithubFill,
    children: ProductListData.map((product) => {
      return {
        label: product.label,
        href: product.href,
        target: '_blank',
      };
    }),
  },
];

function handleChangeColorModeValue(colorMode: string, light: string, dark: string) {
  if (colorMode === 'light') return light;
  if (colorMode === 'dark') return dark;
}

const DesktopLinks = ({ label, icon, children }: NavItem) => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Button
            variant='ghost'
            color={handleChangeColorModeValue(colorMode, 'purple.600', 'purple.300')}
            borderRadius='md'
            _hover={{
              opacity: 0.8,
            }}
            _focus={{
              outline: 'none',
            }}
          >
            <Text fontSize='lg' mr={1}>
              {label}
            </Text>
            <Icon as={RiArrowDownSLine} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          zIndex='1000'
          bg={handleChangeColorModeValue(colorMode, 'white', '#423157')}
          color={handleChangeColorModeValue(colorMode, 'purple.700', '#bfa4ee')}
          border='none'
          borderRadius='xl'
          boxShadow={handleChangeColorModeValue(
            colorMode,
            'base',
            '0 1px 4px 1px #352b39, 0 1px 4px -2px #9743ff, 0 2px 10px -5px #242424'
          )}
          _focus={{ outline: 'none' }}
        >
          <PopoverBody p={2}>
            <Stack p={1} spacing={1.5}>
              {children.map(({ label: linkName, subLabel, href, target }, i) => (
                <NextLink key={`${label}${i}`} href={href} passHref={true}>
                  <ChakraLink
                    p={3}
                    borderRadius='xl'
                    _hover={{
                      bg: handleChangeColorModeValue(colorMode, 'whiteAlpha.500', 'whiteAlpha.200'),
                      textDecoration: 'none',
                    }}
                    _focus={{ outline: 'none' }}
                    target={target}
                  >
                    <Stack isInline={true} justifyContent='space-between' alignItems='center'>
                      <Box>
                        <Text fontSize='lg' fontWeight='semibold' opacity={0.9}>
                          {linkName}
                        </Text>
                        <Text fontSize='md' opacity={0.75}>
                          {subLabel}
                        </Text>
                      </Box>
                      {icon && (
                        <Box w={6} h={6} minW={6} minH={6} opacity={0.7}>
                          <Icon as={icon} w='full' h='full' />
                        </Box>
                      )}
                    </Stack>
                  </ChakraLink>
                </NextLink>
              ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
const DesktopNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Center position='fixed' top={0} left={0} right={0} zIndex='sticky'>
      <Box
        _after={{
          content: '""',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          position: 'absolute',
          backdropFilter: 'blur(6px)',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        zIndex={-1}
      ></Box>
      <Box w='full' maxW='8xl'>
        <Stack isInline={true} justifyContent='space-between' alignItems='center' w='full' py={2}>
          {/* logo */}
          <NextLink href='/' passHref={true}>
            <ChakraLink _focus={{ outline: 'none' }}>
              <Box px={6} py={3.5}>
                <Box w='full' minW={10} maxW={10} h='full'>
                  <Logo />
                </Box>
              </Box>
            </ChakraLink>
          </NextLink>
          {/* nav link */}
          <Stack isInline={true} alignItems='center' spacing={4} py={2} px={6}>
            <Stack isInline={true}>
              {NAV_ITEMS.map(({ label, icon, children, href }, i) => {
                if (href)
                  return (
                    <NextLink key={`${label}${i}`} href={href} passHref={true}>
                      <ChakraLink _hover={{ textDecoration: 'none' }}>
                        <Button
                          variant='ghost'
                          color={handleChangeColorModeValue(colorMode, 'purple.600', 'purple.300')}
                          borderRadius='md'
                          fontSize='lg'
                          _hover={{
                            opacity: 0.8,
                          }}
                          _focus={{
                            outline: 'none',
                          }}
                        >
                          {label}
                        </Button>
                      </ChakraLink>
                    </NextLink>
                  );
                if (!href)
                  return (
                    <DesktopLinks
                      key={`${label}${i}`}
                      label={label}
                      icon={icon}
                      children={children} // eslint-disable-line react/no-children-prop
                    />
                  );
              })}
            </Stack>
            <Button
              variant='ghost'
              color={handleChangeColorModeValue(colorMode, 'purple.600', 'purple.300')}
              borderRadius='full'
              _hover={{
                bg: handleChangeColorModeValue(
                  colorMode,
                  'radial-gradient(circle 875px at 49.8% 64.3%,  rgba(254,251,255,0.8) 0%, rgba(244,221,255,0.85) 46.9%)',
                  'radial-gradient(circle 875px at 49.8% 64.3%,  rgba(39,2,75,0.8) 2.2%, rgba(20,1,33,0.85) 20.2%, rgba(27,88,111,0.85) 58.6%, rgba(115,88,44,0.85) 75%, rgba(99,19,90,0.85) 89.6%, rgba(12,51,76,0.85) 96.1%)'
                ),
              }}
              _focus={{ outline: 'none' }}
              onClick={toggleColorMode}
              px={0}
            >
              <Icon as={colorMode === 'light' ? RiMoonFill : RiSunFill} w={4} h={4} />
            </Button>
          </Stack>
        </Stack>
        <Box>
          <Divider
            borderColor={handleChangeColorModeValue(
              colorMode,
              'rgba(235,173,254,0.25)',
              'rgba(235,173,254,0.2)'
            )}
          />
        </Box>
      </Box>
    </Center>
  );
};
const MobileLinks = ({ label, icon, children }: NavItem) => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Text fontWeight='semibold' fontSize='xl' mb={2.5}>
        {label}
      </Text>
      <Stack pb={4} spacing={2}>
        {children.map(({ label: linkName, subLabel, href }, i) => (
          <NextLink key={`${label}${i}`} href={href} passHref={true}>
            <ChakraLink
              borderRadius='xl'
              py={2}
              px={4}
              _hover={{
                bg: handleChangeColorModeValue(colorMode, 'blackAlpha.50', 'whiteAlpha.50'),
                textDecoration: 'none',
              }}
              _focus={{ outline: 'none' }}
            >
              <Flex justify='space-between' alignItems='center'>
                <Box>
                  <Text fontSize='lg' fontWeight='semibold'>
                    {linkName}
                  </Text>
                  <Text fontSize='md' opacity={0.8}>
                    {subLabel}
                  </Text>
                </Box>
                <Box>
                  <Icon as={icon} w={5} h={5} minW={5} minH={5} />
                </Box>
              </Flex>
            </ChakraLink>
          </NextLink>
        ))}
      </Stack>
    </Box>
  );
};
const MobileNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box position='fixed' top={0} left={0} right={0} zIndex='sticky' px={4}>
      <Box
        _after={{
          content: '""',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          position: 'absolute',
          backdropFilter: 'blur(6px)',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        zIndex={-1}
      ></Box>
      <Flex
        position='relative'
        zIndex={5}
        justifyContent='space-between'
        alignItems='center'
        py={3}
        px={2}
      >
        <NextLink href='/' passHref={true}>
          <ChakraLink _focus={{ outline: 'none' }}>
            <Box w='full' minW={10} maxW={10} h='full'>
              <Logo />
            </Box>
          </ChakraLink>
        </NextLink>
        <Button
          variant='ghost'
          color={handleChangeColorModeValue(colorMode, 'purple.600', 'purple.300')}
          px={0}
          _hover={{
            bg: handleChangeColorModeValue(
              colorMode,
              'radial-gradient(circle 875px at 49.8% 64.3%,  rgba(254,251,255,0.8) 0%, rgba(244,221,255,0.85) 46.9%)',
              'radial-gradient(circle 875px at 49.8% 64.3%,  rgba(39,2,75,0.8) 2.2%, rgba(20,1,33,0.85) 20.2%, rgba(27,88,111,0.85) 58.6%, rgba(115,88,44,0.85) 75%, rgba(99,19,90,0.85) 89.6%, rgba(12,51,76,0.85) 96.1%)'
            ),
          }}
          _focus={{ outline: 'none' }}
          onClick={onToggle}
        >
          <Icon as={RiMenuLine} w={7} h={7} />
        </Button>
      </Flex>
      <Box>
        <Divider
          borderColor={handleChangeColorModeValue(
            colorMode,
            'rgba(235,173,254,0.25)',
            'rgba(235,173,254,0.2)'
          )}
        />
      </Box>
      <Box position='relative'>
        <Drawer placement='top' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent
            bg={handleChangeColorModeValue(
              colorMode,
              'radial-gradient(circle 875px at 49.8% 64.3%,  rgba(254,251,255,0.95) 0%, rgba(244,221,255,1) 46.9%)',
              'radial-gradient( circle farthest-corner at 10% 20%,  rgba(19,32,59,1) 0%, rgba(31,38,130,1) 90%)'
            )}
            color={handleChangeColorModeValue(colorMode, 'purple.700', 'purple.300')}
          >
            <DrawerHeader>
              <Flex justify='space-between' align='center'>
                <NextLink href='/' passHref={true}>
                  <ChakraLink _focus={{ outline: 'none' }}>
                    <Box w='full' minW={10} maxW={10} h='full'>
                      <Logo />
                    </Box>
                  </ChakraLink>
                </NextLink>
                <Stack isInline={true} alignItems='center' spacing={4}>
                  <Button
                    variant='ghost'
                    color={handleChangeColorModeValue(colorMode, 'purple.700', 'purple.200')}
                    borderRadius='full'
                    _hover={{
                      bg: handleChangeColorModeValue(colorMode, 'purple.200', 'purple.700'),
                    }}
                    _focus={{ outline: 'none' }}
                    onClick={toggleColorMode}
                    px={0}
                  >
                    <Icon as={colorMode === 'light' ? RiMoonFill : RiSunFill} w={4} h={4} />
                  </Button>
                  <Button
                    variant='ghost'
                    borderRadius='full'
                    color={handleChangeColorModeValue(colorMode, 'purple.700', 'purple.200')}
                    _hover={{
                      bg: handleChangeColorModeValue(colorMode, 'purple.200', 'purple.700'),
                    }}
                    _focus={{ outline: 'none' }}
                    onClick={onClose}
                    px={0}
                  >
                    <Icon as={RiCloseFill} w={6} h={6} />
                  </Button>
                </Stack>
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing={4}>
                {NAV_ITEMS.map(({ label, icon, children, href }, i) => {
                  if (href)
                    return (
                      <NextLink key={`${label}${i}`} href={href} passHref={true}>
                        <ChakraLink
                          _hover={{ textDecoration: 'none' }}
                          _focus={{
                            outline: 'none',
                          }}
                        >
                          <Button
                            variant='ghost'
                            color={handleChangeColorModeValue(
                              colorMode,
                              'purple.700',
                              'purple.300'
                            )}
                            px={0}
                            borderRadius='md'
                            fontSize='xl'
                            rightIcon={<Icon as={RiArrowRightSLine} />}
                            _hover={{
                              opacity: 0.8,
                            }}
                            _focus={{
                              outline: 'none',
                            }}
                          >
                            {label}
                          </Button>
                        </ChakraLink>
                      </NextLink>
                    );
                  if (!href)
                    return (
                      <MobileLinks
                        key={`${label}${i}`}
                        label={label}
                        icon={icon}
                        children={children} // eslint-disable-line react/no-children-prop
                      />
                    );
                })}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default function WithSubnavigation() {
  const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener('change', (e) => updateTarget(e));

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener('change', (e) => updateTarget(e));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return targetReached;
  };
  const navbar = useBreakpointValue({
    base: useMediaQuery(769) && <MobileNav />,
    md: useMediaQuery(992) && <MobileNav />,
    lg: <DesktopNav />,
  });
  return <Box h={{ base: '4rem', lg: '5rem' }}>{navbar}</Box>;
}
