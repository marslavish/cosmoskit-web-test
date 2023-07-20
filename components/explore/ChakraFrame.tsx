import { ColorMode, ColorModeProvider } from '@chakra-ui/color-mode';
import {
  CSSReset,
  extendTheme,
  GlobalStyle,
  ThemeProvider
} from '@chakra-ui/react';
import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import weakMemoize from '@emotion/weak-memoize';
import React, { useEffect, useRef, useState } from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';

export interface IframeComponentProps {
  id: string;
  width: string;
  theme?: object;
  children?: React.ReactNode;
  animate?: boolean;
  animationSeconds?: number;
}

const defaultThemeObject = {
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif'
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
      '900': '#0d17a9'
    }
  },
  breakPoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em'
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;'
  }
};
const defaultTheme = extendTheme(defaultThemeObject);
const memoizedCreateCacheWithContainer = weakMemoize((container) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const newCache = createCache({ key: 'dockey', container });
  return newCache;
});

export const ChakraFrame = ({
  id,
  width,
  theme,
  children,
  animate = true,
  animationSeconds = 0.25
}: IframeComponentProps) => {
  const iframeRef = useRef<HTMLIFrameElement>();
  const [contentHeight, setContentHeight] = useState<string | number>(300);
  const [updateHeight, setUpdateHeight] = useState<string | number>(0);

  useEffect(() => {
    setContentHeight(updateHeight);
  }, [updateHeight]);

  return (
    <Frame
      id={id}
      width={width}
      height={contentHeight}
      ref={iframeRef}
      scrolling="no"
      style={
        animate
          ? {
              transition: `all ${animationSeconds}s ease-in-out`,
              msTransition: `all ${animationSeconds}s ease-in-out`,
              mozTransition: `all ${animationSeconds}s ease-in-out`,
              oTransition: `all ${animationSeconds}s ease-in-out`
            }
          : {}
      }
    >
      <FrameContextConsumer>
        {({ document, window }) => {
          if (document) setUpdateHeight(document.body.clientHeight);
          window.addEventListener('resize', () => {
            if (updateHeight === 0) setUpdateHeight(document.body.clientHeight);
          });
          return (
            <CacheProvider
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              value={memoizedCreateCacheWithContainer(document.head)}
            >
              <Global
                styles={{
                  html: {
                    fontFamily: 'sans-serif'
                  }
                }}
              />
              <ThemeProvider theme={theme ?? defaultTheme}>
                <ColorModeProvider
                  value={sessionStorage.getItem('iframeColorMode') as ColorMode}
                  options={{
                    useSystemColorMode: false,
                    initialColorMode: 'light'
                  }}
                >
                  <CSSReset />
                  <GlobalStyle />
                  {children}
                </ColorModeProvider>
              </ThemeProvider>
            </CacheProvider>
          );
        }}
      </FrameContextConsumer>
    </Frame>
  );
};
