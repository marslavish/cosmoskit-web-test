import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Box minH="calc(100vh - 5rem)">{children}</Box>
      <Footer />
    </>
  );
}
