import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useClipboard,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiCopy } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';
import { default as _ReactPlayer } from 'react-player/lazy';
import { ReactPlayerProps } from 'react-player/types/lib';

// To fix this error: https://github.com/cookpete/react-player/issues/1406
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

function handleChangeColorModeValue(
  colorMode: string,
  light: string,
  dark: string
) {
  if (colorMode === 'light') return light;
  if (colorMode === 'dark') return dark;
}

const CommandData = [
  {
    description: 'Install create-cosmos-app',
    command: 'npm install -g create-cosmos-app'
  },
  {
    description: 'Now, run the command',
    command: 'create-cosmos-app'
  }
];

const CommandBox = ({
  description,
  command,
  step
}: {
  description: string;
  command: string;
  step: number;
}) => {
  const { colorMode } = useColorMode();
  const { hasCopied, onCopy, value } = useClipboard(command);

  return (
    <>
      <GridItem
        display={{ base: 'none', md: 'flex' }}
        justifyContent="center"
        alignItems="center"
        bg={handleChangeColorModeValue(colorMode, 'gray.100', 'blackAlpha.500')}
        textColor={handleChangeColorModeValue(
          colorMode,
          'purple.700',
          'purple.400'
        )}
        fontWeight="bold"
        fontSize="xl"
        borderRadius="full"
        w={16}
        h={16}
      >
        {step}
      </GridItem>
      <GridItem
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text
          position="absolute"
          fontWeight="semibold"
          color={handleChangeColorModeValue(
            colorMode,
            'purple.700',
            'purple.400'
          )}
          top={-8}
          ml={{ md: -20 }}
        >
          {description}
        </Text>
        <Box
          as="button"
          display="flex"
          alignItems="center"
          bg={handleChangeColorModeValue(
            colorMode,
            'gray.100',
            'blackAlpha.500'
          )}
          borderRadius="full"
          px={6}
          py={3}
          w="full"
          h="fit-content"
          opacity={1}
          transition="all .5s ease"
          _hover={{ opacity: 0.75 }}
          onClick={onCopy}
        >
          <Stack
            w="full"
            isInline={true}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              letterSpacing="wide"
              bgClip="text"
              bgGradient="linear-gradient(330deg, rgba(238, 128, 255, 1), rgba(133, 20, 168, 1))"
              fontWeight="bold"
            >
              {command}
            </Text>
            {hasCopied && value === command ? (
              <Text>👍</Text>
            ) : (
              <Icon as={FiCopy} />
            )}
          </Stack>
        </Box>
      </GridItem>
      <GridItem
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        w={1}
        h={{ base: 16, md: 32 }}
      >
        <Divider
          variant="dashed"
          orientation="vertical"
          borderWidth={2}
          borderColor={handleChangeColorModeValue(
            colorMode,
            'gray.400',
            '#D562FF'
          )}
        />
      </GridItem>
      <GridItem />
    </>
  );
};

