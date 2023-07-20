import React from 'react';

import Hero from '../components/Hero';
import Layout from '../components/Layout';
import { Head } from '../components/seo/Head';

export default function Home() {
  return (
    <Layout>
      <Head
        title="Cosmos Kit"
        description="Build Cosmos Apps with Lightning Speed"
        route="/"
      />
      <Hero />
    </Layout>
  );
}
