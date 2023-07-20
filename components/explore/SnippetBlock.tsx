import {
  Box,
  Button,
  Center,
  Divider,
  Fade,
  Flex,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useClipboard,
  useColorMode,
  useDisclosure,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { CodeBlock } from 'react-code-blocks';
import { IoIosDesktop, IoIosMore, IoMdPhonePortrait, IoMdTabletPortrait } from 'react-icons/io';
import {
  RiCloseFill,
  RiFileCopyLine,
  RiFullscreenFill,
  RiMoonLine,
  RiSunLine,
} from 'react-icons/ri';

import { ChakraFrame } from './ChakraFrame';

type SnippetBlockType = {
  id: string;

  codeTheme: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /** A custom theme to be applied, implements the `CodeBlockTheme` interface. You can also pass pass a precomposed theme into here. For available themes. [See THEMES.md](https://github.com/rajinwonderland/react-code-blocks/blob/master/THEMES.md) */
  theme: object;

  /** The code to be formatted */
  code: string;

  /** Default is true, use to wrap long lines */
  wrapLongLines?: boolean;

  /** The language in which the code is written. [See LANGUAGES.md](https://github.com/rajinwonderland/react-code-blocks/blob/master/LANGUAGES.md) */
  language: string;

  children: ReactNode;

  componentName: string;
};
type CodeBlockType = {
  code: string;
  codeTheme?: object;
  language: string;
  wrapLongLines?: boolean;
};
type PreviewProps = {
  id: string;
  viewport: string;
  theme: object;
  children: ReactNode;
};
interface RadioType extends UseRadioProps {
  children: ReactNode;
}
type BaseControlButtonTypes = {
  codeBlock: string;
  setCodeBlock: React.Dispatch<React.SetStateAction<string>>;
  colorModeUpdate: string;
  handleColorModeChange: (colorModeUpdate: string) => void;
  onFullscreenOpen: () => void;
};
interface DesktopControlButtonProps extends BaseControlButtonTypes {
  isOpen: boolean;
  setViewport: React.Dispatch<React.SetStateAction<string>>;
  onFullscreenOpen: () => void;
}

const displayControlOptions = ['Preview', 'Code'];
const displayViewportSize = {
  responsive: {
    breakpoints: '100%',
    icon: IoIosDesktop,
  },
  tablet: {
    breakpoints: '768px',
    icon: IoMdTabletPortrait,
  },
  mobile: {
    breakpoints: '360px',
    icon: IoMdPhonePortrait,
  },
};

// use for let color mode value fit Rules of Hooks
function handleChangeColorModeValue(colorMode: string, light: string, dark: string) {
  if (colorMode === 'light') return light;
  if (colorMode === 'dark') return dark;
}

const getBreakpoint = (key: string) => {
  if (displayViewportSize[key]) return displayViewportSize[key].breakpoints;
  return '100%';
};

const DisplayControlButton = (props: RadioType) => {
  const { colorMode } = useColorMode();
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Center as='label'>
      <input {...input} />
      <Flex
        {...checkbox}
        fontSize='sm'
        lineHeight='short'
        letterSpacing='wide'
        color={handleChangeColorModeValue(colorMode, 'gray.600', 'gray.50')}
        justifyContent='center'
        alignItems='center'
        h='full'
        w='full'
        _hover={{
          bg: handleChangeColorModeValue(colorMode, 'gray.50', 'purple.800'),
          opacity: 0.9,
          cursor: 'pointer',
        }}
        _checked={{
          bg: handleChangeColorModeValue(colorMode, 'gray.100', 'purple.700'),
          opacity: 1,
          cursor: 'default',
        }}
        _focus={{ outline: 'none' }}
        _disabled={{
          opacity: 0.5,
          _hover: { bg: 'inherit', cursor: 'not-allowed' },
          _checked: {
            bg: handleChangeColorModeValue(colorMode, 'gray.100', 'gray.700'),
          },
        }}
      >
        {props.children}
      </Flex>
    </Center>
  );
};

