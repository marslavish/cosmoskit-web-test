import {
  Box,
  Center,
  Divider,
  extendTheme,
  Icon,
  Skeleton,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { shadesOfPurple } from 'react-code-blocks';

import { AnimateBox } from '../components/AnimateComponents';
import { FloatingLayout } from '../components/explore/FloatingLayout';
import { SnippetBlock } from '../components/explore/SnippetBlock';
import { links } from '../components/explore/ui-kits/common';
import { Logo } from '../components/Icons';
import Layout from '../components/Layout';
import { Head } from '../components/seo/Head';

type SelectedCategory = {
  category: string;
  component?: string;
};

// use for let color mode value fit Rules of Hooks
function handleChangeColorModeValue(colorMode: string, light: string, dark: string) {
  if (colorMode === 'light') return light;
  if (colorMode === 'dark') return dark;
}

const LoadingFrame = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      borderRadius='lg'
      border='1px solid'
      borderColor={handleChangeColorModeValue(colorMode, 'gray.100', 'purple.800')}
      w='full'
    >
      <Box p={4}>
        <Skeleton
          w='full'
          maxW={56}
          h={6}
          startColor={handleChangeColorModeValue(colorMode, 'gray.50', 'purple.700')}
          endColor={handleChangeColorModeValue(colorMode, 'gray.200', 'purple.800')}
          speed={1.5}
        />
      </Box>
      <Divider />
      <Center position='relative' h={72} p={4}>
        <AnimateBox
          position='absolute'
          initial={{ opacity: 0.6, scale: 0.9 }}
          animate={{
            opacity: [0.6, 0.4, 0.2, 0.4, 0.6],
            scale: 1,
            transition: {
              ease: [0.17, 0.67, 0.83, 0.67],
              repeat: Infinity,
              repeatType: 'mirror',
              duration: 3,
            },
          }}
        >
          <Icon as={Logo} w={24} h={24} />
        </AnimateBox>
      </Center>
    </Box>
  );
};

export default function Explore() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory | undefined>({
    category: links[0].category,
  });
  const [isLoading, setIsLoading] = useState(true);

  const defaultThemeObject = {
    fonts: {
      body: 'Inter, system-ui, sans-serif',
      heading: 'Work Sans, system-ui, sans-serif',
    },
    colors: {
      primary: {
        '50': '#e5e7f9',
        '100': '#bec4ef',
        '200': '#929ce4',
        '300': '#6674d9',
        '400': '#4657d1',
        '500': '#2539c9',
        '600': '#2133c3',
        '700': '#1b2cbc',
        '800': '#1624b5',
        '900': '#0d17a9',
      },
    },
    breakPoints: {
      sm: '30em',
      md: '48em',
      lg: '62em',
      xl: '80em',
      '2xl': '96em',
    },
    shadows: {
      largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
    },
  };
  const config = {
    ...defaultThemeObject,
    initialColorMode: 'light',
    useSystemColorMode: false,
  };
  const theme = extendTheme({ ...config });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    console.log('input', e.currentTarget.value);
  }
  function handleMenuLinkClick(category: string, component: string) {
    setIsLoading(true);
    setSelectedCategory({ category: category, component: component });
    router.push(`/explore/${category}#${component}`);
  }

  useEffect(() => {
    if (router.isReady) setIsLoading(false);
  }, [router.isReady]);

  return (
    <>
      <Head
        title='Cosmos Kit Explorer'
        description='Build Cosmos Apps with Lightning Speed'
        route='/explore'
      />
      <Layout>
        <Box position='relative' w='full' maxW='8xl' mx='auto'>
          <FloatingLayout
            links={links}
            selectedCategory={selectedCategory}
            handleInputChange={handleInputChange}
            handleMenuLinkClick={handleMenuLinkClick}
          >
            <Stack spacing={6}>
              {isLoading ? (
                <LoadingFrame />
              ) : (
                links[0].components.map(({ displayName, component, codeString, id }) => (
                  <SnippetBlock
                    key={id}
                    id={id}
                    codeTheme={shadesOfPurple}
                    theme={theme}
                    code={codeString}
                    componentName={displayName}
                    language='tsx'
                  >
                    {component}
                  </SnippetBlock>
                ))
              )}
            </Stack>
          </FloatingLayout>
        </Box>
      </Layout>
    </>
  );
}
