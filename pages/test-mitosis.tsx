import React from 'react';
import Layout from '../components/Layout';
import { Button, BondingCard } from '@interchain-ui/react';
import { VStack } from '@chakra-ui/react';
import { useTheme } from '../hooks/useTheme';

export default function TestMitosis() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout>
      <VStack>
        <Button variant='solid' onClick={toggleTheme}>
          Toggle Theme
        </Button>
        <BondingCard title='current theme' value={theme} />
      </VStack>
    </Layout>
  );
}
