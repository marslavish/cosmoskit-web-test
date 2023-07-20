import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Skeleton,
  Stack,
  SystemStyleObject,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useOutsideClick
} from '@chakra-ui/react';
import { assets, chains } from 'chain-registry';
import {
  AsyncSelect,
  chakraComponents,
  GroupBase,
  OptionBase,
  OptionProps
} from 'chakra-react-select';
import React, { useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { RiLinkM } from 'react-icons/ri';

interface walletType {
  id: string;
  logo: string;
  title: string;
  address: string;
}

interface dataType extends OptionBase {
  label: string;
  display: string;
  value: string;
  imgSrc: string;
  available: string;
}

const SkeletonOptions = () => {
  return (
    <>
      <Flex justify="space-between" align="center" mb={{ base: 2, sm: 4 }}>
        <Flex align="center">
          <Skeleton
            w={{ base: 10, sm: 16 }}
            h={{ base: 10, sm: 16 }}
            mr={{ base: 2, sm: 4 }}
          />
          <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
        </Flex>
        <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
      </Flex>
      <Flex justify="space-between" align="center" mb={{ base: 2, sm: 4 }}>
        <Flex align="center">
          <Skeleton
            w={{ base: 10, sm: 16 }}
            h={{ base: 10, sm: 16 }}
            mr={{ base: 2, sm: 4 }}
          />
          <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
        </Flex>
        <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
      </Flex>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Skeleton
            w={{ base: 10, sm: 16 }}
            h={{ base: 10, sm: 16 }}
            mr={{ base: 2, sm: 4 }}
          />
          <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
        </Flex>
        <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
      </Flex>
    </>
  );
};

const SelectOptions = ({
  data,
  selectedItem,
  setSelectedItem
}: {
  data: dataType[];
  selectedItem: dataType;
  setSelectedItem: (value: dataType) => void;
}) => {
  const menuHeight = useBreakpointValue({ base: 60, md: 56 });
  const customStyles = {
    menu: (provided: SystemStyleObject) => ({
      ...provided,
      maxH: menuHeight,
      h: 'full',
      position: 'relative',
      mt: 4,
      mb: 0
    }),
    menuList: (provided: SystemStyleObject) => ({
      ...provided,
      maxH: menuHeight,
      bg: 'transparent',
      border: 'none',
      borderRadius: 'none',
      py: 0,
      pr: { base: 2, sm: 4 },
      // For Firefox
      scrollbarWidth: 'auto',
      scrollbarColor: useColorModeValue(
        'rgba(0,0,0,0.3) rgba(0,0,0,0.2)',
        'rgba(255,255,255,0.2) rgba(255,255,255,0.1)'
      ),
      // For Chrome and other browsers except Firefox
      '&::-webkit-scrollbar': {
        width: '18px',
        background: useColorModeValue(
          'rgba(160,160,160,0.1)',
          'rgba(255,255,255,0.1)'
        ),
        borderRadius: '4px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: useColorModeValue(
          'rgba(0,0,0,0.1)',
          'rgba(255,255,255,0.1)'
        ),
        borderRadius: '4px'
      }
    }),
    option: (provided: SystemStyleObject, state: { isSelected: boolean }) => ({
      ...provided,
      borderRadius: 'lg',
      bg: state.isSelected
        ? useColorModeValue('primary.100', 'primary.500')
        : 'transparent',
      color: 'inherit',
      _hover: {
        bg: state.isSelected
          ? useColorModeValue('primary.100', 'primary.500')
          : useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      },
      _disabled: {
        _hover: { bg: 'transparent' }
      }
    })
  };
  const IndicatorSeparator = () => {
    return null;
  };
  const DropdownIndicator = () => {
    return null;
  };
  const CustomOption = ({
    children,
    ...props
  }: OptionProps<dataType, true, GroupBase<dataType>>) => {
    return (
      <chakraComponents.Option {...props}>
        <Grid
          id={props.data.value}
          templateColumns={{ base: 'auto 1fr', md: 'auto 1fr auto' }}
          justifyContent="center"
          alignItems="center"
          rowGap={{ base: 1.5, md: 0 }}
          columnGap={{ base: 2, md: 4 }}
          w="full"
        >
          <GridItem
            minW={{ base: 12, md: 14 }}
            minH={{ base: 12, md: 14 }}
            maxW={{ base: 12, md: 14 }}
            maxH={{ base: 12, md: 14 }}
            rowSpan={2}
            w="full"
            h="full"
          >
            <Image src={props.data.imgSrc} />
          </GridItem>
          <GridItem>
            <Text
              fontSize={{ base: 'lg', sm: '2xl' }}
              fontWeight="bold"
              textAlign={{ md: 'start' }}
            >
              {children}
            </Text>
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              fontWeight="semibold"
              textAlign={{ md: 'start' }}
              color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
            >
              {props.data.display}
            </Text>
          </GridItem>
          <GridItem
            fontWeight="semibold"
            textAlign={{ base: 'start', md: 'end' }}
          >
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              py={{ md: 0.5 }}
              wordBreak="break-word"
            >
              {props.data.available}
            </Text>
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
            >
              available
            </Text>
          </GridItem>
        </Grid>
      </chakraComponents.Option>
    );
  };

  return (
    <AsyncSelect
      placeholder="Search"
      chakraStyles={customStyles}
      isClearable={false}
      blurInputOnSelect={true}
      controlShouldRenderValue={false}
      menuIsOpen={true}
      loadingMessage={() => <SkeletonOptions />}
      defaultOptions={data}
      value={selectedItem}
      loadOptions={(inputValue, callback) => {
        setTimeout(() => {
          const values = data.filter((option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
          );
          callback(values);
        }, 1000);
      }}
      onChange={(selectedOption) => {
        let value = {};
        value = { ...selectedOption };
        setSelectedItem(value as dataType);
      }}
      components={{
        DropdownIndicator,
        IndicatorSeparator,
        Option: CustomOption
      }}
    />
  );
};

const WithdrawTokens = ({
  showIcon,
  isOpen,
  onClose
}: {
  showIcon: boolean;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [wallets, setWallets] = useState<walletType[]>([
    {
      id: 'from',
      logo: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png',
      title: 'Osmosis',
      address: "address wasn't identified yet"
    },
    {
      id: 'to',
      logo: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/juno.png',
      title: 'JunoSwap',
      address: "address wasn't identified yet"
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('0');
  const [data, setData] = useState<dataType[]>([]);
  const [selectedItem, setSelectedItem] = useState<dataType>({
    label: '',
    display: '',
    value: '',
    imgSrc: '',
    available: '0'
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const optionsMenuRef = useRef<HTMLDivElement | null>(null);

  const {
    isOpen: selectIsOpen,
    onToggle: onSelectToggle,
    onClose: onSelectClose
  } = useDisclosure();
  const buttonDirection = useBreakpointValue({
    base: false,
    md: true
  });

  useEffect(() => {
    const getShuffledArr = (arr: any[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
      }
      return arr;
    };
    const defaultArray = [
      ...'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''),
      ...'abcdefghijklmnopqrstuvwxyz'.split(''),
      ...'0123456789'.split('')
    ];
    const getRandomLetter = (name: string) => {
      const randomLetter = getShuffledArr(defaultArray)
        .toString()
        .replace(/,/gm, '')
        .slice(0, 32);
      return name.replace(/[\-[\s[\.]/g, '') + randomLetter;
    };

      const assetList = assets
      .filter((list) => {
        const chain = chains.find(
          (chain) => chain.chain_name === list.chain_name
        );
        if (!chain) return false;
        if (chain.network_type !== 'mainnet') return false;
        return true;
      })
      .map(({ assets }) => assets.values())
      .map((iterator) => {
        for (const value of iterator) {
          return {
            label: value.name,
            value: value.name,
            display: value.symbol,
            imgSrc: value.logo_URIs?.png || value.logo_URIs?.jpeg,
            available: (
              parseFloat(
                getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                  .toString()
                  .replace(/,/gm, '')
              ) / 100000000
            ).toString()
          };
        }
      })
      .filter((a) => a.imgSrc) // only images
      .sort(() => (Math.random() > 0.5 ? 1 : -1)); // random


    const getWalletToken = getShuffledArr([...assetList]).slice(0, 2);
    const getWalletArray = wallets.map((data, i) => {
      return {
        ...data,
        address: `${getRandomLetter(getWalletToken[i].label)}`
      };
    });

    setData(assetList);
    setSelectedItem(assetList[0]);
    setWallets(getWalletArray);
  }, []);

  useEffect(() => {
    onSelectClose();
  }, [selectedItem]);

  useEffect(() => {
    if (submitLoading) {
      setTimeout(() => {
        setSubmitLoading(false);
      }, 1000);
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }, [submitLoading]);

  useOutsideClick({
    ref: optionsMenuRef,
    handler: () => onSelectClose()
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      blockScrollOnMount={false}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent maxW={{ base: 'xs', md: '2xl' }} borderRadius="2xl" p={6}>
        <ModalHeader fontSize="2xl" fontWeight="bold" p={0} mb={6}>
          Withdraw
        </ModalHeader>
        <ModalCloseButton top={6} right={6} />
        <Box position="relative">
          <Stack isInline={true} alignItems="center" spacing={4} mb={4}>
            <Box
              display={showIcon ? 'block' : 'none'}
              w={{ base: 12, md: 14 }}
              h={{ base: 12, md: 14 }}
              maxW={{ base: 12, md: 14 }}
              maxH={{ base: 12, md: 14 }}
              minW={{ base: 12, md: 14 }}
              minH={{ base: 12, md: 14 }}
              borderRadius="xl"
              overflow="hidden"
            >
              <Image src={wallets[0].logo} />
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                {wallets[0].title}
              </Text>
              <Stack
                isInline={true}
                alignItems="center"
                color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
                spacing={1}
              >
                <Icon as={RiLinkM} w={5} h={5} />
                <Text fontWeight="medium" wordBreak="break-word">
                  {wallets[0].address}
                </Text>
              </Stack>
            </Box>
          </Stack>
          <Box ref={optionsMenuRef}>
            <Button
              variant="unstyled"
              display="flex"
              zIndex={2500}
              justifyContent="start"
              alignItems="center"
              h="fit-content"
              p={4}
              w="full"
              borderRadius="xl"
              boxShadow={selectIsOpen ? 'base' : 'none'}
              bg={useColorModeValue('gray.200', 'gray.800')}
              _focus={{ outline: 'none' }}
              onClick={onSelectToggle}
            >
              <Box
                w={{ base: 10, md: 14 }}
                h={{ base: 10, md: 14 }}
                maxW={{ base: 10, md: 14 }}
                maxH={{ base: 10, md: 14 }}
                minW={{ base: 10, md: 14 }}
                minH={{ base: 10, md: 14 }}
                borderRadius="full"
                overflow="hidden"
              >
                <Image src={selectedItem.imgSrc} />
              </Box>
              <Box flex={1} textAlign="start" mx={{ base: 2, md: 4 }}>
                <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
                  {selectedItem.label}
                </Text>
                <Flex flexDirection={{ base: 'column', md: 'row' }}>
                  <Text fontSize={{ base: 'lg', md: 'xl' }}>
                    {selectedItem.available}&ensp;
                  </Text>
                  <Text
                    fontSize={{ base: 'sm', md: 'xl' }}
                    color={useColorModeValue(
                      'blackAlpha.600',
                      'whiteAlpha.600'
                    )}
                  >
                    available
                  </Text>
                </Flex>
              </Box>
              <Icon
                as={selectIsOpen ? FiX : FiChevronDown}
                w={6}
                h={6}
                ml={2}
              />
            </Button>
            <Box
              position="absolute"
              zIndex={2000}
              bg={useColorModeValue('gray.100', 'gray.700')}
              boxShadow={
                selectIsOpen
                  ? '0 12px 20px -8px rgba(105, 88, 164, 0.5)'
                  : 'none'
              }
              borderRadius="0 0 0.75rem 0.75rem"
              mt={-4}
              left={0}
              right={0}
              px={{ base: 4, md: 6 }}
            >
              <Collapse in={selectIsOpen} animateOpacity>
                <Box pt={8} pb={4}>
                  <SelectOptions
                    data={data}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                </Box>
              </Collapse>
            </Box>
          </Box>
        </Box>
        <Box mx={-6} my={6}>
          <Divider />
        </Box>
        <Box>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
            mb={4}
          >
            Amount
          </Text>
          <NumberInput
            size="lg"
            display="flex"
            alignItems="center"
            defaultValue={0}
            value={inputValue}
            bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.50')}
            min={0}
            max={parseFloat(selectedItem.available)}
            onChange={(value) => setInputValue(value)}
          >
            <NumberInputField
              fontWeight="semibold"
              letterSpacing="wide"
              textAlign="end"
            />
            <Stack isInline={true} position="absolute" zIndex={5} left={4}>
              <Button
                colorScheme="primary"
                size="xs"
                ml={2}
                _focus={{ outline: 'none' }}
                onClick={() => setInputValue(selectedItem.available)}
              >
                MAX
              </Button>
              <Button
                colorScheme="primary"
                size="xs"
                ml={2}
                _focus={{ outline: 'none' }}
                onClick={() =>
                  setInputValue(
                    (parseFloat(selectedItem.available) / 2).toString()
                  )
                }
              >
                1/2
              </Button>
            </Stack>
          </NumberInput>
        </Box>
        <Box mx={-6} my={6}>
          <Divider />
        </Box>
        <Stack isInline={true} alignItems="center" spacing={4} mb={6}>
          <Box
            display={showIcon ? 'block' : 'none'}
            w={{ base: 12, md: 14 }}
            h={{ base: 12, md: 14 }}
            maxW={{ base: 12, md: 14 }}
            maxH={{ base: 12, md: 14 }}
            minW={{ base: 12, md: 14 }}
            minH={{ base: 12, md: 14 }}
            borderRadius="xl"
            overflow="hidden"
          >
            <Image src={wallets[1].logo} />
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              To&nbsp;{wallets[1].title}
            </Text>
            <Stack
              isInline={true}
              alignItems="center"
              color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
              spacing={1}
            >
              <Icon as={RiLinkM} w={5} h={5} />
              <Text fontWeight="medium" wordBreak="break-word">
                {wallets[1].address}
              </Text>
            </Stack>
          </Box>
        </Stack>
        <ModalFooter>
          <Stack
            isInline={buttonDirection}
            w={{ base: 'full', md: 'initial' }}
            spacing={4}
          >
            <Button
              w={{ base: 'full', md: 'initial' }}
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              w={{ base: 'full', md: 'initial' }}
              colorScheme="primary"
              isLoading={submitLoading}
              onClick={() => {
                setSubmitLoading(true);
              }}
            >
              Transfer
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default function () {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Box position="relative" w="full" h="800px" mx="auto">
      <Center py={20}>
        <Button onClick={onOpen}>Open Modal</Button>
      </Center>
      <WithdrawTokens showIcon={true} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
