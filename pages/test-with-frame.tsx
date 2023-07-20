import React from 'react';
import Layout from '../components/Layout';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { Head } from '../components/seo/Head';
import { Button, BondingCard, PoolCard } from '@interchain-ui/react';
import { useTheme } from '../hooks/useTheme';
import { ThemeProvider } from '@interchain-ui/react';

import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import weakMemoize from '@emotion/weak-memoize';
import { useRouter } from 'next/router';
// import '@interchain-ui/react/styles';

/**
 * works but not good:
 *  const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}</head><body><div></div></body></html>`;
 */

// const memoizedCreateCacheWithContainer = weakMemoize((container) => {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   const newCache = createCache({ key: 'dockey', container });
//   return newCache;
// });

export default function TestWithFrame() {
  const { theme, toggleTheme, themeClass } = useTheme();

  const router = useRouter();
  if (!router.isReady) return <></>;

  const handleClick = () => {
    toggleTheme();
    console.log({ myDocument: document.head.innerHTML });
  };

  const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}</head><body><div></div></body></html>`;
  // data-emotion="css 1q1sa4c"

  // const handleContentDidMount = () => {};

  return (
    <Layout>
      <Frame
        initialContent={initialContent}
        // contentDidMount={handleContentDidMount}
        style={{
          border: '1px solid black',
          width: '80%',
          height: '600px',
          margin: '60px auto',
          padding: '10px',
        }}
        // hidden
      >
        <FrameContextConsumer>
          {({ document, window }) => {
            // console.log({ document });
            // console.log({ window });
            // const cache = createCache({
            //   container: document.head,
            //   key: 'mitosis',
            // });
            return (
              // <CacheProvider value={cache}>
              //   <Global
              //     styles={{
              //       '@import':
              //         "url('../node_modules/@interchain-ui/react/dist/interchain-ui-kit-react.cjs.css')",
              //     }}
              //   />
              // </CacheProvider>
              <ThemeProvider defaultTheme='light'>
                <div className={themeClass}>
                  <div>
                    <Button variant='solid' onClick={handleClick}>
                      Toggle Theme
                    </Button>
                    <div style={{ height: '20px' }} />
                    <BondingCard title='a day bonding' value='20.24%' />
                    <div style={{ height: '20px' }} />
                    <PoolCard
                      apr={24}
                      bonded={600}
                      fees={59075}
                      id='1'
                      poolLiquidity={168767639}
                      token1={{
                        imgSrc:
                          'https://raw.githubusercontent.com/cosmos/chain-registry/master/agoric/images/bld.png',
                        name: 'ATOM',
                      }}
                      token2={{
                        imgSrc:
                          'https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png',
                        name: 'OSOM',
                      }}
                      yourLiquidity={1329.32}
                    />
                  </div>
                </div>
              </ThemeProvider>
            );
          }}
        </FrameContextConsumer>
      </Frame>
    </Layout>
  );
}
