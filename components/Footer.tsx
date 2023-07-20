import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { IconType } from 'react-icons';
import {
  FaDiscord,
  FaGithub,
  FaTelegram,
  FaTwitter,
  FaYinYang,
  FaYoutube
} from 'react-icons/fa';

import { AnimateFlex } from './AnimateComponents';
import { Logo } from './Icons';

interface BaseLinkType {
  name: string;
  href: string;
  icon?: IconType;
  transform?: string;
}

const FOOTER_SOCIAL_LINKS: BaseLinkType[] = [
  {
    name: 'github',
    href: 'https://github.com/cosmology-tech',
    icon: FaGithub
  },
  {
    name: 'twitter',
    href: 'https://twitter.com/cosmology_tech',
    icon: FaTwitter
  },
  {
    name: 'telegram',
    href: 'https://t.me/cosmologytech',
    icon: FaTelegram
  },
  {
    name: 'daodao',
    href: 'https://daodao.zone/dao/juno1tqyl2tw4ansm8gxrr2292zxdx5cvsrawq8s0xv7qrpzwg7dtqwvskkaq9u',
    icon: FaYinYang,
    transform: 'rotate(90deg)'
  },
  {
    name: 'discord',
    href: 'https://discord.gg/xh3ZwHj2qQ',
    icon: FaDiscord
  },
  {
    name: 'youtube',
    href: 'https://www.youtube.com/channel/UCA9jzRlnUJRxec8S5Lt7Vcw',
    icon: FaYoutube
  }
];

const SocialItem = ({ href, icon, transform }: BaseLinkType) => (
  <NextLink href={href} passHref={true}>
    <ChakraLink _focus={{ outline: 'none' }} target={'_blank'}>
      <Box w={6} h={6}>
        <Icon as={icon} w="full" h="full" transform={transform} />
      </Box>
    </ChakraLink>
  </NextLink>
);

export default function Footer() {
  return (
    <Center px={6} pt={8} pb={16}>
      <Stack justifyContent="center" w="full" maxW="8xl" spacing={12}>
        <HStack justifyContent="center" alignItems="center">
          <Box w="full">
            <Divider
              borderColor={useColorModeValue(
                'rgba(235,173,254,0.25)',
                'rgba(235,173,254,0.2)'
              )}
            />
          </Box>
          <AnimateFlex
            justify="center"
            align="center"
            border="1px solid"
            borderColor={useColorModeValue(
              'rgba(235,173,254,0.25)',
              'rgba(235,173,254,0.2)'
            )}
            borderRadius="full"
            initial={false}
            animate={{
              rotate: '0deg',
              transition: {
                duration: 3
              }
            }}
            // desktop
            whileHover={{
              rotate: '360deg',
              transition: {
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
                duration: 3
              }
            }}
            // mobile
            whileTap={{
              rotate: '360deg',
              transition: {
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
                duration: 3
              }
            }}
            p={1}
          >
            <Icon as={Logo} w={6} h={6} />
          </AnimateFlex>
          <Box w="full">
            <Divider
              borderColor={useColorModeValue(
                'rgba(235,173,254,0.25)',
                'rgba(235,173,254,0.2)'
              )}
            />
          </Box>
        </HStack>
        <Grid
          templateColumns={{ md: 'repeat(4, 1fr)' }}
          color={useColorModeValue('purple.600', 'purple.300')}
          opacity={useColorModeValue(0.8, 0.6)}
          gap={{ base: 10, md: 6 }}
          w="full"
          px={6}
        >
          {/* {FOOTER_PAGE_LINKS.map(({ header, links }, i) => (
            <LinkItem key={`${header}${i}`} header={header} links={links} />
          ))} */}
          <GridItem colSpan={{ md: 4 }}>
            <Center>
              <Flex
                w="full"
                maxW={{ md: 72 }}
                justify="space-between"
                px={{ base: 2, lg: 0 }}
                mt={{ md: 8 }}
                mb={{ base: 10, md: 8 }}
              >
                {FOOTER_SOCIAL_LINKS.map(
                  ({ name, href, icon, transform }, i) => (
                    <SocialItem
                      key={`${name}${i}`}
                      name={name}
                      href={href}
                      icon={icon}
                      transform={transform}
                    />
                  )
                )}
              </Flex>
            </Center>
            <Text fontSize="sm" textAlign="center" opacity={0.8}>
              © {new Date().getFullYear()} Cosmology. All rights reserved
            </Text>
          </GridItem>
        </Grid>
      </Stack>
    </Center>
  );
}
