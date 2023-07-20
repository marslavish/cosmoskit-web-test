import { Box, ChakraProvider, HStack, Text, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function TestNoFrame() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  const mode = (light: string, dark: string) => {
    return colorMode === 'light' ? light : dark;
  };

  return (
    <Layout>
      <Box
        w='60%'
        h='400px'
        my={16}
        mx='auto'
        border='1px solid black'
        bg={mode('white', 'gray.800')}
      >
        <HStack justifyContent='flex-end' borderBottom='1px solid black'>
          <Button onClick={toggleTheme}>toggle </Button>
        </HStack>
        <Text>Test</Text>
      </Box>
    </Layout>
  );
}