const DesktopControlButton = ({
  codeBlock,
  isOpen,
  colorModeUpdate,
  handleColorModeChange,
  setCodeBlock,
  setViewport,
  onFullscreenOpen,
}: DesktopControlButtonProps) => {
  const { colorMode } = useColorMode();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'displayControl',
    value: codeBlock,
    onChange: (value: string) => setCodeBlock(value),
  });
  const displayControlGroup = getRootProps();
  const { getRootProps: getViewPortControlRootProps, getRadioProps: getViewPortControlRadioProps } =
    useRadioGroup({
      name: 'viewPortControl',
      defaultValue: 'responsive',
      onChange: (value: string) => setViewport(value),
    });
  const viewPortControlGroup = getViewPortControlRootProps();

  return (
    <Stack isInline={true} display={{ base: 'none', lg: 'flex' }}>
      {/* control viewport buttons */}
      <Fade in={isOpen}>
        <SimpleGrid
          display={codeBlock === displayControlOptions[1] ? 'none' : 'grid'}
          columns={3}
          minW={32}
          minH={8}
          borderRadius='md'
          border='1px solid'
          borderColor={handleChangeColorModeValue(colorMode, 'gray.100', 'purple.800')}
          overflow='hidden'
          {...viewPortControlGroup}
        >
          {Object.keys(displayViewportSize).map((value) => {
            const radio = getViewPortControlRadioProps({ value });
            return (
              <DisplayControlButton key={value} value={value} {...radio}>
                <Icon as={displayViewportSize[value].icon} w='17px' h='17px' />
              </DisplayControlButton>
            );
          })}
        </SimpleGrid>
      </Fade>
      {/* control display block buttons */}
      <SimpleGrid
        columns={2}
        minW={44}
        minH={8}
        borderRadius='md'
        border='1px solid'
        borderColor={handleChangeColorModeValue(colorMode, 'gray.100', 'purple.800')}
        overflow='hidden'
        {...displayControlGroup}
      >
        {displayControlOptions.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <DisplayControlButton key={value} value={value} {...radio}>
              {value}
            </DisplayControlButton>
          );
        })}
      </SimpleGrid>
      {/* color mode button */}
      {codeBlock === displayControlOptions[0] && (
        <Fade in={codeBlock === displayControlOptions[0]}>
          <Stack isInline={true}>
            <Button
              variant='unstyled'
              display='flex'
              justifyContent='center'
              alignItems='center'
              borderRadius='md'
              border='1px solid'
              borderColor={handleChangeColorModeValue(colorMode, 'gray.100', 'purple.800')}
              overflow='hidden'
              w='fit-content'
              h='auto'
              p={0}
              py={1.5}
              _hover={{
                bg: handleChangeColorModeValue(colorMode, 'gray.50', 'purple.800'),
                opacity: 0.9,
                cursor: 'pointer',
              }}
              _focus={{
                outline: 'none',
                bg: handleChangeColorModeValue(colorMode, 'gray.50', 'purple.700'),
              }}
              onClick={() => {
                handleColorModeChange(colorModeUpdate);
              }}
            >
              <Icon
                as={colorModeUpdate === 'dark' ? RiSunLine : RiMoonLine}
                color={handleChangeColorModeValue(colorMode, 'gray.600', 'gray.50')}
              />
            </Button>
            <Button
              variant='unstyled'
              display='flex'
              justifyContent='center'
              alignItems='center'
              borderRadius='md'
              border='1px solid'
              borderColor={handleChangeColorModeValue(colorMode, 'gray.100', 'purple.800')}
              overflow='hidden'
              w='fit-content'
              h='auto'
              p={0}
              py={1.5}
              _hover={{
                bg: handleChangeColorModeValue(colorMode, 'gray.50', 'purple.800'),
                opacity: 0.9,
                cursor: 'pointer',
              }}
              _focus={{
                outline: 'none',
                bg: handleChangeColorModeValue(colorMode, 'gray.50', 'purple.700'),
              }}
              _disabled={{
                opacity: 0.5,
                _hover: { bg: 'inherit', cursor: 'not-allowed' },
                _checked: {
                  bg: handleChangeColorModeValue(colorMode, 'gray.100', 'gray.700'),
                },
              }}
              onClick={onFullscreenOpen}
            >
              <Icon
                as={RiFullscreenFill}
                color={handleChangeColorModeValue(colorMode, 'gray.600', 'gray.50')}
              />
            </Button>
          </Stack>
        </Fade>
      )}
    </Stack>
  );
};

