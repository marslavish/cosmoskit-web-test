import { ModePreference, store } from '@interchain-ui/react';
import { useCallback, useMemo } from 'react';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

const useStore = create(store);

const useCosmologyUIStore = () => {
  return useStore(
    (state) => ({
      theme: state.theme,
      themeClass: state.themeClass,
      setThemeMode: state.setThemeMode,
    }),
    shallow
  );
};

export function useTheme() {
  const { theme, themeClass, setThemeMode } = useCosmologyUIStore();

  const value = useMemo(() => theme, [theme]);

  const setTheme = useCallback(
    (mode: ModePreference) => {
      setThemeMode(mode);
    },
    [setThemeMode]
  );

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme: value,
    setTheme,
    themeClass,
    toggleTheme,
  };
}
