import React from 'react';
import { BondingCard, Button, ClipboardCopyText } from '@interchain-ui/react';
import { useTheme } from '../hooks/useTheme';
import '@interchain-ui/react/styles';

export const Test = () => {
  const { setTheme, theme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <Button variant='solid' onClick={handleClick}>
        Toggle Theme
      </Button>
      <ClipboardCopyText text='sdofi' />
      <BondingCard title='current theme' value={theme} />
    </div>
  );
};