const MobileControlButton = ({
  codeBlock,
  colorModeUpdate,
  setCodeBlock,
  handleColorModeChange,
  onFullscreenOpen,
}: BaseControlButtonTypes) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack position='relative' isInline={true} display={{ base: 'flex', lg: 'none' }}>
      {/* control display block buttons */}
      <Button
        variant='unstyled'
        display={{ base: 'flex', lg: 'none' }}
        justifyContent='center'
        alignItems='center'
        borderRadius='md'
        border='1px solid'
        borderColor={handleChangeColorModeValue(colorMode, 'gray.100', 'gray.700')}
        fontSize='sm'
        fontWeight='normal'
        lineHeight='short'
        letterSpacing='wide'
        color={handleChangeColorModeValue(colorMode, 'gray.600', 'gray.50')}
        overflow='hidden'
        w='fit-content'
        h='auto'
        py={1.5}
        pl={2}
        pr={2}
        _focus={{ outline: 'none' }}
        _hover={{
          bg: handleChangeColorModeValue(colorMode, 'gray.50', 'gray.600'),
          opacity: 0.9,
          cursor: 'pointer',
        }}
        onClick={() => {
          if (codeBlock === displayControlOptions[0]) setCodeBlock(displayControlOptions[1]);
          if (codeBlock === displayControlOptions[1]) setCodeBlock(displayControlOptions[0]);
        }}
      >
        {codeBlock === displayControlOptions[0]
          ? displayControlOptions[1]
          : displayControlOptions[0]}
      </Button>
      {/* more button */}
      {codeBlock === displayControlOptions[0] && (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <PopoverTrigger>
            <Fade in={codeBlock === displayControlOptions[0]}>
              <Button
                variant='unstyled'
                display='flex'
                justifyContent='center'
                alignItems='center'
                borderRadius='md'
                border='1px solid'
                borderColor={handleChangeColorModeValue(colorMode, 'gray.100', 'gray.700')}
                overflow='hidden'
                w='fit-content'
                h='auto'
                p={0}
                py={2}
                _hover={{
                  bg: handleChangeColorModeValue(colorMode, 'gray.50', 'gray.600'),
                  opacity: 0.9,
                  cursor: 'pointer',
                }}
                _focus={{ outline: 'none' }}
                onClick={onOpen}
              >
                <Icon as={IoIosMore} />
              </Button>
            </Fade>
          </PopoverTrigger>
          <PopoverContent right={4} maxW={56} p={2} _focus={{ outline: 'none' }}>
            <Stack spacing={1.5}>
              <Button
                variant='ghost'
                display='flex'
                justifyContent='start'
                alignItems='center'
                w='full'
                h='auto'
                p={2.5}
                color={handleChangeColorModeValue(colorMode, 'gray.600', 'gray.50')}
                _focus={{ outline: 'none' }}
                onClick={() => {
                  handleColorModeChange(colorModeUpdate);
                  onClose();
                }}
              >
                <Icon as={colorModeUpdate === 'dark' ? RiSunLine : RiMoonLine} mr={2} />
                <Text fontWeight='normal'>
                  {colorModeUpdate === 'light' ? 'Dark' : 'Light'} theme
                </Text>
              </Button>
              <Button
                variant='ghost'
                display='flex'
                justifyContent='start'
                alignItems='center'
                w='full'
                h='auto'
                p={2.5}
                color={handleChangeColorModeValue(colorMode, 'gray.600', 'gray.50')}
                _focus={{ outline: 'none' }}
                onClick={() => {
                  onFullscreenOpen();
                  onClose();
                }}
              >
                <Icon as={RiFullscreenFill} mr={2} />
                <Text fontWeight='normal'>Full screen</Text>
              </Button>
            </Stack>
          </PopoverContent>
        </Popover>
      )}
    </Stack>
  );
};

const Code = ({ code, codeTheme, language, wrapLongLines }: CodeBlockType) => {
  const { hasCopied, onCopy } = useClipboard(code);
  const fontSize = useBreakpointValue({ base: 'small', md: 'medium' });
  return (
    <Box position='relative'>
      <Button
        variant='outline'
        color='white'
        borderColor={hasCopied ? 'green.400' : 'white'}
        position='absolute'
        bg='whiteAlpha.200'
        boxShadow='0 0 2px -1px #cacaca, 0 2px 8px -4px #000'
        top={4}
        right={4}
        px={0}
        overflow='hidden'
        opacity={1}
        transition='all .3s ease-in-out'
        _hover={{
          opacity: hasCopied ? 1 : 0.8,
        }}
        _focus={{ outline: 'none' }}
        onClick={onCopy}
      >
        {hasCopied ? <Text mx={2}>👌</Text> : <Icon as={RiFileCopyLine} mx={2} />}
      </Button>
      <CodeBlock
        text={code}
        theme={codeTheme}
        language={language}
        codeContainerStyle={{
          whiteSpace: wrapLongLines ? 'break-spaces' : 'pre',
          fontSize: fontSize,
        }}
        codeBlockStyle={{ wordBreak: wrapLongLines ? 'break-word' : 'normal' }}
      />
    </Box>
  );
};

