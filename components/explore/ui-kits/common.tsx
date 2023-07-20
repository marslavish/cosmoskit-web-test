import { Box } from '@chakra-ui/react';
import React from 'react';

import LockTokens from './kits/dex/LockTokens';
import ManageLiquidity from './kits/dex/ManageLiquidity';
import Swap from './kits/dex/Swap';
import DepositSimple from './kits/ibc/DepositSimple';
import DepositTokens from './kits/ibc/DepositTokens';
import WithdrawSimple from './kits/ibc/WithdrawSimple';
import WithdrawTokens from './kits/ibc/WithdrawTokens';
import ChangeChainDropdown from './kits/util/ChangeChainDropdown';
import SimpleLayout from './kits/util/SimpleLayout';
import ConnectWalletButton from './kits/wallets/ConnectWalletButton';
import CopyAddressButton from './kits/wallets/CopyAddressButton';
import LockTokensCode from './string/dex/LockTokens';
import ManageLiquidityCode from './string/dex/ManageLiquidity';
import SwapCode from './string/dex/Swap';
import DepositSimpleCode from './string/ibc/DepositSimple';
import WithdrawSimpleCode from './string/ibc/WithdrawSimple';
import WithdrawTokensCode from './string/ibc/WithdrawTokens';
import ChangeChainDropdownCode from './string/utils/ChangeChainDropdown';
import SimpleLayoutCode from './string/utils/SimpleLayout';
import ConnectWalletButtonCode from './string/wallet/ConnectWalletButton';
import CopyAddressButtonCode from './string/wallet/CopyAddressButton';

type ComponentsList = {
  id: string;
  displayName?: string;
  component?: React.ReactNode;
  codeString?: string;
};
type LinkList = { category: string; components: ComponentsList[] };

export const links: LinkList[] = [
  {
    category: 'wallet',
    components: [
      {
        id: 'connect-wallet-button',
        displayName: 'Connect Wallet',
        component: (
          <Box mx="auto" maxW={52} py={20}>
            <ConnectWalletButton />
          </Box>
        ),
        codeString: ConnectWalletButtonCode
      },
      {
        id: 'copy-address-button',
        displayName: 'Copy Address',
        component: (
          <Box mx="auto" maxW={60} py={20}>
            <CopyAddressButton />
          </Box>
        ),
        codeString: CopyAddressButtonCode
      }
    ]
  },
  {
    category: 'dex',
    components: [
      {
        id: 'swap',
        displayName: 'Swap',
        component: <Swap />,
        codeString: SwapCode
      },
      {
        id: 'lock-tokens',
        displayName: 'Lock Tokens',
        component: <LockTokens />,
        codeString: LockTokensCode
      },
      {
        id: 'manage-liquidity',
        displayName: 'Manage Liquidity',
        component: <ManageLiquidity />,
        codeString: ManageLiquidityCode
      }
    ]
  },
  {
    category: 'ibc',
    components: [
      {
        id: 'deposit-simple',
        displayName: 'Deposit Simple',
        component: <DepositSimple />,
        codeString: DepositSimpleCode
      },
      {
        id: 'deposit-tokens',
        displayName: 'Deposit Tokens',
        component: <DepositTokens />,
        codeString: ConnectWalletButtonCode
      },
      {
        id: 'withdraw-simple',
        displayName: 'Withdraw Simple',
        component: <WithdrawSimple />,
        codeString: WithdrawSimpleCode
      },
      {
        id: 'withdraw-tokens',
        displayName: 'Withdraw Tokens',
        component: <WithdrawTokens />,
        codeString: WithdrawTokensCode
      }
    ]
  },
  {
    category: 'util',
    components: [
      {
        id: 'change-chain-dropdown',
        displayName: 'Chain Dropdown',
        component: (
          <Box mx="auto" maxW={72} minH="md" py={20}>
            <ChangeChainDropdown />
          </Box>
        ),
        codeString: ChangeChainDropdownCode
      },
      {
        id: 'simple-layout',
        displayName: 'Layout',
        component: <SimpleLayout />,
        codeString: SimpleLayoutCode
      }
    ]
  }
];