const VideoModal = ({
  isOpen,
  id,
  title,
  videoURL,
  handleModalClose
}: {
  isOpen: boolean;
  id: string;
  title?: string;
  videoURL: string;
  handleModalClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent w="full" maxW={{ lg: '60vw' }} mx={4}>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Text>{title || id}</Text>
            <Button
              variant="ghost"
              px={0}
              _focus={{ outline: 'none' }}
              onClick={handleModalClose}
            >
              <Icon as={RiCloseFill} w={5} h={5} />
            </Button>
          </Flex>
        </ModalHeader>
        <ModalBody pb={6}>
          <Box w="full" h={{ md: 'calc((60vw/16)*9)' }}>
            <ReactPlayer
              url={videoURL || ''}
              width="100%"
              height="100%"
              controls={true}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Instruction = () => {
  const { colorMode } = useColorMode();
  const {
    isOpen: isModalOpen,
    onClose: handleModalClose,
    onOpen: handleModalOpen
  } = useDisclosure();
  return (
    <Flex w="full" flexDirection="column">
      <Text
        as="h1"
        fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
        fontWeight="bold"
        textAlign="center"
        color={handleChangeColorModeValue(
          colorMode,
          'purple.800',
          'purple.400'
        )}
        mb={12}
      >
        Get Started
      </Text>
      <Grid
        templateColumns={{ md: 'auto 1fr' }}
        alignItems="center"
        w="full"
        maxW="2xl"
        gap={{ base: 8, md: 6 }}
        mx="auto"
        pt={8}
      >
        {CommandData.map(({ description, command }, i) => (
          <CommandBox
            key={i}
            description={description}
            command={command}
            step={i + 1}
          />
        ))}
        <GridItem
          display={{ base: 'none', md: 'flex' }}
          justifyContent="center"
          alignItems="center"
          bg={handleChangeColorModeValue(
            colorMode,
            'gray.100',
            'blackAlpha.500'
          )}
          textColor={handleChangeColorModeValue(
            colorMode,
            'purple.700',
            'purple.400'
          )}
          fontWeight="bold"
          fontSize="xl"
          borderRadius="full"
          w={16}
          h={16}
        >
          3
        </GridItem>
        <GridItem
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text
            position="absolute"
            fontWeight="semibold"
            color={handleChangeColorModeValue(
              colorMode,
              'purple.700',
              'purple.400'
            )}
            top={-10}
            ml={{ md: -20 }}
          >
            Now, add components to your app!
          </Text>
          <Stack
            position="relative"
            w="full"
            justifyContent="center"
            alignItems="center"
            ml={{ md: -20 }}
          >
            <NextLink href="/explore/wallet" passHref={true}>
              <ChakraLink
                w="full"
                maxW={80}
                _hover={{ textDecoration: 'none' }}
                _focus={{ outline: 'none' }}
              >
                <Button
                  w="full"
                  fontSize="xl"
                  color="white"
                  bg="linear-gradient(222deg, #FECBCB 14.6%, #EE80FF 85.4%)"
                  opacity={1}
                  transition="all 0.5s ease"
                  _hover={{
                    opacity: 0.7
                  }}
                  _active={{
                    opacity: 0.9
                  }}
                  maxW={80}
                  h={20}
                >
                  Explore Components
                </Button>
              </ChakraLink>
            </NextLink>
            <Grid
              position="absolute"
              top={24}
              w="full"
              templateColumns={{ md: '1fr 1fr' }}
              gap={6}
              maxW={96}
            >
              <NextLink href="https://docs.cosmoskit.com/" passHref={true}>
                <ChakraLink
                  w="full"
                  textAlign="center"
                  fontWeight="medium"
                  color={handleChangeColorModeValue(
                    colorMode,
                    'purple.600',
                    'purple.400'
                  )}
                  _focus={{ outline: 'none' }}
                >
                  View the Docs
                </ChakraLink>
              </NextLink>
              <Text
                as="button"
                w="full"
                textAlign="center"
                fontWeight="medium"
                color={handleChangeColorModeValue(
                  colorMode,
                  'purple.600',
                  'purple.400'
                )}
                _hover={{ opacity: 0.85 }}
                _focus={{ outline: 'none' }}
                onClick={handleModalOpen}
              >
                ▶︎&ensp;See how it works
              </Text>
              <VideoModal
                id="create-a-cosmos-app-with-create-cosmos-app"
                isOpen={isModalOpen}
                title="Create a Cosmos App with create-cosmos-app"
                videoURL="https://www.youtube.com/watch?v=-jJqeS47c3k"
                handleModalClose={handleModalClose}
              />
            </Grid>
          </Stack>
        </GridItem>
      </Grid>
    </Flex>
  );
};

const HeroBox = () => {
  const { colorMode } = useColorMode();
  const {
    isOpen: isModalOpen,
    onClose: handleModalClose,
    onOpen: handleModalOpen
  } = useDisclosure();
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      textAlign="center"
      color={handleChangeColorModeValue(colorMode, 'purple.800', 'purple.400')}
      maxW="3xl"
      pt={{ base: 8, md: 12 }}
    >
      <Heading
        fontSize={{ base: 'lg', md: '2xl', lg: '4xl' }}
        fontWeight="bold"
        lineHeight={1}
        letterSpacing="normal"
        mb={{ base: 2.5, md: 2, lg: 1.5 }}
      >
        Cosmos Kit
      </Heading>
      <Text
        fontSize={{ base: '2xl', md: '4xl', lg: '6xl' }}
        bgClip="text"
        bgGradient="linear(to-r, green.400, purple.500)"
        fontWeight="bold"
        mb={{ base: 4, md: 5, lg: 6 }}
      >
        Build Cosmos apps fast
      </Text>
      <Text
        maxW={{ base: 72, md: 'xl' }}
        fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
        lineHeight={1.25}
        letterSpacing={{ lg: 'wide' }}
        color={handleChangeColorModeValue(
          colorMode,
          'purple.400',
          'purple.200'
        )}
        mb={{ base: 8, md: 10, lg: 12 }}
      >
        Cosmos Kit is a wallet adapter for developers to build apps that quickly
        and easily interact with Cosmos blockchains and wallets.
      </Text>
      <Grid
        w="full"
        maxW={{ md: 'sm' }}
        maxH="fit-content"
        templateColumns={{ md: '1fr 1fr' }}
        gap={{ base: 4, md: 6 }}
      >
        <NextLink href="/explore/wallet" passHref={true}>
          <ChakraLink
            w="full"
            h="fit-content"
            _hover={{ textDecoration: 'none' }}
          >
            <Button
              variant="unstyled"
              display="inline-block"
              color="primary.700"
              p={3.5}
              w="full"
              h="fit-content"
              position="relative"
              z-index={0}
              opacity={1}
              transition="all 0.5s ease"
              _before={{
                content: "''",
                position: 'absolute',
                zIndex: -1,
                inset: 0,
                padding: '2px',
                borderRadius: '0.5rem',
                background:
                  'linear-gradient(to left bottom, rgba(255, 196, 196, 0.95), rgba(203, 85, 240, 0.95))',
                mask: 'linear-gradient(#ffffff 0% 0%) content-box, linear-gradient(#ffffff 0% 0%)',
                maskComposite: 'xor',
                WebkitMask:
                  'linear-gradient(#ffffff 0% 0%) content-box, linear-gradient(#ffffff 0% 0%)',
                WebkitMaskComposite: 'exclude'
              }}
              _hover={{
                opacity: 0.8,
                background: 'rgba(255, 196, 196, 0.1)'
              }}
              _focus={{ outline: 'none' }}
            >
              Components
            </Button>
          </ChakraLink>
        </NextLink>
        <Button
          variant="unstyled"
          display="inline-block"
          color="primary.700"
          p={3.5}
          w="full"
          h="fit-content"
          position="relative"
          z-index={0}
          opacity={1}
          transition="all 0.5s ease"
          _before={{
            content: "''",
            position: 'absolute',
            zIndex: -1,
            inset: 0,
            padding: '2px',
            borderRadius: '0.5rem',
            background:
              'linear-gradient(to left bottom, rgba(255, 196, 196, 0.95), rgba(203, 85, 240, 0.95))',
            mask: 'linear-gradient(#ffffff 0% 0%) content-box, linear-gradient(#ffffff 0% 0%)',
            maskComposite: 'xor',
            WebkitMask:
              'linear-gradient(#ffffff 0% 0%) content-box, linear-gradient(#ffffff 0% 0%)',
            WebkitMaskComposite: 'exclude'
          }}
          _hover={{
            opacity: 0.8,
            background: 'rgba(255, 196, 196, 0.1)'
          }}
          _focus={{ outline: 'none' }}
          onClick={handleModalOpen}
        >
          ▶︎&ensp;See how it works
        </Button>
        <VideoModal
          id="create-a-cosmos-app-with-create-cosmos-app"
          isOpen={isModalOpen}
          title="Create a Cosmos App with create-cosmos-app"
          videoURL="https://www.youtube.com/watch?v=-jJqeS47c3k"
          handleModalClose={handleModalClose}
        />
      </Grid>
    </Flex>
  );
};

export default function Hero() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      h="full"
      pt={{ base: 16, lg: 20 }}
      pb={40}
      px={4}
      spacing={{ base: 32, md: 36, lg: 40 }}
    >
      <HeroBox />
      <Instruction />
    </Stack>
  );
}
