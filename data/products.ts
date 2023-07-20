export interface Product {
  slug: string;
  title: string;
  text: string;
  href: string;
  label: string;
  header: {
    part1: string;
    part2: string;
  };
  tags: string[];
  images: {
    light: string;
    dark: string;
  };
}

export const ProductListData: Product[] = [
  {
    slug: 'create-cosmos-app',
    title: 'Create Cosmos App',
    label: 'create-cosmos-app',
    images: {
      light: '/logos/create-cosmos-app/create-cosmos-app.png',
      dark: '/logos/create-cosmos-app/create-cosmos-app.png'
    },
    header: {
      part1: 'Create',
      part2: 'Cosmos App'
    },
    text: 'Set up a modern Cosmos app by running one command',
    href: 'https://github.com/cosmology-tech/create-cosmos-app',
    tags: ['wallets', 'scaffolding']
  },
  {
    slug: 'cosmos-kit',
    title: 'CosmosKit',
    label: 'cosmos-kit',
    header: {
      part1: 'Cosmos',
      part2: 'Kit'
    },
    images: {
      light: '/svgs/cosmology-dude.svg',
      dark: '/svgs/cosmology-dude.svg'
    },
    text: 'A wallet adapter for react with mobile WalletConnect support for the Cosmos ecosystem.',
    href: 'https://github.com/cosmology-tech/cosmos-kit',
    tags: ['wallets', 'scaffolding']
  },
  {
    slug: 'osmojs',
    title: 'OsmoJS',
    label: 'osmojs',
    header: {
      part1: 'Osmo',
      part2: 'JS'
    },
    images: {
      light: '/logos/osmojs/logo_bright_wordmark.svg',
      dark: '/logos/osmojs/logo_dark_wordmark.svg'
    },
    text: 'A wallet adapter for react with mobile WalletConnect support for the Cosmos ecosystem.',
    href: 'https://github.com/osmosis-labs/osmojs',
    tags: ['wallets', 'scaffolding']
  },
  {
    slug: 'telescope',
    title: 'Telescope',
    label: 'telescope',
    header: {
      part1: '',
      part2: 'Telescope'
    },
    images: {
      light: '/logos/telescope/logo_bright_wordmark.svg',
      dark: '/logos/telescope/logo_dark_wordmark.svg'
    },
    text: 'A TypeScript Transpiler for Cosmos Protobufs to generate libraries for Cosmos blockchains.',
    href: 'https://github.com/osmosis-labs/telescope',
    tags: ['transactions', 'codegen']
  },
  {
    slug: 'cosmwasm-ts-codegen',
    title: 'TS Codegen',
    label: 'cosmwasm/ts-codegen',
    header: {
      part1: 'CosmWasm',
      part2: 'TS Codegen'
    },
    images: {
      light: '/logos/ts-codegen/logo.png',
      dark: '/logos/ts-codegen/logo.png'
    },
    text: 'The quickest and easiest way to convert CosmWasm Contracts into dev-friendly TypeScript classes.',
    href: 'https://github.com/CosmWasm/ts-codegen',
    tags: ['transactions', 'cosmwasm', 'codegen']
  },
  {
    slug: 'cosmology',
    title: 'Cosmology CLI',
    label: 'cosmology',
    header: {
      part1: 'Cosmology',
      part2: 'CLI'
    },
    images: {
      light: '/logos/cosmology/logo.svg',
      dark: '/logos/cosmology/logo.svg'
    },
    text: 'Build web3 applications in the Cosmos and Intechain Ecosystem.',
    href: 'https://github.com/cosmology-tech/cosmology',
    tags: ['wallets', 'CLI']
  },
  {
    slug: 'chain-registry',
    label: 'chain-registry',
    title: 'Chain Registry',
    header: {
      part1: 'Chain',
      part2: 'Registry'
    },
    images: {
      light: '/svgs/cosmology-dude.svg',
      dark: '/svgs/cosmology-dude.svg'
    },
    text: 'The npm package for the Official Cosmos chain registry.',
    href: 'https://github.com/cosmology-tech/chain-registry',
    tags: ['chain-info']
  }
];