const Preview = ({ id, viewport, theme, children }: PreviewProps) => {
  const { colorMode } = useColorMode();
  return (
    <Center bg={handleChangeColorModeValue(colorMode, 'gray.300', 'gray.700')} h='full'>
      <ChakraFrame id={id} width={getBreakpoint(viewport)} theme={theme}>
        {children}
      </ChakraFrame>
    </Center>
  );
};

export const SnippetBlock = ({
  id,
  codeTheme,
  code,
  children,
  theme,
  componentName,
  language,
  wrapLongLines = true,
}: SnippetBlockType) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isFullscreen,
    onOpen: onFullscreenOpen,
    onClose: onFullScreenClose,
  } = useDisclosure();
  const [viewport, setViewport] = useState('responsive');
  const [codeBlock, setCodeBlock] = useState(displayControlOptions[0]);
  const [content, setContent] = useState<ReactNode | undefined>();
  const [colorModeUpdate, setColorModeUpdate] = useState('light');

  function handleColorModeChange(colorModeUpdate: string) {
    // eslint-disable-next-line no-unused-expressions
    colorModeUpdate === 'light' ? setColorModeUpdate('dark') : setColorModeUpdate('light');
  }

  useEffect(() => {
    if (codeBlock === displayControlOptions[0]) {
      onOpen();
      if (colorModeUpdate === 'light')
        setContent(
          <Preview id={id} viewport={isFullscreen ? '100%' : viewport} theme={theme}>
            {children}
          </Preview>
        );
      if (colorModeUpdate === 'dark')
        setContent(
          <Preview id={id} viewport={isFullscreen ? '100%' : viewport} theme={theme}>
            {children}
          </Preview>
        );
    }
    if (codeBlock === displayControlOptions[1]) {
      onClose();
      setContent(
        <Code code={code} codeTheme={codeTheme} language={language} wrapLongLines={wrapLongLines} />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeBlock, viewport, colorModeUpdate, isFullscreen, componentName]);
  useEffect(() => {
    if (colorModeUpdate === 'light') sessionStorage.setItem('iframeColorMode', 'light');
    if (colorModeUpdate === 'dark') sessionStorage.setItem('iframeColorMode', 'dark');
  }, [colorModeUpdate]);

  return (
    <Box id={id}>
      <Box
        display={isFullscreen ? 'none' : 'block'}
        borderRadius='lg'
        border='1px solid'
        borderColor={handleChangeColorModeValue(colorMode, 'gray.100', 'purple.800')}
        w='full'
        minH='2xs'
        h='auto'
        maxH='fit-content'
        overflow='hidden'
      >
        <Stack isInline={true} justify='space-between' align='center' flexWrap='wrap' p={4}>
          <Text flex={1} fontSize='lg' fontWeight='medium' py={1} pr={1}>
            {componentName}
          </Text>
          <Stack isInline={true}>
            <MobileControlButton
              codeBlock={codeBlock}
              colorModeUpdate={colorModeUpdate}
              setCodeBlock={setCodeBlock}
              handleColorModeChange={handleColorModeChange}
              onFullscreenOpen={onFullscreenOpen}
            />
            <DesktopControlButton
              codeBlock={codeBlock}
              isOpen={isOpen}
              colorModeUpdate={colorModeUpdate}
              handleColorModeChange={handleColorModeChange}
              setViewport={setViewport}
              setCodeBlock={setCodeBlock}
              onFullscreenOpen={onFullscreenOpen}
            />
          </Stack>
        </Stack>
        <Divider />
        {content}
      </Box>
      <Fade in={isFullscreen}>
        <Box
          display={isFullscreen ? 'block' : 'none'}
          position='fixed'
          top={0}
          bottom={0}
          right={0}
          left={0}
          zIndex='modal'
          w='full'
          h='full'
          bg={handleChangeColorModeValue(colorMode, 'white', 'gray.800')}
          overflowY='scroll'
          css={{
            // for firefox
            scrollbarWidth: 'none',
            // for chrome
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Button
            position='fixed'
            top={4}
            right={4}
            p={1.5}
            h='auto'
            minW='auto'
            variant='outline'
            borderRadius='full'
            borderColor={handleChangeColorModeValue(colorMode, 'gray.400', 'gray.500')}
            bg={handleChangeColorModeValue(colorMode, 'whiteAlpha.200', 'whiteAlpha.50')}
            _focus={{ outline: 'none' }}
            onClick={onFullScreenClose}
          >
            <Icon
              as={RiCloseFill}
              w={5}
              h={5}
              color={handleChangeColorModeValue(colorMode, 'gray.500', 'gray.400')}
            />
          </Button>
          <Box w='full'>{content}</Box>
        </Box>
      </Fade>
    </Box>
  );
};
